import { useState } from "react";
import { IoRemoveOutline } from "react-icons/io5";
import { useUserChainInfo } from "@/modules/query";
import {
  useStakedAmountQuery,
  useCalculateRewardsQuery,
} from "@/modules/query";
import { useUnstakeMutation } from "@/modules/mutation/contract/staking-mutations";

export function UnstakeForm() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const { data: stakedAmount = 0, isLoading: isStakedLoading } =
    useStakedAmountQuery(address || "");
  const { data: totalEarned = 0, isLoading: isRewardsLoading } =
    useCalculateRewardsQuery(address || "");
  const unstakeMutation = useUnstakeMutation();

  const [unstakeAmount, setUnstakeAmount] = useState("");

  // Get balance symbol (assuming XFI for now, could be made dynamic)
  const balanceSymbol = "XFI";

  const handleUnstake = () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return;
    unstakeMutation.mutate({ amount: parseFloat(unstakeAmount) });
    setUnstakeAmount("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mr-3">
          <IoRemoveOutline className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Unstake Tokens
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount to Unstake
          </label>
          <div className="relative">
            <input
              type="number"
              value={unstakeAmount}
              onChange={(e) => setUnstakeAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={() => setUnstakeAmount(stakedAmount.toString())}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              MAX
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Staked:{" "}
            {isStakedLoading
              ? "Loading..."
              : `${stakedAmount.toFixed(4)} ${balanceSymbol}`}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Earned Rewards:
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              {isRewardsLoading
                ? "Loading..."
                : `${totalEarned.toFixed(4)} ${balanceSymbol}`}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600 dark:text-gray-400">
              Unstaking Fee:
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              0%
            </span>
          </div>
        </div>

        <button
          onClick={handleUnstake}
          disabled={
            !unstakeAmount ||
            parseFloat(unstakeAmount) <= 0 ||
            unstakeMutation.isPending
          }
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {unstakeMutation.isPending ? "Unstaking..." : "Unstake Tokens"}
        </button>
      </div>
    </div>
  );
}
