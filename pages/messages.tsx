import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useUserChainInfo } from "@/modules/query";
import { WalletWarning } from "@/modules/app/component/wallet-warning";
import { StakingRequirement } from "@/modules/app/component/staking-requirement";
import {
  FriendsList,
  ChatHeader,
  MessageList,
  MessageInput,
  EmptyState,
} from "@/components/messages";

export default function Messages() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const router = useRouter();
  const { recipient } = router.query;

  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Set initial selected friend from URL or first friend
  useEffect(() => {
    if (recipient && typeof recipient === "string") {
      setSelectedFriend(recipient);
    }
  }, [recipient]);

  return (
    <StakingRequirement>
      <div className="max-w-7xl mx-auto h-[calc(100vh-200px)]">
        <Head>
          <title>Messages - FriendFi</title>
          <meta
            name="description"
            content="Send and receive encrypted messages with your friends on FriendFi."
          />
          <meta
            name="keywords"
            content="messages, chat, encrypted, friends, communication, FriendFi"
          />
          <meta name="author" content="FriendFi" />
        </Head>
        {!address && (
          <WalletWarning
            title="Connect Your Wallet"
            message="Please connect your wallet to access messaging features and chat with friends."
          />
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-full flex">
          <FriendsList
            selectedFriend={selectedFriend}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFriendSelect={setSelectedFriend}
          />

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedFriend ? (
              <>
                <ChatHeader selectedFriend={selectedFriend} />
                <MessageList selectedFriend={selectedFriend} />
                <MessageInput selectedFriend={selectedFriend} />
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </StakingRequirement>
  );
}
