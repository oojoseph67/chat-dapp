import { getContractCustom } from "@/modules/blockchain";
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
  return Number(minStakeAmount);
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
  return Number(stakedAmount);
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
  return Number(stake);
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
export async function getMessage({
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
      "function getMessage(uint256) view returns (address, address, string, uint256, uint256, bool)",
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
