import { IoNotificationsOutline } from "react-icons/io5";

export function Notifications() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Notifications
      </h3>
      <div className="space-y-3">
        <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <IoNotificationsOutline className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              New Message
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              CryptoAlice sent you a message
            </p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <IoNotificationsOutline className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Reward Earned
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              You earned 5 tokens
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 