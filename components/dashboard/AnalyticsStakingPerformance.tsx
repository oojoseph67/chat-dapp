interface AnalyticsStakingPerformanceProps {
  stakedAmount: number;
  rewards: number;
  tipStats: { sent: number; received: number };
  nativeBalance: any;
  rewardTokenBalance: any;
  isStakedAmountLoading: boolean;
  isRewardsLoading: boolean;
  isTipStatsLoading: boolean;
  isBalanceLoading: boolean;
  isRewardTokenBalanceLoading: boolean;
  address: string | undefined;
}

export function AnalyticsStakingPerformance({
  stakedAmount,
  rewards,
  tipStats,
  nativeBalance,
  rewardTokenBalance,
  isStakedAmountLoading,
  isRewardsLoading,
  isTipStatsLoading,
  isBalanceLoading,
  isRewardTokenBalanceLoading,
  address,
}: AnalyticsStakingPerformanceProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Staking Performance
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total Staked
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {isStakedAmountLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-16 rounded"></div>
            ) : address ? (
              `${stakedAmount} XFI`
            ) : (
              "0 XFI"
            )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total Earned
          </span>
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {isRewardsLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-16 rounded"></div>
            ) : address ? (
              `${rewards} USDT`
            ) : (
              "0 USDT"
            )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Tips Sent
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {isTipStatsLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-16 rounded"></div>
            ) : address ? (
              `${tipStats.sent} XFI`
            ) : (
              "0 XFI"
            )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Tips Received
          </span>
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {isTipStatsLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-16 rounded"></div>
            ) : address ? (
              `${tipStats.received} XFI`
            ) : (
              "0 XFI"
            )}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Native Balance
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {isBalanceLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-16 rounded"></div>
            ) : address ? (
              `${Number(nativeBalance?.displayValue).toFixed(4) || "0"} ${
                nativeBalance?.symbol || "XFI"
              }`
            ) : (
              "0 XFI"
            )}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {rewardTokenBalance?.symbol || "USDT"} Balance
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {isRewardTokenBalanceLoading ? (
              <div className="animate-pulse bg-gray-300 dark:bg-gray-600 h-4 w-16 rounded"></div>
            ) : address ? (
              `${
                Number(rewardTokenBalance?.displayValue).toFixed(4) || "0"
              } ${rewardTokenBalance?.symbol || "USDT"}`
            ) : (
              "0 USDT"
            )}
          </span>
        </div>
      </div>
    </div>
  );
} 