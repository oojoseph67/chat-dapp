import {
  useUserChainInfo,
  useIsActiveUserQuery,
  useUserStakeQuery,
} from "@/modules/query";
import Link from "next/link";
import { IoWalletOutline, IoArrowForwardOutline } from "react-icons/io5";

interface StakingRequirementProps {
  children: React.ReactNode;
}

export function StakingRequirement({ children }: StakingRequirementProps) {
  const { account } = useUserChainInfo();
  const address = account?.address;

  const { data: userStake = 0, isLoading } = useUserStakeQuery(address || "");

  console.log({ userStake });

  const isActiveUser = userStake > 0;

  // If no wallet is connected, show wallet warning
  if (!address) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
          <IoWalletOutline className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300 mb-4">
            Please connect your wallet to access this feature.
          </p>
        </div>
      </div>
    );
  }

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Checking staking status...
          </p>
        </div>
      </div>
    );
  }

  // If user is not active (no stake), show staking requirement message
  if (!isActiveUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <IoWalletOutline className="w-16 h-16 text-blue-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              Staking Required
            </h1>
            <p className="text-blue-700 dark:text-blue-300 mb-6 leading-relaxed">
              To access this feature, you need to have an active stake. Staking
              helps secure the network and enables you to participate in the
              ecosystem.
            </p>
            <Link
              href="/staking"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <span>Go to Staking</span>
              <IoArrowForwardOutline className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If user has active stake, render the children
  return <>{children}</>;
}
