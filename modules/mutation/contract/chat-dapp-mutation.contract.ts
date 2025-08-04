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

export function prepareUnstake({ amount }: { amount: number }) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function unstake(uint256 amount)",
    params: [toWei(amount.toString())],
  });
}

// Username functions
export function prepareRegisterUser({ username }: { username: string }) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function registerUser(string calldata username)",
    params: [username],
  });
}

// Message functions
export function prepareSendMessage({
  receiver,
  ipfsHash,
  encrypted,
}: {
  receiver: string;
  ipfsHash: string;
  encrypted: boolean;
}) {
  return prepareContractCall({
    contract: chatContractInterface,
    method:
      "function sendMessage(address receiver, string calldata ipfsHash, bool encrypted)",
    params: [receiver, ipfsHash, encrypted],
  });
}

export function prepareSendMessageWithTip({
  receiver,
  ipfsHash,
  encrypted,
  value,
}: {
  receiver: string;
  ipfsHash: string;
  encrypted: boolean;
  value: bigint;
}) {
  return prepareContractCall({
    contract: chatContractInterface,
    method:
      "function sendMessageWithTip(address receiver, string calldata ipfsHash, bool encrypted) payable",
    params: [receiver, ipfsHash, encrypted],
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
export function prepareUpdateMinStake({
  newMinStake,
}: {
  newMinStake: number;
}) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function updateMinStake(uint256 newMinStake)",
    params: [BigInt(newMinStake)],
  });
}

export function prepareSetRewardParameters({
  newRate,
  newInterval,
}: {
  newRate: number;
  newInterval: number;
}) {
  return prepareContractCall({
    contract: chatContractInterface,
    method:
      "function setRewardParameters(uint256 newRate, uint256 newInterval)",
    params: [BigInt(newRate), BigInt(newInterval)],
  });
}

export function prepareEmergencyWithdraw({ token }: { token: string }) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function emergencyWithdraw(address token)",
    params: [token],
  });
}

export function prepareUpdateUsername({
  newUsername,
}: {
  newUsername: string;
}) {
  return prepareContractCall({
    contract: chatContractInterface,
    method: "function updateUsername(string calldata newUsername)",
    params: [newUsername],
  });
}
