import { useMemo, useEffect } from "react";
import { IoSearchOutline, IoTimeOutline } from "react-icons/io5";
import { useAllUsersInfoQuery, useUserMessagesQuery } from "@/modules/query";
import { useUserChainInfo } from "@/modules/query";
import { sanitizeUsernameForDisplay } from "@/utils/global";

interface FriendsListProps {
  selectedFriend: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFriendSelect: (address: string) => void;
}

export function FriendsList({
  selectedFriend,
  searchQuery,
  onSearchChange,
  onFriendSelect,
}: FriendsListProps) {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const { data: allUsersInfo = [] } = useAllUsersInfoQuery();
  const { data: userMessages } = useUserMessagesQuery();

  const friends = useMemo(() => {
    return allUsersInfo
      .filter((user) => user.address !== address)
      .map((user) => {
        // Get messages for this friend
        let lastMessage = "Start a conversation";
        let lastMessageTime = "Just now";
        let hasConversation = false;
        let lastMessageTimestamp = 0;

        if (userMessages) {
          const receivedMessages = userMessages.receivedMessages;
          const sentMessages = userMessages.sentMessages;

          // Filter messages for this specific friend
          const filteredReceived = receivedMessages.filter(
            (msg) => msg.sender === user.address
          );
          const filteredSent = sentMessages.filter(
            (msg) => msg.receiver === user.address
          );

          // Combine and sort messages by timestamp
          const allMessages = [...filteredReceived, ...filteredSent].sort(
            (a, b) => a.timestamp - b.timestamp
          );

          if (allMessages.length > 0) {
            hasConversation = true;
            const lastMsg = allMessages[allMessages.length - 1];
            lastMessageTimestamp = lastMsg.timestamp;

            // Extract content from ipfsContent
            if (lastMsg.ipfsContent) {
              if (lastMsg.ipfsContent.content) {
                lastMessage = lastMsg.ipfsContent.content;
              } else if (lastMsg.ipfsContent.file) {
                lastMessage = "File shared";
              } else {
                lastMessage = "Message";
              }
            } else {
              lastMessage = "Message";
            }

            // Format timestamp
            const messageDate = new Date(lastMsg.timestamp * 1000);
            const now = new Date();
            const diffInMs = now.getTime() - messageDate.getTime();
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
            const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

            if (diffInMinutes < 1) {
              lastMessageTime = "Just now";
            } else if (diffInMinutes < 60) {
              lastMessageTime = `${diffInMinutes}m ago`;
            } else if (diffInHours < 24) {
              lastMessageTime = `${diffInHours}h ago`;
            } else if (diffInDays < 7) {
              lastMessageTime = `${diffInDays}d ago`;
            } else {
              lastMessageTime = messageDate.toLocaleDateString();
            }
          }
        }

        const sanitizedUsername = sanitizeUsernameForDisplay(user.username);
        
        return {
          address: user.address,
          name: sanitizedUsername,
          avatar: sanitizedUsername.slice(0, 2).toUpperCase(),
          lastMessage,
          time: lastMessageTime,
          unread: 0,
          online: true,
          hasConversation,
          lastMessageTimestamp,
        };
      })
      .filter((friend) => friend.hasConversation) // Only show users with conversation history
      .sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp); // Sort by most recent message first
  }, [allUsersInfo, address, userMessages]);

  const filteredFriends = friends.filter((friend) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = friend.name.toLowerCase().includes(query);
    const addressMatch = friend.address.toLowerCase().includes(query);
    return nameMatch || addressMatch;
  });

  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredFriends.map((friend) => (
          <div
            key={friend.address}
            onClick={() => onFriendSelect(friend.address)}
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
                    {friend.name} [{friend.address.slice(0, 6)}...
                    {friend.address.slice(-4)}]
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
  );
}
