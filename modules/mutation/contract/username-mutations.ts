import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAndConfirmTransaction } from "thirdweb";
import { queryKeys } from "@/modules/query/query-keys";
import { prepareRegisterUser, prepareUpdateUsername } from "./chat-dapp-mutation.contract";
import { useUserChainInfo } from "@/modules/query";

// Register user mutation
export function useRegisterUserMutation() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ username }: { username: string }) => {
      if (!account) {
        throw new Error("No active account found");
      }

      console.log({ username });

      const transaction = prepareRegisterUser({ username });
      console.log({ transaction });

      const transactionReceipt = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      if (transactionReceipt.status === "reverted") {
        throw new Error("Failed to register user");
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
        title: "Registering User",
        description: "Registering your account...",
      },
      successMessage: {
        title: "User Registered",
        description: "Your account has been registered successfully!",
      },
      errorMessage: {
        title: "Registration Failed",
        description: "Failed to register user. Please try again.",
      },
    },
  });
}
