import { useMemo } from "react";
import { useAllUsersInfoQuery } from "@/modules/query";
import { useUserChainInfo } from "@/modules/query";
import { sanitizeUsernameForDisplay } from "@/utils/global";

interface Friend {
  address: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface ChatHeaderProps {
  selectedFriend: string | null;
}

export function ChatHeader({ selectedFriend }: ChatHeaderProps) {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const { data: allUsersInfo = [] } = useAllUsersInfoQuery();

  const selectedFriendData = useMemo(() => {
    if (!selectedFriend) return undefined;
    
    const user = allUsersInfo.find((user) => user.address === selectedFriend);
    if (!user) return undefined;

    const sanitizedUsername = sanitizeUsernameForDisplay(user.username);
    
    return {
      address: user.address,
      name: sanitizedUsername,
      avatar: sanitizedUsername.slice(0, 2).toUpperCase(),
      lastMessage: "Start a conversation",
      time: "Just now",
      unread: 0,
      online: true,
    };
  }, [selectedFriend, allUsersInfo]);

  if (!selectedFriendData) return null;

  return (
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
            {selectedFriendData.name} [
            {selectedFriendData.address.slice(0, 6)}...
            {selectedFriendData.address.slice(-4)}]
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedFriendData.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
} 