interface AnalyticsPlatformStatsProps {
  totalMessages: number;
  activeUsersCount: number;
  allUsersInfo: any[];
  messageCount: number;
  isTotalMessagesLoading: boolean;
  isActiveUsersLoading: boolean;
  isAllUsersLoading: boolean;
  isMessageCountLoading: boolean;
  address: string | undefined;
}

export function AnalyticsPlatformStats({
  totalMessages,
  activeUsersCount,
  allUsersInfo,
  messageCount,
  isTotalMessagesLoading,
  isActiveUsersLoading,
  isAllUsersLoading,
  isMessageCountLoading,
  address,
}: AnalyticsPlatformStatsProps) {
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Platform Statistics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {isTotalMessagesLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 mx-auto rounded"></div>
            ) : (
              totalMessages
            )}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Messages
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {isActiveUsersLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 mx-auto rounded"></div>
            ) : (
              activeUsersCount
            )}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Active Users
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {isAllUsersLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 mx-auto rounded"></div>
            ) : (
              allUsersInfo.length
            )}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Users
          </p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {isMessageCountLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 mx-auto rounded"></div>
            ) : address ? (
              messageCount
            ) : (
              "0"
            )}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your Messages
          </p>
        </div>
      </div>
    </div>
  );
} 