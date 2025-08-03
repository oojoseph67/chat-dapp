import { useState } from "react";
import {
  IoPersonOutline,
  IoShieldOutline,
  IoNotificationsOutline,
  IoWalletOutline,
  IoColorPaletteOutline,
  IoLanguageOutline,
} from "react-icons/io5";

export type SettingsTab =
  | "profile"
  | "security"
  | "notifications"
  | "wallet"
  | "appearance"
  | "language";

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tabId: SettingsTab) => void;
}

const tabs: {
  id: SettingsTab;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "profile", name: "Profile", icon: IoPersonOutline },
  //   { id: "security", name: "Security", icon: IoShieldOutline },
  //   { id: "notifications", name: "Notifications", icon: IoNotificationsOutline },
  { id: "wallet", name: "Wallet", icon: IoWalletOutline },
  //   { id: "appearance", name: "Appearance", icon: IoColorPaletteOutline },
  //   { id: "language", name: "Language", icon: IoLanguageOutline },
];

export function SettingsSidebar({
  activeTab,
  onTabChange,
}: SettingsSidebarProps) {
  return (
    <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
      <nav className="p-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
