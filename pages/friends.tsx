import { useState } from "react";
import Head from "next/head";
import {
  IoPeopleOutline,
  IoSearchOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoWalletOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";
import { useUserChainInfo } from "@/modules/query";
import { WalletWarning } from "@/modules/app/component/wallet-warning";
import { StakingRequirement } from "@/modules/app/component/staking-requirement";

export default function Friends() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "friends" | "requests" | "suggestions"
  >("friends");

  const [friends] = useState(
    address
      ? [
          {
            id: 1,
            name: "CryptoAlice",
            avatar: "CA",
            status: "online",
            mutualFriends: 5,
          },
          {
            id: 2,
            name: "DeFiBob",
            avatar: "DB",
            status: "offline",
            mutualFriends: 3,
          },
        ]
      : []
  );

  const [friendRequests] = useState(
    address
      ? [
          {
            id: 1,
            name: "Web3Emma",
            avatar: "WE",
            mutualFriends: 4,
          },
        ]
      : []
  );

  const [suggestions] = useState(
    address
      ? [
          {
            id: 1,
            name: "NFTGrace",
            avatar: "NG",
            mutualFriends: 6,
          },
        ]
      : []
  );

  return (
    <StakingRequirement>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
        <title>Friends - FriendFi</title>
        <meta name="description" content="Manage your friends and discover new people on FriendFi." />
        <meta name="keywords" content="friends, social, blockchain, web3" />
        <meta name="author" content="FriendFi" />
      </Head>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Friends
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Connect with friends and discover new people on FriendFi.
        </p>
      </div>

      {!address && (
        <WalletWarning 
          title="Connect Your Wallet"
          message="Please connect your wallet to view your friends and manage connections."
        />
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("friends")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === "friends"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Friends ({friends.length})
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === "requests"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Requests ({friendRequests.length})
              </button>
              <button
                onClick={() => setActiveTab("suggestions")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === "suggestions"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Suggestions ({suggestions.length})
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          {activeTab === "friends" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {friend.avatar}
                        </span>
                      </div>
                      {friend.status === "online" && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {friend.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {friend.mutualFriends} mutual friends
                      </p>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors duration-200">
                    <IoChatbubbleOutline className="w-4 h-4" />
                    <span>Message</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "requests" && (
            <div className="space-y-4">
              {friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {request.avatar}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {request.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {request.mutualFriends} mutual friends
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors duration-200">
                      <IoCheckmarkOutline className="w-4 h-4" />
                      <span>Accept</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600 transition-colors duration-200">
                      <IoCloseOutline className="w-4 h-4" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "suggestions" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {suggestion.avatar}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {suggestion.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {suggestion.mutualFriends} mutual friends
                      </p>
                    </div>
                  </div>

                  <button className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors duration-200">
                    <IoAddOutline className="w-4 h-4" />
                    <span>Add Friend</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </StakingRequirement>
  );
}
