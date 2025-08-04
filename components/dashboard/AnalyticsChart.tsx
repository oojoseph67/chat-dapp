import { IoStatsChartOutline } from "react-icons/io5";

export function AnalyticsChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Engagement Analytics
      </h3>
      <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-center">
          <IoStatsChartOutline className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 dark:text-gray-400">
            Charts and analytics will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
} 