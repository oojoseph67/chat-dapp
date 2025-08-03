import { IoWalletOutline } from "react-icons/io5";
import { useUserChainInfo, useUserNativeBalance } from "@/modules/query";
import {
  useUserStakeQuery,
  useCalculateRewardsQuery,
} from "@/modules/query";

export function UserPositions() {
  const { account } = useUserChainInfo();

  const address = account?.address;
  const { balanceData } = useUserNativeBalance();

  const { data: userStake = 0, isLoading: isUserStakeLoading } =
    useUserStakeQuery(address || "");
  const { data: totalEarned = 0 } = useCalculateRewardsQuery(address || "");

  // Get balance symbol
  const balanceSymbol = balanceData?.symbol || "XFI";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Your Staking Positions
        </h3>
      </div>
      <div className="p-6">
        {isUserStakeLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500 dark:text-gray-400">
              Loading staking positions...
            </p>
          </div>
        ) : userStake > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <IoWalletOutline className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {userStake.toFixed(4)} {balanceSymbol}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Active staking position
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-green-600 dark:text-green-400">
                  +{totalEarned.toFixed(4)} earned
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Flexible staking
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  active
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <IoWalletOutline className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              No staking positions found. Start staking to earn rewards!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
