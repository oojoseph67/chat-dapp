import { useUserChainInfo } from "@/modules/query";

export function WalletSettings() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Wallet Settings
      </h2>

      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Connected Wallet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            MetaMask •{" "}
            {address
              ? address.slice(0, 6) + "..." + address.slice(-4)
              : "Not connected"}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Wallet Address: {address || "Not connected"}
          </p>
        </div>

        {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Transaction History
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            View your recent transactions and staking activities
          </p>
        </div> */}
      </div>
    </div>
  );
}
