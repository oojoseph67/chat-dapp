import { getContractCustom, getContractEthers } from "@/modules/blockchain";
import { chatContract } from "@/utils/configs";
import ChatContractABI from "@/modules/blockchain/abi/chat-dapp.json";
import { readContract, toEther, toTokens } from "thirdweb";

const chatContractInterface = getContractCustom({
  contractAddress: chatContract,
  abi: ChatContractABI,
});

// Contract state read functions
export async function getOwner(): Promise<string> {
  const owner = await readContract({
    contract: chatContractInterface,
    method: "function owner() view returns (address)",
    params: [],
  });
  return owner;
}

export async function getMinStakeAmount(): Promise<number> {
  const minStakeAmount = await readContract({
    contract: chatContractInterface,
    method: "function minStakeAmount() view returns (uint256)",
    params: [],
  });
  return Number(toEther(minStakeAmount));
}

export async function getRewardRate(): Promise<number> {
  const rewardRate = await readContract({
    contract: chatContractInterface,
    method: "function rewardRate() view returns (uint256)",
    params: [],
  });
  return Number(rewardRate);
}

export async function getRewardInterval(): Promise<number> {
  const rewardInterval = await readContract({
    contract: chatContractInterface,
    method: "function rewardInterval() view returns (uint256)",
    params: [],
  });
  return Number(rewardInterval);
}

export async function getRewardToken(): Promise<string> {
  const rewardToken = await readContract({
    contract: chatContractInterface,
    method: "function rewardToken() view returns (address)",
    params: [],
  });
  return rewardToken;
}

// User-specific read functions
export async function getStakedAmount({
  address,
}: {
  address: string;
}): Promise<number> {
  const stakedAmount = await readContract({
    contract: chatContractInterface,
    method: "function stakedAmounts(address) view returns (uint256)",
    params: [address],
  });
  return Number(toEther(stakedAmount));
}

export async function hasUserUsername({
  address,
}: {
  address: string;
}): Promise<boolean> {
  const hasUsername = await readContract({
    contract: chatContractInterface,
    method: "function hasUsername(address) view returns (bool)",
    params: [address],
  });
  return hasUsername;
}

export async function getUserUsername({
  address,
}: {
  address: string;
}): Promise<string> {
  const username = await readContract({
    contract: chatContractInterface,
    method: "function getUserUsername(address) view returns (string)",
    params: [address],
  });
  return username;
}

export async function getUserMessageCount({
  address,
}: {
  address: string;
}): Promise<number> {
  const messageCount = await readContract({
    contract: chatContractInterface,
    method: "function getUserMessageCount(address) view returns (uint256)",
    params: [address],
  });
  return Number(messageCount);
}

export async function getUserTipStats({
  address,
}: {
  address: string;
}): Promise<{ sent: number; received: number }> {
  const tipStats = await readContract({
    contract: chatContractInterface,
    method:
      "function getUserTipStats(address) view returns (uint256 sent, uint256 received)",
    params: [address],
  });
  return {
    sent: Number(tipStats[0]),
    received: Number(tipStats[1]),
  };
}

export async function getUserStake({
  address,
}: {
  address: string;
}): Promise<number> {
  const stake = await readContract({
    contract: chatContractInterface,
    method: "function getUserStake(address) view returns (uint256)",
    params: [address],
  });
  return Number(toEther(stake));
}

export async function getLastActive({
  address,
}: {
  address: string;
}): Promise<number> {
  const lastActive = await readContract({
    contract: chatContractInterface,
    method: "function getLastActive(address) view returns (uint256)",
    params: [address],
  });
  return Number(lastActive);
}

export async function getUserActivity({
  address,
}: {
  address: string;
}): Promise<{
  messageCount: number;
  tipSent: number;
  tipReceived: number;
  lastActive: number;
  stakeAmount: number;
}> {
  const activity = await readContract({
    contract: chatContractInterface,
    method:
      "function getUserActivity(address) view returns (uint256 messageCount, uint256 tipSent, uint256 tipReceived, uint256 lastActive, uint256 stakeAmount)",
    params: [address],
  });
  return {
    messageCount: Number(activity[0]),
    tipSent: Number(activity[1]),
    tipReceived: Number(activity[2]),
    lastActive: Number(activity[3]),
    stakeAmount: Number(activity[4]),
  };
}

export async function getUserSentMessages({
  address,
}: {
  address: string;
}): Promise<number[]> {
  const sentMessages = await readContract({
    contract: chatContractInterface,
    method: "function getUserSentMessages(address) view returns (uint256[])",
    params: [address],
  });
  return sentMessages.map((id: bigint) => Number(id));
}

export async function getUserReceivedMessages({
  address,
}: {
  address: string;
}): Promise<number[]> {
  const receivedMessages = await readContract({
    contract: chatContractInterface,
    method:
      "function getUserReceivedMessages(address) view returns (uint256[])",
    params: [address],
  });
  return receivedMessages.map((id: bigint) => Number(id));
}

// Message read functions
export async function getMessage({ messageId }: { messageId: number }): Promise<{
  sender: string;
  receiver: string;
  contentIPFSHash: string;
  timestamp: number;
  tipAmount: number;
  isEncrypted: boolean;
  senderUsername: string;
  receiverUsername: string;
}> {
  const ethersContract = getContractEthers({
    contractAddress: chatContract,
    abi: ChatContractABI,
  });

  const getMessage = await ethersContract.getMessage(messageId);
  console.log({ getMessage });

  // Extract the message data from the tuple
  const messageData = getMessage[0];
  const senderUsername = getMessage[1];
  const receiverUsername = getMessage[2];

  return {
    sender: messageData[0],
    receiver: messageData[1],
    contentIPFSHash: messageData[2],
    timestamp: Number(messageData[3]),
    tipAmount: Number(messageData[4]),
    isEncrypted: messageData[5],
    senderUsername,
    receiverUsername,
  };
}

export async function getMessageByIndex({
  messageId,
}: {
  messageId: number;
}): Promise<{
  sender: string;
  receiver: string;
  contentIPFSHash: string;
  timestamp: number;
  tipAmount: number;
  isEncrypted: boolean;
}> {
  const message = await readContract({
    contract: chatContractInterface,
    method:
      "function messages(uint256) view returns (address sender, address receiver, string contentIPFSHash, uint256 timestamp, uint256 tipAmount, bool isEncrypted)",
    params: [BigInt(messageId)],
  });
  return {
    sender: message[0],
    receiver: message[1],
    contentIPFSHash: message[2],
    timestamp: Number(message[3]),
    tipAmount: Number(message[4]),
    isEncrypted: message[5],
  };
}

// Reward calculation
export async function calculateRewards({
  address,
}: {
  address: string;
}): Promise<number> {
  const rewards = await readContract({
    contract: chatContractInterface,
    method: "function calculateRewards(address) view returns (uint256)",
    params: [address],
  });
  return Number(rewards);
}

// Array access functions
export async function getUserSentMessageAtIndex({
  address,
  index,
}: {
  address: string;
  index: number;
}): Promise<number> {
  const messageId = await readContract({
    contract: chatContractInterface,
    method:
      "function userSentMessages(address, uint256) view returns (uint256)",
    params: [address, BigInt(index)],
  });
  return Number(messageId);
}

export async function getUserReceivedMessageAtIndex({
  address,
  index,
}: {
  address: string;
  index: number;
}): Promise<number> {
  const messageId = await readContract({
    contract: chatContractInterface,
    method:
      "function userReceivedMessages(address, uint256) view returns (uint256)",
    params: [address, BigInt(index)],
  });
  return Number(messageId);
}

export async function getUserActivityByAddress({
  address,
}: {
  address: string;
}): Promise<{
  messageCount: number;
  tipSent: number;
  tipReceived: number;
  lastActive: number;
  stakeAmount: number;
}> {
  const activity = await readContract({
    contract: chatContractInterface,
    method:
      "function userActivities(address) view returns (uint256 messageCount, uint256 tipSent, uint256 tipReceived, uint256 lastActive, uint256 stakeAmount)",
    params: [address],
  });
  return {
    messageCount: Number(activity[0]),
    tipSent: Number(activity[1]),
    tipReceived: Number(activity[2]),
    lastActive: Number(activity[3]),
    stakeAmount: Number(activity[4]),
  };
}

export async function getUsernameByAddress({
  address,
}: {
  address: string;
}): Promise<string> {
  const username = await readContract({
    contract: chatContractInterface,
    method: "function usernames(address) view returns (string)",
    params: [address],
  });
  return username;
}

// Get all user information in a single call
export async function getAllUsersInfo(): Promise<
  Array<{
    address: string;
    username: string;
    stakedAmount: number;
  }>
> {
  try {
    const activeUsers = await getActiveUsers();

    if (!activeUsers || activeUsers.length === 0) {
      return [];
    }

    // Get all usernames and staked amounts in parallel with fail-safes
    const userInfoPromises = activeUsers.map(async (address) => {
      try {
        const [usernameResult, stakedAmountResult] = await Promise.allSettled([
          getUsernameByAddress({ address }),
          getStakedAmountByAddress({ address }),
        ]);

        const username =
          usernameResult.status === "fulfilled" && usernameResult.value
            ? usernameResult.value
            : address.slice(0, 6) + "...";
        const stakedAmount =
          stakedAmountResult.status === "fulfilled"
            ? stakedAmountResult.value
            : 0;

        return {
          address,
          username,
          stakedAmount,
        };
      } catch (error) {
        return {
          address,
          username: address.slice(0, 6) + "...",
          stakedAmount: 0,
        };
      }
    });

    const results = await Promise.allSettled(userInfoPromises);

    // Filter out failed results and return successful ones
    const successfulResults = results
      .filter(
        (
          result
        ): result is PromiseFulfilledResult<{
          address: string;
          username: string;
          stakedAmount: number;
        }> => result.status === "fulfilled"
      )
      .map((result) => result.value);

    return successfulResults;
  } catch (error) {
    return [];
  }
}

// New functions based on the contract ABI
export async function getActiveUsers(): Promise<string[]> {
  const activeUsers = await readContract({
    contract: chatContractInterface,
    method: "function getActiveUsers() view returns (address[])",
    params: [],
  });
  return Array.from(activeUsers);
}

export async function isActiveUser({
  address,
}: {
  address: string;
}): Promise<boolean> {
  const isActive = await readContract({
    contract: chatContractInterface,
    method: "function isActiveUser(address) view returns (bool)",
    params: [address],
  });
  return isActive;
}

export async function getActiveUsersCount(): Promise<number> {
  const activeUsers = await readContract({
    contract: chatContractInterface,
    method: "function getActiveUsers() view returns (address[])",
    params: [],
  });
  return activeUsers.length;
}

export async function getTotalMessages(): Promise<number> {
  const messages = await readContract({
    contract: chatContractInterface,
    method: "function messages() view returns (uint256)",
    params: [],
  });
  return Number(messages);
}

export async function getStakedAmountByAddress({
  address,
}: {
  address: string;
}): Promise<number> {
  const stakedAmount = await readContract({
    contract: chatContractInterface,
    method: "function stakedAmounts(address) view returns (uint256)",
    params: [address],
  });
  return Number(toEther(stakedAmount));
}

export async function getUserActivities({
  address,
}: {
  address: string;
}): Promise<{
  messageCount: number;
  tipSent: number;
  tipReceived: number;
  lastActive: number;
  stakeAmount: number;
}> {
  const activities = await readContract({
    contract: chatContractInterface,
    method:
      "function userActivities(address) view returns (uint256 messageCount, uint256 tipSent, uint256 tipReceived, uint256 lastActive, uint256 stakeAmount)",
    params: [address],
  });
  return {
    messageCount: Number(activities[0]),
    tipSent: Number(activities[1]),
    tipReceived: Number(activities[2]),
    lastActive: Number(activities[3]),
    stakeAmount: Number(activities[4]),
  };
}

export async function getUserTips({
  address,
}: {
  address: string;
}): Promise<{ sent: number; received: number }> {
  const tips = await readContract({
    contract: chatContractInterface,
    method:
      "function getUserTipStats(address) view returns (uint256 sent, uint256 received)",
    params: [address],
  });
  return {
    sent: Number(tips[0]),
    received: Number(tips[1]),
  };
}

// Missing functions from the contract ABI
export async function getUserStats({ address }: { address: string }): Promise<{
  messageCount: number;
  tipSent: number;
  tipReceived: number;
  lastActive: number;
  stakeAmount: number;
  isUserActive: boolean;
}> {
  const stats = await readContract({
    contract: chatContractInterface,
    method:
      "function getUserStats(address) view returns (uint256 messageCount, uint256 tipSent, uint256 tipReceived, uint256 lastActive, uint256 stakeAmount, bool isUserActive)",
    params: [address],
  });
  return {
    messageCount: Number(stats[0]),
    tipSent: Number(stats[1]),
    tipReceived: Number(stats[2]),
    lastActive: Number(stats[3]),
    stakeAmount: Number(stats[4]),
    isUserActive: stats[5],
  };
}

export async function getMessageDetails({ id }: { id: number }): Promise<{
  sender: string;
  receiver: string;
  content: string;
  timestamp: number;
  tipAmount: number;
  encrypted: boolean;
}> {
  const messageDetails = await readContract({
    contract: chatContractInterface,
    method:
      "function getMessageDetails(uint256) view returns (address sender, address receiver, string content, uint256 timestamp, uint256 tipAmount, bool encrypted)",
    params: [BigInt(id)],
  });
  return {
    sender: messageDetails[0],
    receiver: messageDetails[1],
    content: messageDetails[2],
    timestamp: Number(messageDetails[3]),
    tipAmount: Number(messageDetails[4]),
    encrypted: messageDetails[5],
  };
}

export async function getUserMessages({
  address,
}: {
  address: string;
}): Promise<{ sent: number[]; received: number[] }> {
  const messages = await readContract({
    contract: chatContractInterface,
    method:
      "function getUserMessages(address) view returns (uint256[] sent, uint256[] received)",
    params: [address],
  });
  return {
    sent: messages[0].map((id: bigint) => Number(id)),
    received: messages[1].map((id: bigint) => Number(id)),
  };
}

export async function getLastRewardClaim({
  address,
}: {
  address: string;
}): Promise<number> {
  const lastRewardClaim = await readContract({
    contract: chatContractInterface,
    method: "function lastRewardClaim(address) view returns (uint256)",
    params: [address],
  });
  return Number(lastRewardClaim);
}

export async function getUserProfile({
  address,
}: {
  address: string;
}): Promise<{
  username: string;
  joinDate: number;
  isActive: boolean;
}> {
  const profile = await readContract({
    contract: chatContractInterface,
    method:
      "function userProfiles(address) view returns (string username, uint256 joinDate, bool isActive)",
    params: [address],
  });
  return {
    username: profile[0],
    joinDate: Number(profile[1]),
    isActive: profile[2],
  };
}

export async function getReceivedMessageAtIndex({
  address,
  index,
}: {
  address: string;
  index: number;
}): Promise<number> {
  const messageId = await readContract({
    contract: chatContractInterface,
    method:
      "function receivedMessages(address, uint256) view returns (uint256)",
    params: [address, BigInt(index)],
  });
  return Number(messageId);
}

export async function getSentMessageAtIndex({
  address,
  index,
}: {
  address: string;
  index: number;
}): Promise<number> {
  const messageId = await readContract({
    contract: chatContractInterface,
    method: "function sentMessages(address, uint256) view returns (uint256)",
    params: [address, BigInt(index)],
  });
  return Number(messageId);
}

export async function getActiveUserAtIndex({
  index,
}: {
  index: number;
}): Promise<string> {
  const user = await readContract({
    contract: chatContractInterface,
    method: "function activeUsers(uint256) view returns (address)",
    params: [BigInt(index)],
  });
  return user;
}

export async function getAllUserAtIndex({
  index,
}: {
  index: number;
}): Promise<string> {
  const user = await readContract({
    contract: chatContractInterface,
    method: "function allUsers(uint256) view returns (address)",
    params: [BigInt(index)],
  });
  return user;
}
