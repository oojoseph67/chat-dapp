import {
  IoWalletOutline,
  IoTrendingUpOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { useUserChainInfo, useUserNativeBalance } from "@/modules/query";
import { 
  useStakedAmount, 
  useCalculateRewards,
  useUserStake 
} from "@/modules/query/contract/chat-dapp-query.hooks";

export function StakeOverview() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const { balanceData, isBalanceLoading } = useUserNativeBalance();
  
  // Contract data queries
  const { data: stakedAmount = 0, isLoading: isStakedLoading } = useStakedAmount(address || "");
  const { data: totalEarned = 0, isLoading: isRewardsLoading } = useCalculateRewards(address || "");
  const { data: userStake = 0, isLoading: isUserStakeLoading } = useUserStake(address || "");

  // Get native balance and symbol
  const userBalance = balanceData?.displayValue ? parseFloat(balanceData.displayValue) : 0;
  const balanceSymbol = balanceData?.symbol || "XFI";

  // Calculate staking positions count (if user has staked, they have 1 position)
  const stakingPositionsCount = userStake > 0 ? 1 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Available Balance
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {isBalanceLoading
                ? "Loading..."
                : `${userBalance.toFixed(4)} ${balanceSymbol}`}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
            <IoWalletOutline className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Staked
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {isStakedLoading
                ? "Loading..."
                : `${stakedAmount.toFixed(4)} ${balanceSymbol}`}
            </p>
          </div>
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
            <IoTrendingUpOutline className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Earned
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {isRewardsLoading
                ? "Loading..."
                : `${totalEarned.toFixed(4)} ${balanceSymbol}`}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
            <IoTimeOutline className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Staking Positions
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {isUserStakeLoading ? "Loading..." : stakingPositionsCount}
            </p>
          </div>
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
            <IoWalletOutline className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
