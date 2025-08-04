import { useState, useMemo } from "react";
import Head from "next/head";
import { useUserChainInfo } from "@/modules/query";
import {
  useRewardRateQuery,
  useRewardIntervalQuery,
  useRewardTokenQuery,
  useActiveUsersCountQuery,
  useContractBalance,
  useUserMessageCountQuery,
  useUserTipStatsQuery,
  useUserStakeQuery,
  useCalculateRewardsQuery,
  useAllUsersInfoQuery,
  useUserMessagesQuery,
} from "@/modules/query";
import { StakingRequirement } from "@/modules/app/component/staking-requirement";
import {
  DashboardHeader,
  StatsGrid,
  QuickActions,
  Notifications,
  RewardInfo,
  AnalyticsChart,
} from "@/components/dashboard";

export default function Dashboard() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  const { balanceData: contractBalance, isBalanceLoading } =
    useContractBalance();

  // Contract reward data queries
  const { data: rewardRate = 0, isLoading: isRewardRateLoading } =
    useRewardRateQuery();
  const { data: rewardInterval = 0, isLoading: isRewardIntervalLoading } =
    useRewardIntervalQuery();
  const { data: rewardToken = "", isLoading: isRewardTokenLoading } =
    useRewardTokenQuery();
  const { data: activeUsersCount = 0, isLoading: isActiveUsersLoading } =
    useActiveUsersCountQuery();

  // User-specific data queries
  const { data: messageCount = 0, isLoading: isMessageCountLoading } =
    useUserMessageCountQuery(address || "");
  const {
    data: tipStats = { sent: 0, received: 0 },
    isLoading: isTipStatsLoading,
  } = useUserTipStatsQuery(address || "");
  const { data: userStake = 0, isLoading: isUserStakeLoading } =
    useUserStakeQuery(address || "");
  const { data: totalEarned = 0, isLoading: isTotalEarnedLoading } =
    useCalculateRewardsQuery(address || "");
  const { data: allUsersInfo = [] } = useAllUsersInfoQuery();
  const { data: userMessages } = useUserMessagesQuery();

  // Calculate friends count from message history
  const friendsCount = useMemo(() => {
    if (!address || !userMessages) return 0;

    const receivedMessages = userMessages.receivedMessages;
    const sentMessages = userMessages.sentMessages;

    // Get all unique addresses that the current user has messaged with
    const friendAddresses = new Set<string>();

    // Add addresses from received messages
    receivedMessages.forEach((msg) => {
      friendAddresses.add(msg.sender);
    });

    // Add addresses from sent messages
    sentMessages.forEach((msg) => {
      friendAddresses.add(msg.receiver);
    });

    return friendAddresses.size;
  }, [address, userMessages]);

  // Platform statistics
  const totalUsers = 1000; // Fixed total users count

  const stats = useMemo(
    () => ({
      totalStaked:
        !isBalanceLoading && contractBalance?.displayValue
          ? Number(contractBalance.displayValue)
          : null,
      totalEarned: totalEarned,
      friendsCount: friendsCount,
      messagesSent: messageCount,
      tipsSent: tipStats.sent,
      tipsReceived: tipStats.received,
    }),
    [
      isBalanceLoading,
      contractBalance?.displayValue,
      totalEarned,
      friendsCount,
      messageCount,
      tipStats.sent,
      tipStats.received,
    ]
  );

  console.log({ contractBalance });
  console.log({ userMessages });
  console.log({ friendsCount });
  console.log({ tipStats });

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

        <DashboardHeader address={address} />

        <StatsGrid
          address={address}
          stats={stats}
          totalUsers={totalUsers}
          activeUsersCount={activeUsersCount}
          isActiveUsersLoading={isActiveUsersLoading}
        />

        {/* Quick Actions and Notifications - Only show when wallet is connected */}
        {address && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <QuickActions />
            {/* <Notifications /> */}
          </div>
        )}

        <RewardInfo
          rewardRate={rewardRate}
          rewardInterval={rewardInterval}
          rewardToken={rewardToken}
          isRewardRateLoading={isRewardRateLoading}
          isRewardIntervalLoading={isRewardIntervalLoading}
          isRewardTokenLoading={isRewardTokenLoading}
        />

        {/* <AnalyticsChart /> */}
      </div>
    </StakingRequirement>
  );
}
