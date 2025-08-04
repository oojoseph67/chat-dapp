import Link from "next/link";
import {
  IoChatbubbleOutline,
  IoWalletOutline,
  IoAddOutline,
} from "react-icons/io5";

export function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <Link
          href="/messages"
          className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <IoChatbubbleOutline className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
          <span className="text-gray-700 dark:text-gray-300">
            Send Message
          </span>
        </Link>
        <Link
          href="/staking"
          className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <IoWalletOutline className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
          <span className="text-gray-700 dark:text-gray-300">
            Stake Tokens
          </span>
        </Link>
        <Link
          href="/friends"
          className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <IoAddOutline className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3" />
          <span className="text-gray-700 dark:text-gray-300">
            Add Friend
          </span>
        </Link>
      </div>
    </div>
  );
} 