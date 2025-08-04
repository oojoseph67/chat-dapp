import { useMemo, useRef, useEffect } from "react";
import { MessageContent } from "./MessageContent";
import { useUserMessagesQuery } from "@/modules/query";
import { useUserChainInfo } from "@/modules/query";

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
  timestamp: number;
  tipAmount: number;
  isEncrypted: boolean;
}

interface MessageListProps {
  selectedFriend: string | null;
}

export function MessageList({ selectedFriend }: MessageListProps) {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const { data: userMessages } = useUserMessagesQuery();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = useMemo(() => {
    if (!selectedFriend || !userMessages) return [];

    // Handle both old and new data structure
    const receivedMessages = userMessages.receivedMessages;
    const sentMessages = userMessages.sentMessages;

    // Filter messages for the selected friend
    const filteredReceived = receivedMessages.filter(
      (msg) => msg.sender === selectedFriend
    );
    const filteredSent = sentMessages.filter(
      (msg) => msg.receiver === selectedFriend
    );

    // Combine and sort messages by timestamp
    const allMessages = [...filteredReceived, ...filteredSent].sort(
      (a, b) => a.timestamp - b.timestamp
    );

    // Transform messages to display format with user's perspective
    return allMessages.map((msg) => {
      const isOwn = msg.sender === address;
      const senderName = isOwn ? "You" : msg.senderUsername;
      const time = new Date(msg.timestamp * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Extract content from ipfsContent
      let displayContent = "";
      let messageType = "text";

      if (msg.ipfsContent) {
        if (msg.ipfsContent.content) {
          displayContent = msg.ipfsContent.content;
          messageType = "text";
        } else if (msg.ipfsContent.file) {
          displayContent = msg.ipfsContent.file;
          messageType = "file";
        } else {
          displayContent = "No content available";
          messageType = "unknown";
        }
      } else {
        displayContent = "Loading content...";
        messageType = "loading";
      }

      return {
        id: `${msg.sender}-${msg.receiver}-${msg.timestamp}`,
        content: displayContent,
        time,
        isOwn,
        messageType,
        ...msg,
        timestamp: msg.timestamp,
        tipAmount: msg.tipAmount,
        isEncrypted: msg.isEncrypted,
      };
    });
  }, [selectedFriend, userMessages, address]);


  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.isOwn
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            }`}
          >
            <MessageContent
              message={{
                content: msg.content,
                messageType: msg.messageType,
                ipfsContent: msg.ipfsContent,
                isEncrypted: msg.isEncrypted,
                tipAmount: msg.tipAmount,
                isOwn: msg.isOwn,
                sender: msg.sender,
                receiver: msg.receiver,
              }}
            />
            <p
              className={`text-xs mt-1 ${
                msg.isOwn ? "text-white/70" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {msg.time}
            </p>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
