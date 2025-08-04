import { IoTimeOutline } from "react-icons/io5";

interface Activity {
  id: number;
  type: string;
  user: string;
  action: string;
  time: string;
  avatar: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.slice(0, 3).map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {activity.avatar}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <IoTimeOutline className="w-3 h-3 mr-1" />
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 