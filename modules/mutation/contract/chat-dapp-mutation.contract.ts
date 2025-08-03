import {
  prepareContractCall,
  sendAndConfirmTransaction,
  toWei,
} from "thirdweb";
import { getContractCustom } from "@/modules/blockchain";
import { chatContract } from "@/utils/configs";
import ChatContractABI from "@/modules/blockchain/abi/chat-dapp.json";

const chatContractInterface = getContractCustom({
  contractAddress: chatContract,
  abi: ChatContractABI,
});

// Staking functions
export function prepareStake({ amount }: { amount: number }) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function stake() payable",
    params: [],
    value: toWei(amount.toString()),
  });
}

export function prepareUnstake() {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function unstake()",
    params: [],
  });
}

// Username functions
export function prepareSetUsername({ username }: { username: string }) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function setUsername(string username)",
    params: [username],
  });
}

// Message functions
export function prepareSendMessage({
  receiver,
  contentIPFSHash,
  isEncrypted,
}: {
  receiver: string;
  contentIPFSHash: string;
  isEncrypted: boolean;
}) {
  return prepareContractCall({
    contract: chatContractInterface,
    method:
      "function sendMessage(address receiver, string contentIPFSHash, bool isEncrypted)",
    params: [receiver, contentIPFSHash, isEncrypted],
  });
}

export function prepareSendMessageWithTip({
  receiver,
  contentIPFSHash,
  isEncrypted,
  value,
}: {
  receiver: string;
  contentIPFSHash: string;
  isEncrypted: boolean;
  value: bigint;
}) {
  return prepareContractCall({
    contract: chatContractInterface,
    method:
      "function sendMessageWithTip(address receiver, string contentIPFSHash, bool isEncrypted) payable",
    params: [receiver, contentIPFSHash, isEncrypted],
    value,
  });
}

// Reward functions
export function prepareClaimRewards() {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function claimRewards()",
    params: [],
  });
}

// Admin functions
export function prepareSetMinStakeAmount({ newAmount }: { newAmount: number }) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function setMinStakeAmount(uint256 newAmount)",
    params: [BigInt(newAmount)],
  });
}

export function prepareSetRewardRate({ newRate }: { newRate: number }) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function setRewardRate(uint256 newRate)",
    params: [BigInt(newRate)],
  });
}

export function prepareSetRewardInterval({
  newInterval,
}: {
  newInterval: number;
}) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function setRewardInterval(uint256 newInterval)",
    params: [BigInt(newInterval)],
  });
}

export function prepareWithdrawTokens({
  tokenAddress,
  amount,
}: {
  tokenAddress: string;
  amount: number;
}) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function withdrawTokens(address tokenAddress, uint256 amount)",
    params: [tokenAddress, BigInt(amount)],
  });
}
