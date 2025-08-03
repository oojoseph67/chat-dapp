import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  IoChatbubbleOutline,
  IoSearchOutline,
  IoAddOutline,
  IoSendOutline,
  IoAttachOutline,
  IoHeartOutline,
  IoTimeOutline,
  IoEllipsisVerticalOutline,
  IoWalletOutline,
  IoCheckmarkDoneOutline,
  IoCloseOutline,
} from "react-icons/io5";
import {
  useUserChainInfo,
  useUserSentMessagesQuery,
  useUserReceivedMessagesQuery,
  useAllUsersInfoQuery,
} from "@/modules/query";
import {
  useSendMessageMutation,
  useSendMessageWithTipMutation,
} from "@/modules/mutation";
import { WalletWarning } from "@/modules/app/component/wallet-warning";
import { StakingRequirement } from "@/modules/app/component/staking-requirement";

export default function Messages() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const router = useRouter();
  const { recipient, username } = router.query;

  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [isTipMode, setIsTipMode] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);

  // Get all users info in a single query
  const { data: allUsersInfo = [] } = useAllUsersInfoQuery();

  // Get current user's sent and received messages
  const { data: userSentMessages = [] } = useUserSentMessagesQuery(
    address || ""
  );
  const { data: userReceivedMessages = [] } = useUserReceivedMessagesQuery(
    address || ""
  );

  // Create friends list from users with message history
  const friends = useMemo(() => {
    return allUsersInfo
      .filter((user) => user.address !== address)
      .map((user) => ({
        address: user.address,
        name: user.username,
        avatar: user.username.slice(0, 2).toUpperCase(),
        lastMessage: "Start a conversation",
        time: "Just now",
        unread: 0,
        online: true,
      }));
  }, [allUsersInfo, address]);

  // Set selected friend from URL params or default to first friend
  useEffect(() => {
    if (recipient && typeof recipient === "string") {
      setSelectedFriend(recipient);
    } else if (friends.length > 0) {
      setSelectedFriend(friends[0]?.address || null);
    }
  }, [recipient, friends]);

  const selectedFriendData = friends.find((f) => f.address === selectedFriend);

  // Get messages for selected friend (placeholder for now)
  const messages = useMemo(() => {
    if (!selectedFriend) return [];

    return [
      {
        id: 1,
        sender: selectedFriendData?.name || "User",
        content: "Start a conversation by sending a message!",
        time: "Just now",
        isOwn: false,
      },
    ];
  }, [selectedFriend, selectedFriendData]);

  // Message mutations
  const { mutate: sendMessage, isPending: isSendingMessage } =
    useSendMessageMutation();
  const { mutate: sendMessageWithTip, isPending: isSendingWithTip } =
    useSendMessageWithTipMutation();

  const handleSendMessage = () => {
    if (!selectedFriend || (!message.trim() && !selectedFile)) return;

    const messageData = {
      receiver: selectedFriend,
      content: message.trim() || undefined,
      isEncrypted,
      file: selectedFile || undefined,
    };

    if (isTipMode && tipAmount > 0) {
      sendMessageWithTip(
        {
          ...messageData,
          tipAmount,
        },
        {
          onSuccess() {
            // Reset form
            setMessage("");
            setTipAmount(0);
            setSelectedFile(null);
            setIsTipMode(false);
            setIsEncrypted(false);
          },
          onError() {
            // Reset form
            setMessage("");
            setTipAmount(0);
            setSelectedFile(null);
            setIsTipMode(false);
            setIsEncrypted(false);
          },
        }
      );
    } else {
      sendMessage(messageData);
    }
  };

  const handleTip = () => {
    if (!selectedFriend) return;

    // Open tip modal or switch to tip mode
    setIsTipMode(true);
    setTipAmount(0);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log({
    userSentMessages,
    userReceivedMessages,
    allUsersInfo,
    messages,
  });

  return (
    <StakingRequirement>
      <div className="max-w-7xl mx-auto h-[calc(100vh-200px)]">
        <Head>
          <title>Messages - FriendFi</title>
          <meta
            name="description"
            content="Send and receive encrypted messages with your friends on FriendFi."
          />
          <meta
            name="keywords"
            content="messages, chat, encrypted, friends, communication, FriendFi"
          />
          <meta name="author" content="FriendFi" />
        </Head>
        {!address && (
          <WalletWarning
            title="Connect Your Wallet"
            message="Please connect your wallet to access messaging features and chat with friends."
          />
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-full flex">
          {/* Friends List */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Messages
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.address}
                  onClick={() => setSelectedFriend(friend.address)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                    selectedFriend === friend.address
                      ? "bg-primary/10 border-r-2 border-primary"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {friend.avatar}
                        </span>
                      </div>
                      {friend.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {friend.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                          <IoTimeOutline className="w-3 h-3 mr-1" />
                          {friend.time}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {friend.lastMessage}
                      </p>
                    </div>
                    {friend.unread > 0 && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-medium">
                          {friend.unread}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedFriendData ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {selectedFriendData.avatar}
                        </span>
                      </div>
                      {selectedFriendData.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {selectedFriendData.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedFriendData.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-center space-x-2">
                    <button
                      onClick={handleTip}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      title="Send tip"
                      aria-label="Send tip"
                    >
                      <IoHeartOutline className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      aria-label="More options"
                    >
                      <IoEllipsisVerticalOutline className="w-5 h-5" />
                    </button>
                  </div> */}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.isOwn
                            ? "bg-primary text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.isOwn
                              ? "text-white/70"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  {/* File Upload Preview */}
                  {selectedFile && (
                    <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IoAttachOutline className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-700 dark:text-blue-300">
                            {selectedFile.name} (
                            {(selectedFile.size / 1024).toFixed(1)} KB)
                          </span>
                        </div>
                        <button
                          onClick={handleRemoveFile}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                          aria-label="Remove file"
                          title="Remove file"
                        >
                          <IoCloseOutline className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Tip Mode Toggle */}
                  <div className="mb-3 flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isTipMode}
                        onChange={(e) => setIsTipMode(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Send as tip
                      </span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isEncrypted}
                        onChange={(e) => setIsEncrypted(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Encrypt message
                      </span>
                    </label>
                  </div>

                  {/* Tip Amount Input */}
                  {isTipMode && (
                    <div className="mb-3">
                      <input
                        type="number"
                        placeholder="Tip amount (tokens)"
                        value={tipAmount}
                        onChange={(e) => setTipAmount(Number(e.target.value))}
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <label
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 cursor-pointer"
                      title="Attach file"
                    >
                      <IoAttachOutline className="w-5 h-5" />
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                        aria-label="Attach file"
                      />
                    </label>

                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder={
                          selectedFile
                            ? "Add a message (optional)..."
                            : "Type a message..."
                        }
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <button
                      onClick={handleSendMessage}
                      disabled={
                        (!message.trim() && !selectedFile) ||
                        isSendingMessage ||
                        isSendingWithTip
                      }
                      className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      aria-label="Send message"
                    >
                      {isSendingMessage || isSendingWithTip ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <IoSendOutline className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <IoChatbubbleOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Select a friend to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StakingRequirement>
  );
}
