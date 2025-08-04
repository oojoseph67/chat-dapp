import { IoPeopleOutline } from "react-icons/io5";

interface TopUser {
  name: string;
  messages: number;
  avatar: string;
  stakedAmount: number;
}

interface AnalyticsTopUsersProps {
  topFriends: TopUser[];
  isLoading: boolean;
  address: string | undefined;
}

export function AnalyticsTopUsers({
  topFriends,
  isLoading,
  address,
}: AnalyticsTopUsersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Top Users by Staking
      </h3>
      <div className="space-y-3">
        {isLoading ? (
          // Loading skeleton for top friends
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                  #{index + 1}
                </span>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <div className="animate-pulse bg-gray-300 dark:bg-gray-600 w-4 h-4 rounded"></div>
                </div>
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-20 rounded"></div>
              </div>
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-16 rounded"></div>
            </div>
          ))
        ) : address && topFriends.length > 0 ? (
          topFriends.map((friend, index) => (
            <div
              key={friend.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                  #{index + 1}
                </span>
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {friend.avatar}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {friend.name}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {friend.stakedAmount} staked
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <IoPeopleOutline className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">
              {address
                ? "No other users found"
                : "Connect wallet to see users"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 