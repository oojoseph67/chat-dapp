import { useState } from "react";
import {
  IoChatbubbleOutline,
  IoSearchOutline,
  IoAddOutline,
  IoSendOutline,
  IoAttachOutline,
  IoHeartOutline,
  IoTimeOutline,
  IoEllipsisVerticalOutline,
  IoWalletOutline,
} from "react-icons/io5";
import { useUserChainInfo } from "@/modules/query";
import { WalletWarning } from "@/modules/app/component/wallet-warning";

export default function Messages() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  
  const [selectedFriend, setSelectedFriend] = useState(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [friends] = useState(address ? [
    {
      id: 1,
      name: "CryptoAlice",
      avatar: "CA",
      lastMessage: "Hey! How's it going?",
      time: "2 min ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "DeFiBob",
      avatar: "DB",
      lastMessage: "Thanks for the help!",
      time: "1 hour ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Web3Carol",
      avatar: "WC",
      lastMessage: "Let's catch up soon",
      time: "3 hours ago",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "NFTDavid",
      avatar: "ND",
      lastMessage: "Great idea!",
      time: "1 day ago",
      unread: 0,
      online: false,
    },
  ] : []);

  const [messages] = useState([
    {
      id: 1,
      sender: "CryptoAlice",
      content: "Hey! How's it going?",
      time: "2:30 PM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Hi CryptoAlice! I'm doing great, thanks for asking. How about you?",
      time: "2:32 PM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "CryptoAlice",
      content:
        "Pretty good! Just working on some new DeFi projects. Have you tried the new staking feature?",
      time: "2:33 PM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content:
        "Yes! I've been staking for about a week now. The APY is really good!",
      time: "2:35 PM",
      isOwn: true,
    },
  ]);

  const selectedFriendData = friends.find((f) => f.id === selectedFriend);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleTip = () => {
    console.log("Sending tip to:", selectedFriendData?.name);
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-200px)]">
      {!address && (
        <WalletWarning 
          title="Connect Your Wallet"
          message="Please connect your wallet to access messaging features and chat with friends."
        />
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-full flex">
        {/* Friends List */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Messages
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredFriends.map((friend) => (
              <div
                key={friend.id}
                onClick={() => setSelectedFriend(friend.id)}
                className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                  selectedFriend === friend.id
                    ? "bg-primary/10 border-r-2 border-primary"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {friend.avatar}
                      </span>
                    </div>
                    {friend.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {friend.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <IoTimeOutline className="w-3 h-3 mr-1" />
                        {friend.time}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {friend.lastMessage}
                    </p>
                  </div>
                  {friend.unread > 0 && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {friend.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedFriendData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {selectedFriendData.avatar}
                      </span>
                    </div>
                    {selectedFriendData.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedFriendData.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedFriendData.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleTip}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Send tip"
                  >
                    <IoHeartOutline className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    aria-label="More options"
                  >
                    <IoEllipsisVerticalOutline className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.isOwn
                          ? "bg-primary text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.isOwn
                            ? "text-white/70"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    aria-label="Attach file"
                  >
                    <IoAttachOutline className="w-5 h-5" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    aria-label="Send message"
                  >
                    <IoSendOutline className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <IoChatbubbleOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select a friend to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
