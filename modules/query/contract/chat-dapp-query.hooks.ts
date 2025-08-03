import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  getOwner,
  getMinStakeAmount,
  getRewardRate,
  getRewardInterval,
  getRewardToken,
  getStakedAmount,
  hasUserUsername,
  getUserUsername,
  getUserMessageCount,
  getUserTipStats,
  getUserStake,
  getLastActive,
  getUserActivity,
  getUserSentMessages,
  getUserReceivedMessages,
  getMessage,
  getMessageByIndex,
  calculateRewards,
  getUserSentMessageAtIndex,
  getUserReceivedMessageAtIndex,
  getUserActivityByAddress,
  getUsernameByAddress,
  getActiveUsers,
  isActiveUser,
  getActiveUsersCount,
  getTotalMessages,
  getStakedAmountByAddress,
  getUserActivities,
  getUserTips,
  getAllUsersInfo,
} from "./chat-dapp-query.contract";

// Contract state query hooks
export function useOwnerQuery() {
  return useQuery({
    queryKey: queryKeys.contract.owner,
    queryFn: async (): Promise<string> => {
      return await getOwner();
    },
    refetchInterval: 60000, // refetch every minute
  });
}

export function useMinStakeAmountQuery() {
  return useQuery({
    queryKey: queryKeys.contract.minStakeAmount,
    queryFn: async (): Promise<number> => {
      return await getMinStakeAmount();
    },
    refetchInterval: 300000, // refetch every 5 minutes
  });
}

export function useRewardRateQuery() {
  return useQuery({
    queryKey: queryKeys.contract.rewardRate,
    queryFn: async (): Promise<number> => {
      return await getRewardRate();
    },
    refetchInterval: 300000, // refetch every 5 minutes
  });
}

export function useRewardIntervalQuery() {
  return useQuery({
    queryKey: queryKeys.contract.rewardInterval,
    queryFn: async (): Promise<number> => {
      return await getRewardInterval();
    },
    refetchInterval: 300000, // refetch every 5 minutes
  });
}

export function useRewardTokenQuery() {
  return useQuery({
    queryKey: queryKeys.contract.rewardToken,
    queryFn: async (): Promise<string> => {
      return await getRewardToken();
    },
    refetchInterval: 300000, // refetch every 5 minutes
  });
}

// User-specific query hooks
export function useStakedAmountQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.stakedAmount(address),
    queryFn: async (): Promise<number> => {
      return await getStakedAmount({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useHasUserUsernameQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.hasUsername(address),
    queryFn: async (): Promise<boolean> => {
      return await hasUserUsername({ address });
    },
    enabled: !!address,
    refetchInterval: 60000, // refetch every minute
  });
}

export function useUserUsernameQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.username(address),
    queryFn: async (): Promise<string> => {
      return await getUserUsername({ address });
    },
    enabled: !!address,
    refetchInterval: 60000, // refetch every minute
  });
}

export function useUserMessageCountQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.messageCount(address),
    queryFn: async (): Promise<number> => {
      return await getUserMessageCount({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserTipStatsQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.tipStats(address),
    queryFn: async (): Promise<{ sent: number; received: number }> => {
      return await getUserTipStats({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserStakeQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.stake(address),
    queryFn: async (): Promise<number> => {
      return await getUserStake({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useLastActiveQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.lastActive(address),
    queryFn: async (): Promise<number> => {
      return await getLastActive({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserActivityQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.activity(address),
    queryFn: async (): Promise<{
      messageCount: number;
      tipSent: number;
      tipReceived: number;
      lastActive: number;
      stakeAmount: number;
    }> => {
      return await getUserActivity({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserSentMessagesQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.sentMessages(address),
    queryFn: async (): Promise<number[]> => {
      return await getUserSentMessages({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserReceivedMessagesQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.receivedMessages(address),
    queryFn: async (): Promise<number[]> => {
      return await getUserReceivedMessages({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

// Message query hooks
export function useMessageQuery(messageId: number) {
  return useQuery({
    queryKey: queryKeys.messages.message(messageId),
    queryFn: async (): Promise<{
      sender: string;
      receiver: string;
      contentIPFSHash: string;
      timestamp: number;
      tipAmount: number;
      isEncrypted: boolean;
    }> => {
      return await getMessage({ messageId });
    },
    enabled: messageId !== undefined && messageId >= 0,
    refetchInterval: 60000, // refetch every minute
  });
}

export function useMessageByIndexQuery(messageId: number) {
  return useQuery({
    queryKey: queryKeys.messages.messageByIndex(messageId),
    queryFn: async (): Promise<{
      sender: string;
      receiver: string;
      contentIPFSHash: string;
      timestamp: number;
      tipAmount: number;
      isEncrypted: boolean;
    }> => {
      return await getMessageByIndex({ messageId });
    },
    enabled: messageId !== undefined && messageId >= 0,
    refetchInterval: 60000, // refetch every minute
  });
}

// Reward calculation hook
export function useCalculateRewardsQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.rewards(address),
    queryFn: async (): Promise<number> => {
      return await calculateRewards({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

// Array access query hooks
export function useUserSentMessageAtIndexQuery(address: string, index: number) {
  return useQuery({
    queryKey: queryKeys.user.sentMessageAtIndex(address, index),
    queryFn: async (): Promise<number> => {
      return await getUserSentMessageAtIndex({ address, index });
    },
    enabled: !!address && index >= 0,
    refetchInterval: 60000, // refetch every minute
  });
}

export function useUserReceivedMessageAtIndexQuery(
  address: string,
  index: number
) {
  return useQuery({
    queryKey: queryKeys.user.receivedMessageAtIndex(address, index),
    queryFn: async (): Promise<number> => {
      return await getUserReceivedMessageAtIndex({ address, index });
    },
    enabled: !!address && index >= 0,
    refetchInterval: 60000, // refetch every minute
  });
}

export function useUserActivityByAddressQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.activityByAddress(address),
    queryFn: async (): Promise<{
      messageCount: number;
      tipSent: number;
      tipReceived: number;
      lastActive: number;
      stakeAmount: number;
    }> => {
      return await getUserActivityByAddress({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUsernameByAddressQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.usernameByAddress(address),
    queryFn: async (): Promise<string> => {
      return await getUsernameByAddress({ address });
    },
    enabled: !!address,
    refetchInterval: 60000, // refetch every minute
  });
}

// New React Query hooks for the additional functions
export function useActiveUsersQuery() {
  return useQuery({
    queryKey: queryKeys.contract.activeUsers,
    queryFn: async (): Promise<string[]> => {
      return await getActiveUsers();
    },
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useIsActiveUserQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.isActive(address),
    queryFn: async (): Promise<boolean> => {
      return await isActiveUser({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useActiveUsersCountQuery() {
  return useQuery({
    queryKey: queryKeys.contract.activeUsersCount,
    queryFn: async (): Promise<number> => {
      return await getActiveUsersCount();
    },
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useTotalMessagesQuery() {
  return useQuery({
    queryKey: queryKeys.contract.totalMessages,
    queryFn: async (): Promise<number> => {
      return await getTotalMessages();
    },
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useStakedAmountByAddressQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.stakedAmountByAddress(address),
    queryFn: async (): Promise<number> => {
      return await getStakedAmountByAddress({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserActivitiesQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.activity(address),
    queryFn: async (): Promise<{
      messageCount: number;
      tipSent: number;
      tipReceived: number;
      lastActive: number;
      stakeAmount: number;
    }> => {
      return await getUserActivities({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserTipsQuery(address: string) {
  return useQuery({
    queryKey: queryKeys.user.tips(address),
    queryFn: async (): Promise<{ sent: number; received: number }> => {
      return await getUserTips({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useAllUsersInfoQuery() {
  return useQuery({
    queryKey: queryKeys.user.allUsersInfo,
    queryFn: async (): Promise<Array<{
      address: string;
      username: string;
      stakedAmount: number;
    }>> => {
      return await getAllUsersInfo();
    },
    // refetchInterval: 30000, // refetch every 30 seconds
    refetchInterval: 5000,
  });
}
