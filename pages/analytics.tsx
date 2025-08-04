import {
  IoStatsChartOutline,
  IoPeopleOutline,
  IoChatbubbleOutline,
  IoWalletOutline,
  IoGiftOutline,
} from "react-icons/io5";
import {
  useUserChainInfo,
  useUserMessageCountQuery,
  useUserTipStatsQuery,
  useUserStakeQuery,
  useCalculateRewardsQuery,
  useUserActivityQuery,
  useUserMessagesQuery,
  useAllUsersInfoQuery,
  useActiveUsersCountQuery,
  useTotalMessagesQuery,
  useUserNativeBalance,
  useTokenBalance,
  useRewardTokenQuery,
} from "@/modules/query";
import { WalletWarning } from "@/modules/app/component/wallet-warning";
import { StakingRequirement } from "@/modules/app/component/staking-requirement";
import { sanitizeUsernameForDisplay } from "@/utils/global";
import {
  AnalyticsHeader,
  AnalyticsStatsGrid,
  AnalyticsChart,
  AnalyticsRecentActivity,
  AnalyticsPlatformStats,
  AnalyticsTopUsers,
  AnalyticsStakingPerformance,
} from "@/components/dashboard";

export default function Analytics() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  const { data: rewardToken = "", isLoading: isRewardTokenLoading } =
    useRewardTokenQuery();

  const {
    balanceData: rewardTokenBalance,
    isBalanceLoading: isRewardTokenBalanceLoading,
  } = useTokenBalance(rewardToken);

  // User-specific queries
  const { data: messageCount = 0, isLoading: isMessageCountLoading } =
    useUserMessageCountQuery(address || "");
  const {
    data: tipStats = { sent: 0, received: 0 },
    isLoading: isTipStatsLoading,
  } = useUserTipStatsQuery(address || "");
  const { data: stakedAmount = 0, isLoading: isStakedAmountLoading } =
    useUserStakeQuery(address || "");
  const { data: rewards = 0, isLoading: isRewardsLoading } =
    useCalculateRewardsQuery(address || "");
  const { data: userActivity, isLoading: isUserActivityLoading } =
    useUserActivityQuery(address || "");
  const { data: userMessages, isLoading: isUserMessagesLoading } =
    useUserMessagesQuery();
  const { data: allUsersInfo = [], isLoading: isAllUsersLoading } =
    useAllUsersInfoQuery();
  const { data: activeUsersCount = 0, isLoading: isActiveUsersLoading } =
    useActiveUsersCountQuery();
  const { data: totalMessages = 0, isLoading: isTotalMessagesLoading } =
    useTotalMessagesQuery();
  const { balanceData: nativeBalance, isBalanceLoading } =
    useUserNativeBalance();

  // Calculate engagement rate based on user activity vs total platform activity
  const engagementRate =
    totalMessages > 0 ? ((messageCount / totalMessages) * 100).toFixed(1) : "0";

  // Calculate total tips (sent + received)
  const totalTips = tipStats.sent + tipStats.received;

  // Get recent activity from user messages
  const recentActivity = userMessages
    ? [
        ...userMessages.sentMessages.slice(0, 2).map((msg, index) => ({
          id: `sent-${index}`,
          type: "message" as const,
          description: `Sent message to ${
            sanitizeUsernameForDisplay(msg.receiverUsername) ||
            msg.receiver.slice(0, 8)
          }...`,
          time: new Date(msg.timestamp * 1000).toLocaleString(),
          value: msg.tipAmount > 0 ? `+${msg.tipAmount} tip` : "+1",
          hasTip: msg.tipAmount > 0,
          tipAmount: msg.tipAmount,
        })),
        ...userMessages.receivedMessages.slice(0, 2).map((msg, index) => ({
          id: `received-${index}`,
          type: "message" as const,
          description: `Received message from ${
            sanitizeUsernameForDisplay(msg.senderUsername) ||
            msg.sender.slice(0, 8)
          }...`,
          time: new Date(msg.timestamp * 1000).toLocaleString(),
          value: msg.tipAmount > 0 ? `+${msg.tipAmount} tip` : "+1",
          hasTip: msg.tipAmount > 0,
          tipAmount: msg.tipAmount,
        })),
      ].slice(0, 4)
    : [];

  // Get top friends by message count (from all users info)
  const topFriends = allUsersInfo
    .filter((user) => user.address !== address)
    .sort((a, b) => (b.stakedAmount || 0) - (a.stakedAmount || 0))
    .slice(0, 4)
    .map((user, index) => ({
      name:
        sanitizeUsernameForDisplay(user.username) ||
        user.address.slice(0, 8) + "...",
      messages: Math.floor(Math.random() * 50) + 10, // Mock message count since not available in contract
      avatar: user.username
        ? sanitizeUsernameForDisplay(user.username).slice(0, 2).toUpperCase()
        : user.address.slice(2, 4).toUpperCase(),
      stakedAmount: user.stakedAmount || 0,
    }));

  const stats = [
    {
      title: "Total Messages",
      value: address ? messageCount.toString() : "0",
      change: address ? "+12.5%" : "0%", // Mock change since historical data not available
      trend: (address ? "up" : "down") as "up" | "down",
      icon: IoChatbubbleOutline,
      color: "blue",
      isLoading: isMessageCountLoading,
    },
    {
      title: "Active Friends",
      value: address ? activeUsersCount.toString() : "0",
      change: address ? "+8.2%" : "0%", // Mock change
      trend: (address ? "up" : "down") as "up" | "down",
      icon: IoPeopleOutline,
      color: "green",
      isLoading: isActiveUsersLoading,
    },
    {
      title: "Tokens Staked",
      value: address ? stakedAmount.toString() : "0",
      change: address ? "+15.3%" : "0%", // Mock change
      trend: (address ? "up" : "down") as "up" | "down",
      icon: IoWalletOutline,
      color: "purple",
      isLoading: isStakedAmountLoading,
    },
    {
      title: "Tips Received",
      value: address ? tipStats.received.toString() : "0",
      change: address ? "+5.2%" : "0%", // Mock change
      trend: (address ? "up" : "down") as "up" | "down",
      icon: IoGiftOutline,
      color: "yellow",
      isLoading: isTipStatsLoading,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      green:
        "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      purple:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      orange:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <StakingRequirement>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalyticsHeader address={address} />

        {!address && (
          <WalletWarning
            title="Connect Your Wallet"
            message="Please connect your wallet to view your analytics and performance data."
          />
        )}

        <AnalyticsStatsGrid stats={stats} />

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnalyticsChart />
          <AnalyticsRecentActivity
            recentActivity={recentActivity}
            isLoading={isUserMessagesLoading}
            address={address}
          />
        </div>

        <AnalyticsPlatformStats
          totalMessages={totalMessages}
          activeUsersCount={activeUsersCount}
          allUsersInfo={allUsersInfo}
          messageCount={messageCount}
          isTotalMessagesLoading={isTotalMessagesLoading}
          isActiveUsersLoading={isActiveUsersLoading}
          isAllUsersLoading={isAllUsersLoading}
          isMessageCountLoading={isMessageCountLoading}
          address={address}
        />

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnalyticsTopUsers
            topFriends={topFriends}
            isLoading={isAllUsersLoading}
            address={address}
          />
          <AnalyticsStakingPerformance
            stakedAmount={stakedAmount}
            rewards={rewards}
            tipStats={tipStats}
            nativeBalance={nativeBalance}
            rewardTokenBalance={rewardTokenBalance}
            isStakedAmountLoading={isStakedAmountLoading}
            isRewardsLoading={isRewardsLoading}
            isTipStatsLoading={isTipStatsLoading}
            isBalanceLoading={isBalanceLoading}
            isRewardTokenBalanceLoading={isRewardTokenBalanceLoading}
            address={address}
          />
        </div>
      </div>
    </StakingRequirement>
  );
}
