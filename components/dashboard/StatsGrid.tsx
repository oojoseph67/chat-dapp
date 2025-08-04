import {
  IoStatsChartOutline,
  IoChatbubbleOutline,
  IoWalletOutline,
  IoPeopleOutline,
  IoTrendingUpOutline,
  IoGiftOutline,
} from "react-icons/io5";
import { StatsCard } from "./StatsCard";

interface StatsGridProps {
  address: string | undefined;
  stats: {
    totalStaked: number | null;
    totalEarned: number;
    friendsCount: number;
    messagesSent: number;
    tipsSent: number;
    tipsReceived: number;
  };
  totalUsers: number;
  activeUsersCount: number;
  isActiveUsersLoading: boolean;
}

export function StatsGrid({
  address,
  stats,
  totalUsers,
  activeUsersCount,
  isActiveUsersLoading,
}: StatsGridProps) {
  console.log({
    address,
    stats,
    totalUsers,
    activeUsersCount,
    isActiveUsersLoading,
  });

  if (address) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Staked"
          value={stats.totalStaked ? stats.totalStaked.toLocaleString() : "0"}
          icon={<IoWalletOutline className="w-6 h-6" />}
          iconBgColor="bg-blue-100 dark:bg-blue-900/20"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatsCard
          title="Total Earned"
          value={stats.totalEarned.toLocaleString()}
          icon={<IoTrendingUpOutline className="w-6 h-6" />}
          iconBgColor="bg-green-100 dark:bg-green-900/20"
          iconColor="text-green-600 dark:text-green-400"
        />
        <StatsCard
          title="Friends"
          value={stats.friendsCount}
          icon={<IoPeopleOutline className="w-6 h-6" />}
          iconBgColor="bg-purple-100 dark:bg-purple-900/20"
          iconColor="text-purple-600 dark:text-purple-400"
        />
        <StatsCard
          title="Messages Sent"
          value={stats.messagesSent}
          icon={<IoChatbubbleOutline className="w-6 h-6" />}
          iconBgColor="bg-orange-100 dark:bg-orange-900/20"
          iconColor="text-orange-600 dark:text-orange-400"
        />
        <StatsCard
          title="Tips Sent"
          value={stats.tipsSent}
          icon={<IoGiftOutline className="w-6 h-6" />}
          iconBgColor="bg-red-100 dark:bg-red-900/20"
          iconColor="text-red-600 dark:text-red-400"
        />
        <StatsCard
          title="Tips Received"
          value={stats.tipsReceived}
          icon={<IoGiftOutline className="w-6 h-6" />}
          iconBgColor="bg-pink-100 dark:bg-pink-900/20"
          iconColor="text-pink-600 dark:text-pink-400"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Users"
        value={totalUsers.toLocaleString()}
        icon={<IoPeopleOutline className="w-6 h-6" />}
        iconBgColor="bg-blue-100 dark:bg-blue-900/20"
        iconColor="text-blue-600 dark:text-blue-400"
      />
      <StatsCard
        title="Active Users"
        value={isActiveUsersLoading ? "Loading..." : activeUsersCount}
        icon={<IoTrendingUpOutline className="w-6 h-6" />}
        iconBgColor="bg-green-100 dark:bg-green-900/20"
        iconColor="text-green-600 dark:text-green-400"
      />
      <StatsCard
        title="Platform Status"
        value="Active"
        icon={<IoStatsChartOutline className="w-6 h-6" />}
        iconBgColor="bg-purple-100 dark:bg-purple-900/20"
        iconColor="text-purple-600 dark:text-purple-400"
      />
      <StatsCard
        title="Connect Wallet"
        value="To View"
        icon={<IoWalletOutline className="w-6 h-6" />}
        iconBgColor="bg-orange-100 dark:bg-orange-900/20"
        iconColor="text-orange-600 dark:text-orange-400"
      />
    </div>
  );
}
