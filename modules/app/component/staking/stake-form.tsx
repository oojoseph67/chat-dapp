import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useUserChainInfo, useUserNativeBalance } from "@/modules/query";
import { useMinStakeAmountQuery } from "@/modules/query";
import { useStakeMutation } from "@/modules/mutation/contract/staking-mutations";

export function StakeForm() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  const { balanceData, isBalanceLoading } = useUserNativeBalance();
  const { data: minStakeAmount = 0, isLoading: isMinStakeLoading } =
    useMinStakeAmountQuery();
  const stakeMutation = useStakeMutation();

  const [stakeAmount, setStakeAmount] = useState("");

  // Get native balance and symbol
  const userBalance = balanceData?.displayValue
    ? parseFloat(balanceData.displayValue)
    : 0;
  const balanceSymbol = balanceData?.symbol || "XFI";

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    stakeMutation.mutate(
      { amount: parseFloat(stakeAmount) },
      {
        onSuccess() {
          setStakeAmount("");
        },
        onError() {
          setStakeAmount("");
        },
      }
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mr-3">
          <IoAddOutline className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Stake Tokens
        </h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount to Stake
          </label>
          <div className="relative">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="0.00"
              min={minStakeAmount}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={() => setStakeAmount(userBalance.toString())}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary/90"
            >
              MAX
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Available:{" "}
            {isBalanceLoading
              ? "Loading..."
              : `${userBalance.toFixed(4)} ${balanceSymbol}`}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Minimum Stake:
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              {isMinStakeLoading
                ? "Loading..."
                : `${minStakeAmount.toFixed(4)} ${balanceSymbol}`}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600 dark:text-gray-400">
              Staking Type:
            </span>
            <span className="text-gray-900 dark:text-white font-medium">
              Flexible
            </span>
          </div>
        </div>

        <button
          onClick={handleStake}
          disabled={
            !stakeAmount ||
            parseFloat(stakeAmount) <= 0 ||
            stakeMutation.isPending
          }
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {stakeMutation.isPending ? "Staking..." : "Stake Tokens"}
        </button>
      </div>
    </div>
  );
}
