import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAndConfirmTransaction } from "thirdweb";
import { queryKeys } from "@/modules/query/query-keys";
import { prepareSetUsername } from "./chat-dapp-mutation.contract";
import { useUserChainInfo } from "@/modules/query";

// Username mutations
export function useSetUsernameMutation() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username }: { username: string }) => {
      if (!account) {
        throw new Error("No active account found");
      }

      console.log({ username });

      const transaction = prepareSetUsername({ username });
      console.log({ transaction });

      const transactionReceipt = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      if (transactionReceipt.status === "reverted") {
        throw new Error("Failed to set username");
      }

      return {
        transactionHash: transactionReceipt.transactionHash,
      };
    },
    onSuccess: (_, { username }) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.username(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.hasUsername(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.usernameByAddress(address!),
      });
    },
    meta: {
      loadingMessage: {
        title: "Setting Username",
        description: "Setting your username...",
      },
      successMessage: {
        title: "Username Set",
        description: "Your username has been set successfully!",
      },
      errorMessage: {
        title: "Username Set Failed",
        description: "Failed to set username. Please try again.",
      },
    },
  });
}
