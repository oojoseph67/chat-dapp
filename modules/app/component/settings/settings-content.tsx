import { ProfileSettings } from "./profile-settings";
import { SecuritySettings } from "./security-settings";
import { NotificationSettings } from "./notification-settings";
import { WalletSettings } from "./wallet-settings";
import { AppearanceSettings } from "./appearance-settings";
import { LanguageSettings } from "./language-settings";

interface SettingsContentProps {
  activeTab: string;
}

export function SettingsContent({ activeTab }: SettingsContentProps) {
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      // case "security":
      //   return <SecuritySettings />;
      // case "notifications":
      //   return <NotificationSettings />;
      case "wallet":
        return <WalletSettings />;
      case "appearance":
        return <AppearanceSettings />;
      // case "language":
      //   return <LanguageSettings />;
      // default:
      //   return <ProfileSettings />;
    }
  };

  return <div className="flex-1 p-6">{renderContent()}</div>;
}
