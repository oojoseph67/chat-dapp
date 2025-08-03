import { useState } from "react";
import Head from "next/head";
import { useUserChainInfo } from "@/modules/query";
import { WalletWarning } from "@/modules/app/component/wallet-warning";
import {
  SettingsSidebar,
  SettingsContent,
  LogoutButton,
} from "@/modules/app/component/settings";
import { SettingsTab } from "@/modules/app/component/settings/settings-sidebar";
import { StakingRequirement } from "@/modules/app/component/staking-requirement";

export default function Settings() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  return (
    <StakingRequirement>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Head>
          <title>Settings - FriendFi</title>
          <meta
            name="description"
            content="Manage your account preferences and security settings on FriendFi."
          />
          <meta
            name="keywords"
            content="settings, preferences, security, FriendFi"
          />
          <meta name="author" content="FriendFi" />
        </Head>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your account preferences and security settings.
          </p>
        </div>

        {!address && (
          <WalletWarning
            title="Connect Your Wallet"
            message="Please connect your wallet to access settings and manage your account."
          />
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row">
            <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <SettingsContent activeTab={activeTab} />
          </div>
        </div>

        {address && <LogoutButton />}
      </div>
    </StakingRequirement>
  );
}
