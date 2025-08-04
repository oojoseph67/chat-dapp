// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { sendAndConfirmTransaction } from "thirdweb";
// import { queryKeys } from "@/modules/query/query-keys";
// import {
//   // prepareSetMinStakeAmount,
//   // prepareSetRewardRate,
//   // prepareSetRewardInterval,
//   // prepareWithdrawTokens,
// } from "./chat-dapp-mutation.contract";
// import { useUserChainInfo } from "@/modules/query";

// // Admin mutations
// export function useSetMinStakeAmountMutation() {
//   const { account } = useUserChainInfo();
//   const address = account?.address;
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ newAmount }: { newAmount: number }) => {
//       if (!account) {
//         throw new Error("No active account found");
//       }

//       const transaction = prepareSetMinStakeAmount({ newAmount });

//       const transactionReceipt = await sendAndConfirmTransaction({
//         account,
//         transaction,
//       });

//       if (transactionReceipt.status === "reverted") {
//         throw new Error("Failed to set minimum stake amount");
//       }

//       return {
//         transactionHash: transactionReceipt.transactionHash,
//       };
//     },
//     onSuccess: () => {
//       // Invalidate relevant queries
//       queryClient.invalidateQueries({
//         queryKey: queryKeys.contract.minStakeAmount,
//       });
//     },
//     meta: {
//       loadingMessage: {
//         title: "Setting Minimum Stake",
//         description: "Setting minimum stake amount...",
//       },
//       successMessage: {
//         title: "Minimum Stake Updated",
//         description: "Minimum stake amount has been updated successfully!",
//       },
//       errorMessage: {
//         title: "Update Failed",
//         description: "Failed to update minimum stake amount. Please try again.",
//       },
//     },
//   });
// }

// export function useSetRewardRateMutation() {
//   const { account } = useUserChainInfo();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ newRate }: { newRate: number }) => {
//       if (!account) {
//         throw new Error("No active account found");
//       }

//       const transaction = prepareSetRewardRate({ newRate });

//       const transactionReceipt = await sendAndConfirmTransaction({
//         account,
//         transaction,
//       });

//       if (transactionReceipt.status === "reverted") {
//         throw new Error("Failed to set reward rate");
//       }

//       return {
//         transactionHash: transactionReceipt.transactionHash,
//       };
//     },
//     onSuccess: () => {
//       // Invalidate relevant queries
//       queryClient.invalidateQueries({
//         queryKey: queryKeys.contract.rewardRate,
//       });
//     },
//     meta: {
//       loadingMessage: {
//         title: "Setting Reward Rate",
//         description: "Setting reward rate...",
//       },
//       successMessage: {
//         title: "Reward Rate Updated",
//         description: "Reward rate has been updated successfully!",
//       },
//       errorMessage: {
//         title: "Update Failed",
//         description: "Failed to update reward rate. Please try again.",
//       },
//     },
//   });
// }

// export function useSetRewardIntervalMutation() {
//   const { account } = useUserChainInfo();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ newInterval }: { newInterval: number }) => {
//       if (!account) {
//         throw new Error("No active account found");
//       }

//       const transaction = prepareSetRewardInterval({ newInterval });

//       const transactionReceipt = await sendAndConfirmTransaction({
//         account,
//         transaction,
//       });

//       if (transactionReceipt.status === "reverted") {
//         throw new Error("Failed to set reward interval");
//       }

//       return {
//         transactionHash: transactionReceipt.transactionHash,
//       };
//     },
//     onSuccess: () => {
//       // Invalidate relevant queries
//       queryClient.invalidateQueries({
//         queryKey: queryKeys.contract.rewardInterval,
//       });
//     },
//     meta: {
//       loadingMessage: {
//         title: "Setting Reward Interval",
//         description: "Setting reward interval...",
//       },
//       successMessage: {
//         title: "Reward Interval Updated",
//         description: "Reward interval has been updated successfully!",
//       },
//       errorMessage: {
//         title: "Update Failed",
//         description: "Failed to update reward interval. Please try again.",
//       },
//     },
//   });
// }

// export function useWithdrawTokensMutation() {
//   const { account } = useUserChainInfo();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       tokenAddress,
//       amount,
//     }: {
//       tokenAddress: string;
//       amount: number;
//     }) => {
//       if (!account) {
//         throw new Error("No active account found");
//       }

//       const transaction = prepareWithdrawTokens({ tokenAddress, amount });

//       const transactionReceipt = await sendAndConfirmTransaction({
//         account,
//         transaction,
//       });

//       if (transactionReceipt.status === "reverted") {
//         throw new Error("Failed to withdraw tokens");
//       }

//       return {
//         transactionHash: transactionReceipt.transactionHash,
//       };
//     },
//     onSuccess: () => {},
//     meta: {
//       loadingMessage: {
//         title: "Withdrawing Tokens",
//         description: "Withdrawing tokens...",
//       },
//       successMessage: {
//         title: "Tokens Withdrawn",
//         description: "Tokens have been withdrawn successfully!",
//       },
//       errorMessage: {
//         title: "Withdrawal Failed",
//         description: "Failed to withdraw tokens. Please try again.",
//       },
//     },
//   });
// }
