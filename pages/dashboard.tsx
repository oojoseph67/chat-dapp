import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  IoStatsChartOutline,
  IoChatbubbleOutline,
  IoWalletOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoTrendingUpOutline,
  IoNotificationsOutline,
  IoAddOutline,
} from "react-icons/io5";
import { useUserChainInfo } from "@/modules/query";
import {
  useRewardRateQuery,
  useRewardIntervalQuery,
  useRewardTokenQuery,
  useActiveUsersCountQuery,
} from "@/modules/query";
import { WalletWarning } from "@/modules/app/component/wallet-warning";
import { StakingRequirement } from "@/modules/app/component/staking-requirement";

export default function Dashboard() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  // Contract reward data queries
  const { data: rewardRate = 0, isLoading: isRewardRateLoading } =
    useRewardRateQuery();
  const { data: rewardInterval = 0, isLoading: isRewardIntervalLoading } =
    useRewardIntervalQuery();
  const { data: rewardToken = "", isLoading: isRewardTokenLoading } =
    useRewardTokenQuery();
  const { data: activeUsersCount = 0, isLoading: isActiveUsersLoading } =
    useActiveUsersCountQuery();

  // Platform statistics
  const totalUsers = 1000; // Fixed total users count

  const [recentActivity] = useState([
    {
      id: 1,
      type: "message",
      user: "CryptoAlice",
      action: "sent you a message",
      time: "2 minutes ago",
      avatar: "CA",
    },
    {
      id: 2,
      type: "stake",
      user: "You",
      action: "staked 100 tokens",
      time: "1 hour ago",
      avatar: "U",
    },
    {
      id: 3,
      type: "reward",
      user: "System",
      action: "earned 5 tokens from engagement",
      time: "3 hours ago",
      avatar: "S",
    },
    {
      id: 4,
      type: "friend",
      user: "DeFiBob",
      action: "added you as a friend",
      time: "1 day ago",
      avatar: "DB",
    },
  ]);

  const [stats] = useState({
    totalStaked: address ? 1250 : 0,
    totalEarned: address ? 85 : 0,
    friendsCount: address ? 12 : 0,
    messagesSent: address ? 47 : 0,
  });

  return (
    <StakingRequirement>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
        <title>FriendFi Dashboard - Your FriendFi Account Overview</title>
        <meta
          name="description"
          content="Your FriendFi account overview, including staked tokens, earned rewards, friends, and recent activity."
        />
        <meta
          name="keywords"
          content="FriendFi, staking, rewards, friends, dashboard"
        />
        <meta name="author" content="FriendFi" />
      </Head>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome back! Here's what's happening with your FriendFi account.
        </p>
      </div>

      {!address ? (
        <div className="mb-8">
          <WalletWarning
            title="Connect Your Wallet"
            message="Please connect your wallet to view your dashboard information and access all features."
          />
        </div>
      ) : (
        <div className="mb-8">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <IoWalletOutline className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Wallet Connected
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Welcome back! Your wallet is connected and ready to use.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {address ? (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Staked
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalStaked.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <IoWalletOutline className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Earned
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalEarned.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <IoTrendingUpOutline className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Friends
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.friendsCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                  <IoPeopleOutline className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Messages Sent
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.messagesSent}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                  <IoChatbubbleOutline className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {totalUsers.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  <IoPeopleOutline className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {isActiveUsersLoading ? "Loading..." : activeUsersCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                  <IoTrendingUpOutline className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Platform Status
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    Active
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                  <IoStatsChartOutline className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Connect Wallet
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    To View
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                  <IoWalletOutline className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions and Activity - Only show when wallet is connected */}
      {address && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.slice(0, 3).map((activity) => (
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
        </div>
      )}

      {/* Reward Contract Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Reward Contract Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Reward Interval
              </h4>
              <IoTimeOutline className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {isRewardIntervalLoading ? (
                <span className="text-sm text-gray-500">Loading...</span>
              ) : (
                `${Math.floor(rewardInterval / 3600)} hours`
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {isRewardIntervalLoading ? "" : `${rewardInterval} seconds`}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Reward Rate
              </h4>
              <IoTrendingUpOutline className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {isRewardRateLoading ? (
                <span className="text-sm text-gray-500">Loading...</span>
              ) : (
                `${(rewardRate / 1e18).toFixed(6)} XFI`
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {isRewardRateLoading ? "" : `${rewardRate} wei`}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Reward Token
              </h4>
              <IoWalletOutline className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white break-all">
              {isRewardTokenLoading ? (
                <span className="text-sm text-gray-500">Loading...</span>
              ) : (
                rewardToken
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Contract Address
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
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
      </div>
    </StakingRequirement>
  );
}
