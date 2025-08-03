import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAndConfirmTransaction } from "thirdweb";
import { upload } from "thirdweb/storage";
import { queryKeys } from "@/modules/query/query-keys";
import {
  prepareSendMessage,
  prepareSendMessageWithTip,
} from "./chat-dapp-mutation.contract";
import { useUserChainInfo } from "@/modules/query";
import { client } from "@/utils/configs";

// Message mutations
export function useSendMessageMutation() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      receiver,
      content,
      isEncrypted = false,
      file,
    }: {
      receiver: string;
      content?: string;
      isEncrypted?: boolean;
      file?: File;
    }) => {
      if (!account) {
        throw new Error("No active account found");
      }

      let contentIPFSHash = "";

      if (file) {
        // Upload file to IPFS
        const fileURI = await upload({
          client: client,
          files: [file],
          uploadWithoutDirectory: true,
        });

        if (!fileURI) throw new Error("Failed to upload file to IPFS");

        // Create metadata and upload to IPFS
        const metadata = {
          name: `Message from ${account.address} to ${receiver}`,
          description: "Chat message",
          file: fileURI,
          timestamp: Date.now(),
          isEncrypted,
        };

        const metadataURI = await upload({
          client: client,
          files: [
            {
              name: `message-${Math.random()}.json`,
              data: JSON.stringify(metadata),
            },
          ],
          uploadWithoutDirectory: true,
        });

        if (!metadataURI) throw new Error("Failed to upload metadata to IPFS");
        contentIPFSHash = metadataURI;
      } else if (content) {
        // Upload text content to IPFS
        const metadata = {
          name: `Message from ${account.address} to ${receiver}`,
          description: "Chat message",
          content,
          timestamp: Date.now(),
          isEncrypted,
        };

        console.log({ content });
        console.log({ receiver });
        console.log({ metadata });

        const metadataURI = await upload({
          client: client,
          files: [
            {
              name: `message-${Math.random()}.json`,
              data: JSON.stringify(metadata),
            },
          ],
          uploadWithoutDirectory: true,
        });

        console.log({ metadataURI });

        if (!metadataURI) throw new Error("Failed to upload content to IPFS");
        contentIPFSHash = metadataURI;
      } else {
        throw new Error("Either content or file must be provided");
      }

      console.log({ contentIPFSHash });

      const transaction = prepareSendMessage({
        receiver,
        contentIPFSHash,
        isEncrypted,
      });

      console.log({ transaction });

      const transactionReceipt = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      if (transactionReceipt.status === "reverted") {
        throw new Error("Failed to send message");
      }

      return {
        transactionHash: transactionReceipt.transactionHash,
        contentIPFSHash,
      };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.messageCount(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.activity(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.sentMessages(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.receivedMessages(address!),
      });
    },
    meta: {
      loadingMessage: {
        title: "Sending Message",
        description: "Sending your message...",
      },
      successMessage: {
        title: "Message Sent",
        description: "Your message has been sent successfully!",
      },
      errorMessage: {
        title: "Message Send Failed",
        description: "Failed to send message. Please try again.",
      },
    },
  });
}

export function useSendMessageWithTipMutation() {
  const { account } = useUserChainInfo();
  const address = account?.address;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      receiver,
      content,
      tipAmount,
      isEncrypted = false,
      file,
    }: {
      receiver: string;
      content?: string;
      tipAmount: number;
      isEncrypted?: boolean;
      file?: File;
    }) => {
      if (!account) {
        throw new Error("No active account found");
      }

      let contentIPFSHash = "";

      if (file) {
        // Upload file to IPFS
        const fileURI = await upload({
          client: client,
          files: [file],
          uploadWithoutDirectory: true,
        });

        if (!fileURI) throw new Error("Failed to upload file to IPFS");

        // Create metadata and upload to IPFS
        const metadata = {
          name: `Message from ${account.address} to ${receiver}`,
          description: "Chat message with tip",
          file: fileURI,
          tipAmount,
          timestamp: Date.now(),
          isEncrypted,
        };

        const metadataURI = await upload({
          client: client,
          files: [
            {
              name: `message-tip-${Math.random()}.json`,
              data: JSON.stringify(metadata),
            },
          ],
          uploadWithoutDirectory: true,
        });

        if (!metadataURI) throw new Error("Failed to upload metadata to IPFS");
        contentIPFSHash = metadataURI;
      } else if (content) {
        // Upload text content to IPFS
        const metadata = {
          name: `Message from ${account.address} to ${receiver}`,
          description: "Chat message with tip",
          content,
          tipAmount,
          timestamp: Date.now(),
          isEncrypted,
        };

        const metadataURI = await upload({
          client: client,
          files: [
            {
              name: `message-tip-${Math.random()}.json`,
              data: JSON.stringify(metadata),
            },
          ],
          uploadWithoutDirectory: true,
        });

        if (!metadataURI) throw new Error("Failed to upload content to IPFS");
        contentIPFSHash = metadataURI;
      } else {
        throw new Error("Either content or file must be provided");
      }

      const transaction = prepareSendMessageWithTip({
        receiver,
        contentIPFSHash,
        isEncrypted,
        value: BigInt(tipAmount),
      });

      const transactionReceipt = await sendAndConfirmTransaction({
        account,
        transaction,
      });

      if (transactionReceipt.status === "reverted") {
        throw new Error("Failed to send message with tip");
      }

      return {
        transactionHash: transactionReceipt.transactionHash,
        contentIPFSHash,
      };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.messageCount(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.activity(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.tipStats(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.sentMessages(address!),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.user.receivedMessages(address!),
      });
    },
    meta: {
      loadingMessage: {
        title: "Sending Message with Tip",
        description: "Sending your message and tip...",
      },
      successMessage: {
        title: "Message and Tip Sent",
        description: "Your message and tip have been sent successfully!",
      },
      errorMessage: {
        title: "Message Send Failed",
        description: "Failed to send message with tip. Please try again.",
      },
    },
  });
}
