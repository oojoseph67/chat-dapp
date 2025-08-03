import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAndConfirmTransaction } from "thirdweb";
import { queryKeys } from "@/modules/query/query-keys";
import { prepareClaimRewards } from "./chat-dapp-mutation.contract";
import { useUserChainInfo } from "@/modules/query";

// Reward mutations
export function useClaimRewardsMutation() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!account) {
        throw new Error("No active account found");
      }

      const transaction = prepareClaimRewards();

      const transactionReceipt = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      if (transactionReceipt.status === "reverted") {
        throw new Error("Failed to claim rewards");
      }

      return {
        transactionHash: transactionReceipt.transactionHash,
      };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.rewards(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.activity(address!),
      });
    },
    meta: {
      loadingMessage: {
        title: "Claiming Rewards",
        description: "Claiming your rewards...",
      },
      successMessage: {
        title: "Rewards Claimed",
        description: "Your rewards have been claimed successfully!",
      },
      errorMessage: {
        title: "Claim Failed",
        description: "Failed to claim rewards. Please try again.",
      },
    },
  });
}
