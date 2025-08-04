import { IoTimeOutline, IoChatbubbleOutline, IoGiftOutline } from "react-icons/io5";

interface Activity {
  id: string;
  type: "message";
  description: string;
  time: string;
  value: string;
  hasTip?: boolean;
  tipAmount?: number;
}

interface AnalyticsRecentActivityProps {
  recentActivity: Activity[];
  isLoading: boolean;
  address: string | undefined;
}

export function AnalyticsRecentActivity({
  recentActivity,
  isLoading,
  address,
}: AnalyticsRecentActivityProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeleton for recent activity
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 w-4 h-4 rounded"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-3/4 rounded mb-1"></div>
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-3 w-1/2 rounded"></div>
              </div>
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-12 rounded"></div>
            </div>
          ))
        ) : recentActivity.length > 0 ? (
                        recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    {activity.hasTip ? (
                      <IoGiftOutline className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <IoTimeOutline className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <IoTimeOutline className="w-3 h-3 mr-1" />
                      {activity.time}
                      {activity.hasTip && (
                        <span className="ml-2 text-yellow-600 dark:text-yellow-400 flex items-center">
                          <IoGiftOutline className="w-3 h-3 mr-1" />
                          Tip: {activity.tipAmount} XFI
                        </span>
                      )}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${
                    activity.hasTip 
                      ? "text-yellow-600 dark:text-yellow-400" 
                      : "text-green-600 dark:text-green-400"
                  }`}>
                    {activity.value}
                  </span>
                </div>
              ))
        ) : (
          <div className="text-center py-8">
            <IoChatbubbleOutline className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400">
              {address ? "No recent activity" : "Connect wallet to see activity"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 