import {
  IoTimeOutline,
  IoTrendingUpOutline,
  IoWalletOutline,
} from "react-icons/io5";

interface RewardInfoProps {
  rewardRate: number;
  rewardInterval: number;
  rewardToken: string;
  isRewardRateLoading: boolean;
  isRewardIntervalLoading: boolean;
  isRewardTokenLoading: boolean;
}

export function RewardInfo({
  rewardRate,
  rewardInterval,
  rewardToken,
  isRewardRateLoading,
  isRewardIntervalLoading,
  isRewardTokenLoading,
}: RewardInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Reward Contract Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Reward Interval
            </h4>
            <IoTimeOutline className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {isRewardIntervalLoading ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : (
              `${Math.floor(rewardInterval / 3600)} hours`
            )}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {isRewardIntervalLoading ? "" : `${rewardInterval} seconds`}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Reward Rate
            </h4>
            <IoTrendingUpOutline className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {isRewardRateLoading ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : (
              `${(rewardRate / 1e18).toFixed(6)} XFI`
            )}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {isRewardRateLoading ? "" : `${rewardRate} wei`}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Reward Token
            </h4>
            <IoWalletOutline className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-sm font-bold text-gray-900 dark:text-white break-all">
            {isRewardTokenLoading ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : (
              rewardToken
            )}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Contract Address
          </p>
        </div>
      </div>
    </div>
  );
} 