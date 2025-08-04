export function getErrorMessage(error: any): string {
  const errorMessage =
    error?.message || error?.toString() || "An unknown error occurred";

  // Handle common blockchain errors
  if (errorMessage.includes("insufficient funds")) {
    return "Insufficient funds for transaction. Please check your balance.";
  }

  if (errorMessage.includes("user rejected")) {
    return "Transaction was cancelled by user.";
  }

  if (errorMessage.includes("nonce too low")) {
    return "Transaction nonce is too low. Please try again.";
  }

  if (errorMessage.includes("gas required exceeds allowance")) {
    return "Insufficient gas for transaction. Please increase gas limit.";
  }

  if (errorMessage.includes("execution reverted")) {
    return "Transaction failed. Please check your input parameters.";
  }

  if (errorMessage.includes("already processed")) {
    return "This transaction has already been processed.";
  }

  if (errorMessage.includes("position not found")) {
    return "Position not found. It may have been already unstaked.";
  }

  if (errorMessage.includes("no rewards to claim")) {
    return "No rewards available to claim at this time.";
  }

  if (errorMessage.includes("position not active")) {
    return "Position is not active. It may have expired or been unstaked.";
  }

  if (errorMessage.includes("insufficient balance")) {
    return "Insufficient token balance for this operation.";
  }

  if (errorMessage.includes("duration not allowed")) {
    return "Selected duration is not allowed for this staking type.";
  }

  if (errorMessage.includes("minimum stake not met")) {
    return "Minimum stake amount not met. Please increase your stake.";
  }

  if (errorMessage.includes("maximum stake exceeded")) {
    return "Maximum stake amount exceeded. Please reduce your stake.";
  }

  // Handle network errors
  if (errorMessage.includes("network") || errorMessage.includes("connection")) {
    return "Network connection error. Please check your internet connection.";
  }

  if (errorMessage.includes("timeout")) {
    return "Request timed out. Please try again.";
  }

  // Handle wallet errors
  if (errorMessage.includes("wallet") || errorMessage.includes("account")) {
    return "Wallet connection error. Please reconnect your wallet.";
  }

  // Default case - return the original error message
  return errorMessage;
}

export const formatNumber = (num: number | string) => {
  let numberValue = typeof num === "string" ? parseFloat(num) : num;
  if (isNaN(numberValue)) return "0";
  if (numberValue < 0) return "0";
  if (numberValue === 0) return "0";
  if (typeof numberValue !== "number") return "0";
  if (numberValue === Infinity) return "∞";
  if (numberValue === -Infinity) return "-∞";
  if (typeof numberValue !== "number") return "0";

  if (numberValue >= 1e9) return (numberValue / 1e9).toFixed(2) + "B";
  if (numberValue >= 1e6) return (numberValue / 1e6).toFixed(2) + "M";
  if (numberValue >= 1e3) return (numberValue / 1e3).toFixed(2) + "K";
  return numberValue.toLocaleString();
};

export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString();
};

export const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString();
};
// Foul word filter utility
const FOUL_WORDS = [
  // Common profanity and offensive terms
  "fuck",
  "shit",
  "bitch",
  "ass",
  "damn",
  "hell",
  "piss",
  "cock",
  "dick",
  "pussy",
  "cunt",
  "whore",
  "slut",
  "bastard",
  "motherfucker",
  "fucker",
  "fucking",
  "shitty",
  "asshole",
  "dumbass",
  "jackass",
  "dickhead",
  "prick",
  "twat",
  "wanker",
  "cocksucker",
  "faggot",
  "nigger",
  "nigga",
  "fag",
  "dyke",
  "kike",
  "spic",
  "chink",
  "gook",
  "wetback",
  "towelhead",
  "sandnigger",
  // Add more as needed
];

export function containsFoulWords(text: string): boolean {
  const normalizedText = text.toLowerCase().replace(/[^a-zA-Z\s]/g, " ");
  const words = normalizedText.split(/\s+/);

  return words.some((word) => FOUL_WORDS.includes(word));
}

export function filterFoulWords(text: string): string {
  const normalizedText = text.toLowerCase().replace(/[^a-zA-Z\s]/g, " ");
  const words = normalizedText.split(/\s+/);

  const filteredWords = words.map((word) => {
    if (FOUL_WORDS.includes(word)) {
      return "*".repeat(word.length);
    }
    return word;
  });

  return filteredWords.join(" ");
}

export function sanitizeMessage(text: string): {
  isClean: boolean;
  sanitizedText: string;
  originalText: string;
} {
  const hasFoulWords = containsFoulWords(text);

  if (hasFoulWords) {
    return {
      isClean: false,
      sanitizedText: filterFoulWords(text),
      originalText: text,
    };
  }

  return {
    isClean: true,
    sanitizedText: text,
    originalText: text,
  };
}

export function sanitizeUsernameForDisplay(username: string): string {
  const sanitized = sanitizeMessage(username);
  
  if (!sanitized.isClean) {
    return "User";
  }
  
  return username;
}

// Analytics utility functions
export const calculateEngagementRate = (messageCount: number, totalMessages: number): string => {
  return totalMessages > 0 ? ((messageCount / totalMessages) * 100).toFixed(1) : "0";
};

export const calculateTotalTips = (tipStats: { sent: number; received: number }): number => {
  return tipStats.sent + tipStats.received;
};

export const processRecentActivity = (userMessages: any, sanitizeUsernameForDisplay: (username: string) => string) => {
  if (!userMessages) return [];

  return [
    ...userMessages.sentMessages.slice(0, 2).map((msg: any, index: number) => ({
      id: `sent-${index}`,
      type: "message" as const,
      description: `Sent message to ${
        sanitizeUsernameForDisplay(msg.receiverUsername) ||
        msg.receiver.slice(0, 8)
      }...`,
      time: new Date(msg.timestamp * 1000).toLocaleString(),
      value: msg.tipAmount > 0 ? `+${msg.tipAmount} tip` : "+1",
      hasTip: msg.tipAmount > 0,
      tipAmount: msg.tipAmount,
    })),
    ...userMessages.receivedMessages.slice(0, 2).map((msg: any, index: number) => ({
      id: `received-${index}`,
      type: "message" as const,
      description: `Received message from ${
        sanitizeUsernameForDisplay(msg.senderUsername) ||
        msg.sender.slice(0, 8)
      }...`,
      time: new Date(msg.timestamp * 1000).toLocaleString(),
      value: msg.tipAmount > 0 ? `+${msg.tipAmount} tip` : "+1",
      hasTip: msg.tipAmount > 0,
      tipAmount: msg.tipAmount,
    })),
  ].slice(0, 4);
};

export const processTopFriends = (allUsersInfo: any[], address: string, sanitizeUsernameForDisplay: (username: string) => string) => {
  return allUsersInfo
    .filter((user) => user.address !== address)
    .sort((a, b) => (b.stakedAmount || 0) - (a.stakedAmount || 0))
    .slice(0, 4)
    .map((user, index) => ({
      name:
        sanitizeUsernameForDisplay(user.username) ||
        user.address.slice(0, 8) + "...",
      messages: Math.floor(Math.random() * 50) + 10, // Mock message count since not available in contract
      avatar: user.username
        ? sanitizeUsernameForDisplay(user.username).slice(0, 2).toUpperCase()
        : user.address.slice(2, 4).toUpperCase(),
      stakedAmount: user.stakedAmount || 0,
    }));
};

export const generateAnalyticsStats = (
  address: string | undefined,
  messageCount: number,
  activeUsersCount: number,
  stakedAmount: number,
  tipStats: { sent: number; received: number },
  isMessageCountLoading: boolean,
  isActiveUsersLoading: boolean,
  isStakedAmountLoading: boolean,
  isTipStatsLoading: boolean
) => {
  return [
    {
      title: "Total Messages",
      value: address ? messageCount.toString() : "0",
      change: address ? "+12.5%" : "0%", // Mock change since historical data not available
      trend: (address ? "up" : "down") as "up" | "down",
      icon: "IoChatbubbleOutline",
      color: "blue",
      isLoading: isMessageCountLoading,
    },
    {
      title: "Active Friends",
      value: address ? activeUsersCount.toString() : "0",
      change: address ? "+8.2%" : "0%", // Mock change
      trend: (address ? "up" : "down") as "up" | "down",
      icon: "IoPeopleOutline",
      color: "green",
      isLoading: isActiveUsersLoading,
    },
    {
      title: "Tokens Staked",
      value: address ? stakedAmount.toString() : "0",
      change: address ? "+15.3%" : "0%", // Mock change
      trend: (address ? "up" : "down") as "up" | "down",
      icon: "IoWalletOutline",
      color: "purple",
      isLoading: isStakedAmountLoading,
    },
    {
      title: "Tips Received",
      value: address ? tipStats.received.toString() : "0",
      change: address ? "+5.2%" : "0%", // Mock change
      trend: (address ? "up" : "down") as "up" | "down",
      icon: "IoGiftOutline",
      color: "yellow",
      isLoading: isTipStatsLoading,
    },
  ];
};

// Message grouping utility functions
export const groupMessagesByDay = (messages: any[]) => {
  const groups: { [key: string]: any[] } = {};
  
  messages.forEach((message) => {
    const date = new Date(message.timestamp * 1000);
    const dateKey = date.toDateString(); // This gives us a unique key for each day
    
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
  });
  
  return groups;
};

export const formatDateHeader = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Check if it's today
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  
  // Check if it's yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }
  
  // For other dates, show the day and month
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'short', 
    day: 'numeric' 
  });
};

export const sortDateGroups = (groups: { [key: string]: any[] }) => {
  return Object.keys(groups).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
};
