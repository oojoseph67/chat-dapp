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
