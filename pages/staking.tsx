import Head from "next/head";
import { useUserChainInfo } from "@/modules/query";
import { WalletWarning } from "@/modules/app/component/wallet-warning";
import { StakeOverview } from "@/modules/app/component/staking/stake-overview";
import { StakeForm } from "@/modules/app/component/staking/stake-form";
import { UnstakeForm } from "@/modules/app/component/staking/unstake-form";
import { UserPositions } from "@/modules/app/component/staking/user-positions";

export default function Staking() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
        <title>Staking - FriendFi</title>
        <meta name="description" content="Stake your XFI tokens to earn rewards and unlock premium features on FriendFi." />
        <meta name="keywords" content="staking, rewards, XFI, token staking, FriendFi" />
        <meta name="author" content="FriendFi" />
      </Head>
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

      <StakeOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <StakeForm />
        <UnstakeForm />
      </div>

      {address && <UserPositions />}
    </div>
  );
}
