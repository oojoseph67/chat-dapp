import { useState, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  IoPeopleOutline,
  IoSearchOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoCheckmarkOutline,
  IoCloseOutline,
  IoWalletOutline,
  IoChatbubbleOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { WalletWarning } from "@/modules/app/component/wallet-warning";
import { StakingRequirement } from "@/modules/app/component/staking-requirement";
import {
  useUserChainInfo,
  useActiveUsersQuery,
  useUserSentMessagesQuery,
  useUserReceivedMessagesQuery,
  useUsernameByAddressQuery,
  useStakedAmountByAddressQuery,
  useAllUsersInfoQuery,
} from "@/modules/query";

export default function Friends() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"friends" | "suggestions">(
    "friends"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get all users info in a single query
  const { data: allUsersInfo = [] } = useAllUsersInfoQuery();
  console.log({ allUsersInfo });

  // Get current user's message data
  const { data: userSentMessages = [] } = useUserSentMessagesQuery(
    address || ""
  );
  const { data: userReceivedMessages = [] } = useUserReceivedMessagesQuery(
    address || ""
  );

  // Determine actual friends based on message history
  const actualFriends = useMemo(() => {
    if (!address) return [];

    const friendAddresses = new Set<string>();
    const hasMessageHistory =
      userSentMessages.length > 0 || userReceivedMessages.length > 0;

    if (hasMessageHistory) {
      return allUsersInfo
        .filter((user) => user.address !== address)
        .filter((user) => user.stakedAmount > 0)
        .slice(0, 5);
    }

    return [];
  }, [allUsersInfo, address, userSentMessages, userReceivedMessages]);

  // Filter out current user and sort by staked amount
  const sortedUsers = useMemo(() => {
    return allUsersInfo
      .filter((user) => user.address !== address)
      .sort((a, b) => b.stakedAmount - a.stakedAmount);
  }, [allUsersInfo, address]);

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    return sortedUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedUsers, searchQuery]);

  // Separate friends and suggestions
  const friends = useMemo(() => {
    return actualFriends.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [actualFriends, searchQuery]);

  const suggestions = useMemo(() => {
    // Filter out users who are already friends
    const friendAddresses = new Set(
      actualFriends.map((friend) => friend.address)
    );
    return filteredUsers.filter((user) => !friendAddresses.has(user.address));
  }, [filteredUsers, actualFriends]);

  // Pagination for suggestions
  const totalPages = Math.ceil(suggestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSuggestions = suggestions.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStartMessage = (userAddress: string, username: string) => {
    router.push(
      `/messages?recipient=${userAddress}&username=${encodeURIComponent(
        username
      )}`
    );
  };

  return (
    <StakingRequirement>
      <Head>
        <title>Friends - FriendFi</title>
        <meta
          name="description"
          content="Manage your friends and discover new people on FriendFi."
        />
        <meta name="keywords" content="friends, social, blockchain, web3" />
        <meta name="author" content="FriendFi" />
      </Head>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Friends</h1>
          <p className="text-gray-300">
            Connect with friends and discover new people on FriendFi.
          </p>
        </div>

        {!address && (
          <WalletWarning
            title="Connect Your Wallet"
            message="Please connect your wallet to view your friends and manage connections."
          />
        )}

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                />
                <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("friends")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === "friends"
                      ? "bg-gray-700 text-white shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Friends ({friends.length})
                </button>
                <button
                  onClick={() => setActiveTab("suggestions")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeTab === "suggestions"
                      ? "bg-gray-700 text-white shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Suggestions ({suggestions.length})
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "friends" && (
              <div className="space-y-4">
                {friends.length > 0 ? (
                  friends.map((friend) => (
                    <div
                      key={friend.address}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {friend.username.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {friend.username}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {friend.address.slice(0, 6)}...
                            {friend.address.slice(-4)}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-xs text-blue-400">
                              {friend.stakedAmount > 0
                                ? `${friend.stakedAmount} tokens staked`
                                : "No stake"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleStartMessage(friend.address, friend.username)
                        }
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                      >
                        <IoChatbubbleOutline className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <IoPeopleOutline className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No friends found. Start chatting with other users to see
                      them here.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "suggestions" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedSuggestions.map((user) => (
                    <div
                      key={user.address}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {user.username.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {user.username}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.address.slice(0, 6)}...
                            {user.address.slice(-4)}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <IoInformationCircleOutline className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-blue-600 dark:text-blue-400">
                              {user.stakedAmount > 0
                                ? `${user.stakedAmount} tokens staked`
                                : "No stake"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleStartMessage(user.address, user.username)
                        }
                        className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90 transition-colors duration-200"
                      >
                        <IoAddOutline className="w-4 h-4" />
                        <span>Send a message</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-6">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      <IoChevronBackOutline className="w-5 h-5" />
                    </button>

                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                              currentPage === page
                                ? "bg-primary text-white"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      <IoChevronForwardOutline className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {paginatedSuggestions.length === 0 && (
                  <div className="text-center py-8">
                    <IoPeopleOutline className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No users found matching your search.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </StakingRequirement>
  );
}
