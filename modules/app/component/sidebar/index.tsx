import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { cn } from "../../utils";
import {
  IoHomeOutline,
  IoChatbubbleOutline,
  IoWalletOutline,
  IoSettingsOutline,
  IoPeopleOutline,
  IoStatsChartOutline,
  IoClose,
} from "react-icons/io5";
import { useUserChainInfo } from "@/modules/query";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: IoHomeOutline,
  },
  {
    name: "Messages",
    href: "/messages",
    icon: IoChatbubbleOutline,
  },
  {
    name: "Friends",
    href: "/friends",
    icon: IoPeopleOutline,
  },
  {
    name: "Staking",
    href: "/staking",
    icon: IoWalletOutline,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: IoStatsChartOutline,
  },
  // {
  //   name: "Settings",
  //   href: "/settings",
  //   icon: IoSettingsOutline,
  // },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { account } = useUserChainInfo();
  const address = account?.address;

  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FF</span>
              </div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">
                FriendFi
              </span>
            </div>
          )}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close sidebar"
          >
            <IoClose className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={onClose}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        {address && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">U</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    CryptoUser123
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {address}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
