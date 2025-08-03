import { useState } from "react";
import {
  IoWalletOutline,
  IoTrendingUpOutline,
  IoTimeOutline,
  IoAddOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import { useUserChainInfo } from "@/modules/query";
import { WalletWarning } from "@/modules/app/component/wallet-warning";

export default function Staking() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [userBalance] = useState(address ? 5000 : 0);
  const [totalStaked] = useState(address ? 1250 : 0);
  const [totalEarned] = useState(address ? 85 : 0);

  const [stakingPositions] = useState([
    {
      id: 1,
      amount: 500,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      earned: 25,
      status: "active",
    },
    {
      id: 2,
      amount: 750,
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      earned: 35,
      status: "active",
    },
  ]);

  const handleStake = () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    console.log("Staking:", stakeAmount);
    setStakeAmount("");
  };

  const handleUnstake = () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return;
    console.log("Unstaking:", unstakeAmount);
    setUnstakeAmount("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Staking
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Stake your tokens to earn rewards and unlock premium features.
        </p>
      </div>

      {!address && (
        <WalletWarning 
          title="Connect Your Wallet"
          message="Please connect your wallet to view your staking information and start staking tokens."
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Available Balance
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {userBalance.toLocaleString()}
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
                {totalStaked.toLocaleString()}
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
                {totalEarned.toLocaleString()}
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
                {address ? stakingPositions.length : 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
              <IoWalletOutline className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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
                Available: {userBalance.toLocaleString()} tokens
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Staking Type:
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  Flexible
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600 dark:text-gray-400">
                  No Lock Period:
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  Stake anytime
                </span>
              </div>
            </div>

            <button
              onClick={handleStake}
              disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Stake Tokens
            </button>
          </div>
        </div>

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
                  onClick={() => setUnstakeAmount(totalStaked.toString())}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  MAX
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Staked: {totalStaked.toLocaleString()} tokens
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Earned Rewards:
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {totalEarned} tokens
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
              disabled={!unstakeAmount || parseFloat(unstakeAmount) <= 0}
              className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Unstake Tokens
            </button>
          </div>
        </div>
      </div>

      {address && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Your Staking Positions
            </h3>
          </div>
          <div className="p-6">
            {stakingPositions.length === 0 ? (
              <div className="text-center py-8">
                <IoWalletOutline className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No staking positions found. Start staking to earn rewards!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {stakingPositions.map((position) => (
                  <div
                    key={position.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <IoWalletOutline className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {position.amount.toLocaleString()} tokens
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Started:{" "}
                          {new Date(position.startDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        +{position.earned} earned
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ends: {new Date(position.endDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          position.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        {position.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
