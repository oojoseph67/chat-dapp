import {
  IoStatsChartOutline,
  IoTrendingUpOutline,
  IoTrendingDownOutline,
  IoPeopleOutline,
  IoChatbubbleOutline,
  IoWalletOutline,
} from "react-icons/io5";

interface Stat {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  isLoading: boolean;
}

interface AnalyticsStatsGridProps {
  stats: Stat[];
}

export function AnalyticsStatsGrid({ stats }: AnalyticsStatsGridProps) {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      green:
        "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      purple:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      orange:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
      yellow:
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 ${getColorClasses(
                stat.color
              )} rounded-xl flex items-center justify-center`}
            >
              <stat.icon className="w-6 h-6" />
            </div>
            <div
              className={`flex items-center space-x-1 text-sm ${
                stat.trend === "up"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {stat.trend === "up" ? (
                <IoTrendingUpOutline className="w-4 h-4" />
              ) : (
                <IoTrendingDownOutline className="w-4 h-4" />
              )}
              <span>{stat.change}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.isLoading ? (
                <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-20 rounded"></div>
              ) : (
                stat.value
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 