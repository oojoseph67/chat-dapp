import {
  useUserChainInfo,
  useHasUserUsernameQuery,
  useUserStakeQuery,
} from "@/modules/query";
import { useRegisterUserMutation } from "@/modules/mutation";
import { useState } from "react";
import Head from "next/head";
import { IoWalletOutline, IoArrowForwardOutline, IoPersonAddOutline } from "react-icons/io5";
import Link from "next/link";

interface StakingRequirementProps {
  children: React.ReactNode;
}

export function StakingRequirement({ children }: StakingRequirementProps) {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const [username, setUsername] = useState("");

  const { data: hasUsername = false, isLoading: isLoadingUsername } = useHasUserUsernameQuery(address || "");
  const { data: userStake = 0, isLoading: isLoadingStake } = useUserStakeQuery(address || "");
  const registerUserMutation = useRegisterUserMutation();

  const isLoading = isLoadingUsername || isLoadingStake;
  const isActiveUser = userStake > 0;

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length >= 3) {
      await registerUserMutation.mutateAsync({ username: username.trim() });
      setUsername("");
    }
  };

  // If no wallet is connected, show wallet warning
  if (!address) {
    return (
      <>
        <Head>
          <title>Connect Wallet - FriendFi</title>
          <meta name="description" content="Please connect your wallet to access FriendFi features." />
          <meta name="keywords" content="wallet, connect, FriendFi" />
          <meta name="author" content="FriendFi" />
        </Head>
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
      </>
    );
  }

  // If loading, show loading state
  if (isLoading) {
    return (
      <>
        <Head>
          <title>Loading - FriendFi</title>
          <meta name="description" content="Checking user status..." />
          <meta name="keywords" content="loading, FriendFi" />
          <meta name="author" content="FriendFi" />
        </Head>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Checking user status...
          </p>
        </div>
      </div>
      </>
    );
  }

  // If user doesn't have a username, show registration form
  if (!hasUsername) {
    return (
      <>
        <Head>
          <title>Register - FriendFi</title>
          <meta name="description" content="Register your account to access FriendFi features." />
          <meta name="keywords" content="register, account, FriendFi" />
          <meta name="author" content="FriendFi" />
        </Head>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
            <div className="max-w-md mx-auto">
              <IoPersonAddOutline className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
                Welcome to FriendFi
              </h1>
              <p className="text-green-700 dark:text-green-300 mb-6 leading-relaxed">
                To get started, please register your account by choosing a username. 
                This will be your unique identifier in the FriendFi ecosystem.
              </p>
              
              <form onSubmit={handleRegisterUser} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username (min 3 characters)"
                    className="w-full px-4 py-3 border border-green-300 dark:border-green-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    minLength={3}
                    required
                    disabled={registerUserMutation.isPending}
                  />
                </div>
                <button
                  type="submit"
                  disabled={username.trim().length < 3 || registerUserMutation.isPending}
                  className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  {registerUserMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Account</span>
                      <IoArrowForwardOutline className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
              
              {registerUserMutation.isError && (
                <p className="text-red-600 dark:text-red-400 mt-4 text-sm">
                  {registerUserMutation.error?.message || "Registration failed. Please try again."}
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  // If user is not active (no stake), show staking requirement message
  if (!isActiveUser) {
    return (
      <>
        <Head>
          <title>Staking Required - FriendFi</title>
          <meta name="description" content="You need to have an active stake to access this feature." />
          <meta name="keywords" content="staking, required, FriendFi" />
          <meta name="author" content="FriendFi" />
        </Head>
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
      </>
    );
  }

  // If user has active stake, render the children
  return <>{children}</>;
}
