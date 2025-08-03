import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAndConfirmTransaction, toWei } from "thirdweb";
import { upload } from "thirdweb/storage";
import { queryKeys } from "@/modules/query/query-keys";
import { prepareStake, prepareUnstake } from "./chat-dapp-mutation.contract";
import { useUserChainInfo } from "@/modules/query";
import { getContractCustom } from "@/modules/blockchain";
import { chatContract } from "@/utils/configs";
import ChatContractABI from "@/modules/blockchain/abi/chat-dapp.json";

const chatContractInterface = getContractCustom({
  contractAddress: chatContract,
  abi: ChatContractABI,
});

// Staking mutations
export function useStakeMutation() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!account) {
        throw new Error("No active account found");
      }

      const transaction = prepareStake({ amount });

      console.log({ chatContractInterface });
      console.log({ transaction, amount });

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

export function useUnstakeMutation() {
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
