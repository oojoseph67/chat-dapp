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
} from "./chat-dapp-query.contract";

// Contract state query hooks
export function useOwner() {
  return useQuery({
    queryKey: queryKeys.contract.owner,
    queryFn: async (): Promise<string> => {
      return await getOwner();
    },
    refetchInterval: 60000, // refetch every minute
  });
}

export function useMinStakeAmount() {
  return useQuery({
    queryKey: queryKeys.contract.minStakeAmount,
    queryFn: async (): Promise<number> => {
      return await getMinStakeAmount();
    },
    refetchInterval: 300000, // refetch every 5 minutes
  });
}

export function useRewardRate() {
  return useQuery({
    queryKey: queryKeys.contract.rewardRate,
    queryFn: async (): Promise<number> => {
      return await getRewardRate();
    },
    refetchInterval: 300000, // refetch every 5 minutes
  });
}

export function useRewardInterval() {
  return useQuery({
    queryKey: queryKeys.contract.rewardInterval,
    queryFn: async (): Promise<number> => {
      return await getRewardInterval();
    },
    refetchInterval: 300000, // refetch every 5 minutes
  });
}

export function useRewardToken() {
  return useQuery({
    queryKey: queryKeys.contract.rewardToken,
    queryFn: async (): Promise<string> => {
      return await getRewardToken();
    },
    refetchInterval: 300000, // refetch every 5 minutes
  });
}

// User-specific query hooks
export function useStakedAmount(address: string) {
  return useQuery({
    queryKey: queryKeys.user.stakedAmount(address),
    queryFn: async (): Promise<number> => {
      return await getStakedAmount({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useHasUserUsername(address: string) {
  return useQuery({
    queryKey: queryKeys.user.hasUsername(address),
    queryFn: async (): Promise<boolean> => {
      return await hasUserUsername({ address });
    },
    enabled: !!address,
    refetchInterval: 60000, // refetch every minute
  });
}

export function useUserUsername(address: string) {
  return useQuery({
    queryKey: queryKeys.user.username(address),
    queryFn: async (): Promise<string> => {
      return await getUserUsername({ address });
    },
    enabled: !!address,
    refetchInterval: 60000, // refetch every minute
  });
}

export function useUserMessageCount(address: string) {
  return useQuery({
    queryKey: queryKeys.user.messageCount(address),
    queryFn: async (): Promise<number> => {
      return await getUserMessageCount({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserTipStats(address: string) {
  return useQuery({
    queryKey: queryKeys.user.tipStats(address),
    queryFn: async (): Promise<{ sent: number; received: number }> => {
      return await getUserTipStats({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserStake(address: string) {
  return useQuery({
    queryKey: queryKeys.user.stake(address),
    queryFn: async (): Promise<number> => {
      return await getUserStake({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useLastActive(address: string) {
  return useQuery({
    queryKey: queryKeys.user.lastActive(address),
    queryFn: async (): Promise<number> => {
      return await getLastActive({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserActivity(address: string) {
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

export function useUserSentMessages(address: string) {
  return useQuery({
    queryKey: queryKeys.user.sentMessages(address),
    queryFn: async (): Promise<number[]> => {
      return await getUserSentMessages({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserReceivedMessages(address: string) {
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
export function useMessage(messageId: number) {
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

export function useMessageByIndex(messageId: number) {
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
export function useCalculateRewards(address: string) {
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
export function useUserSentMessageAtIndex(address: string, index: number) {
  return useQuery({
    queryKey: queryKeys.user.sentMessageAtIndex(address, index),
    queryFn: async (): Promise<number> => {
      return await getUserSentMessageAtIndex({ address, index });
    },
    enabled: !!address && index >= 0,
    refetchInterval: 60000, // refetch every minute
  });
}

export function useUserReceivedMessageAtIndex(address: string, index: number) {
  return useQuery({
    queryKey: queryKeys.user.receivedMessageAtIndex(address, index),
    queryFn: async (): Promise<number> => {
      return await getUserReceivedMessageAtIndex({ address, index });
    },
    enabled: !!address && index >= 0,
    refetchInterval: 60000, // refetch every minute
  });
}

export function useUserActivityByAddress(address: string) {
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

export function useUsernameByAddress(address: string) {
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
export function useActiveUsers() {
  return useQuery({
    queryKey: queryKeys.contract.activeUsers,
    queryFn: async (): Promise<string[]> => {
      return await getActiveUsers();
    },
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useIsActiveUser(address: string) {
  return useQuery({
    queryKey: queryKeys.user.isActive(address),
    queryFn: async (): Promise<boolean> => {
      return await isActiveUser({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useActiveUsersCount() {
  return useQuery({
    queryKey: queryKeys.contract.activeUsersCount,
    queryFn: async (): Promise<number> => {
      return await getActiveUsersCount();
    },
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useTotalMessages() {
  return useQuery({
    queryKey: queryKeys.contract.totalMessages,
    queryFn: async (): Promise<number> => {
      return await getTotalMessages();
    },
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useStakedAmountByAddress(address: string) {
  return useQuery({
    queryKey: queryKeys.user.stakedAmountByAddress(address),
    queryFn: async (): Promise<number> => {
      return await getStakedAmountByAddress({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}

export function useUserActivities(address: string) {
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

export function useUserTips(address: string) {
  return useQuery({
    queryKey: queryKeys.user.tips(address),
    queryFn: async (): Promise<{ sent: number; received: number }> => {
      return await getUserTips({ address });
    },
    enabled: !!address,
    refetchInterval: 30000, // refetch every 30 seconds
  });
}
