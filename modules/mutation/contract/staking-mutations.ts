import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAndConfirmTransaction, toWei } from "thirdweb";
import { upload } from "thirdweb/storage";
import { queryKeys } from "@/modules/query/query-keys";
import { prepareStake, prepareUnstake } from "./chat-dapp-mutation.contract";
import { useUserChainInfo } from "@/modules/query";

// Staking mutations
export function useStake() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!account) {
        throw new Error("No active account found");
      }

      const transaction = prepareStake({ value: toWei(amount.toString()) });

      const transactionReceipt = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      if (transactionReceipt.status === "reverted") {
        throw new Error("Failed to stake");
      }

      return {
        transactionHash: transactionReceipt.transactionHash,
      };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.stake(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.stakedAmount(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.activity(address!),
      });
    },
    meta: {
      loadingMessage: {
        title: "Staking",
        description: "Staking your tokens...",
      },
      successMessage: {
        title: "Stake Successful",
        description: "Your tokens have been staked successfully!",
      },
      errorMessage: {
        title: "Stake Failed",
        description: "Failed to stake tokens. Please try again.",
      },
    },
  });
}

export function useUnstake() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!account) {
        throw new Error("No active account found");
      }

      const transaction = prepareUnstake();

      const transactionReceipt = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      if (transactionReceipt.status === "reverted") {
        throw new Error("Failed to unstake");
      }

      return {
        transactionHash: transactionReceipt.transactionHash,
      };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.stake(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.stakedAmount(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.activity(address!),
      });
    },
    meta: {
      loadingMessage: {
        title: "Unstaking",
        description: "Unstaking your tokens...",
      },
      successMessage: {
        title: "Unstake Successful",
        description: "Your tokens have been unstaked successfully!",
      },
      errorMessage: {
        title: "Unstake Failed",
        description: "Failed to unstake tokens. Please try again.",
      },
    },
  });
}
