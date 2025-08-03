import { useState } from "react";
import { 
  IoStatsChartOutline, 
  IoTrendingUpOutline, 
  IoTrendingDownOutline,
  IoPeopleOutline,
  IoChatbubbleOutline,
  IoWalletOutline,
  IoTimeOutline
} from "react-icons/io5";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    {
      title: "Total Messages",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: IoChatbubbleOutline,
      color: "blue"
    },
    {
      title: "Active Friends",
      value: "89",
      change: "+8.2%",
      trend: "up",
      icon: IoPeopleOutline,
      color: "green"
    },
    {
      title: "Tokens Staked",
      value: "2,450",
      change: "+15.3%",
      trend: "up",
      icon: IoWalletOutline,
      color: "purple"
    },
    {
      title: "Engagement Rate",
      value: "94.2%",
      change: "-2.1%",
      trend: "down",
      icon: IoStatsChartOutline,
      color: "orange"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "message",
      description: "Sent message to Alice Johnson",
      time: "2 minutes ago",
      value: "+1"
    },
    {
      id: 2,
      type: "stake",
      description: "Staked 100 tokens",
      time: "1 hour ago",
      value: "+100"
    },
    {
      id: 3,
      type: "reward",
      description: "Earned reward from engagement",
      time: "3 hours ago",
      value: "+5"
    },
    {
      id: 4,
      type: "friend",
      description: "Added Bob Smith as friend",
      time: "1 day ago",
      value: "+1"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      green: "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your engagement and platform performance.
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 w-fit">
          {["1d", "7d", "30d", "90d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                timeRange === range
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${getColorClasses(stat.color)} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}>
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
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Engagement Over Time
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <IoStatsChartOutline className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                Chart visualization will be displayed here
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <IoTimeOutline className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <IoTimeOutline className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {activity.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Friends by Engagement
          </h3>
          <div className="space-y-3">
                         {[
               { name: "CryptoAlice", messages: 47, avatar: "CA" },
               { name: "DeFiBob", messages: 32, avatar: "DB" },
               { name: "Web3Carol", messages: 28, avatar: "WC" },
               { name: "NFTDavid", messages: 19, avatar: "ND" }
             ].map((friend, index) => (
              <div key={friend.name} className="flex items-center justify-between">
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
                  {friend.messages} messages
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Staking Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Staked</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">2,450 tokens</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Earned</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">+85 tokens</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">APY</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">12.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">Next Reward</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">In 2 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 