import { useState } from "react";
import {
  IoSendOutline,
  IoAttachOutline,
  IoCloseOutline,
} from "react-icons/io5";
import {
  useSendMessageMutation,
  useSendMessageWithTipMutation,
} from "@/modules/mutation";
import { download } from "thirdweb/storage";
import { client } from "@/utils/configs";

interface MessageInputProps {
  selectedFriend: string | null;
}

export function MessageInput({ selectedFriend }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTipMode, setIsTipMode] = useState<boolean>(false);
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false);

  // Message mutations
  const { mutate: sendMessage, isPending: isSendingMessage } =
    useSendMessageMutation();
  const { mutate: sendMessageWithTip, isPending: isSendingWithTip } =
    useSendMessageWithTipMutation();

  const handleSendMessage = () => {
    if (!selectedFriend || (!message.trim() && !selectedFile)) return;

    const messageData = {
      receiver: selectedFriend,
      content: message.trim() || undefined,
      isEncrypted,
      file: selectedFile || undefined,
    };

    if (isTipMode && tipAmount > 0) {
      sendMessageWithTip(
        {
          ...messageData,
          tipAmount,
        },
        {
          onSuccess() {
            // Reset form
            setMessage("");
            setTipAmount(0);
            setSelectedFile(null);
            setIsTipMode(false);
            setIsEncrypted(false);
          },
          onError() {
            // Reset form
            setMessage("");
            setTipAmount(0);
            setSelectedFile(null);
            setIsTipMode(false);
            setIsEncrypted(false);
          },
        }
      );
    } else {
      sendMessage(messageData);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleDownloadFile = async () => {
    const file = await download({
      client,
      uri: "ipfs://QmZFB4EbrfMA7QugWwFbezpux1Vs66zfnq1qQ4t6tTxTFw",
    });

    console.log({ file });
  };

  console.log({ message });

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      {/* File Upload Preview */}
      {selectedFile && (
        <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <IoAttachOutline className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <button
              onClick={handleRemoveFile}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
              aria-label="Remove file"
              title="Remove file"
            >
              <IoCloseOutline className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tip Mode Toggle */}
      <div className="mb-3 flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isTipMode}
            onChange={(e) => setIsTipMode(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Send as tip
          </span>
        </label>

        {/* <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isEncrypted}
            onChange={(e) => setIsEncrypted(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Encrypt message
          </span>
        </label> */}
      </div>

      {/* Tip Amount Input */}
      {isTipMode && (
        <div className="mb-3">
          <input
            type="number"
            placeholder="Tip amount (tokens)"
            value={tipAmount}
            onChange={(e) => setTipAmount(Number(e.target.value))}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          />
        </div>
      )}

      <div className="flex items-center space-x-2">
        <label
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 cursor-pointer"
          title="Attach file"
        >
          <IoAttachOutline className="w-5 h-5" />
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
            aria-label="Attach file"
          />
        </label>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={
              selectedFile ? "Add a message (optional)..." : "Type a message..."
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={handleDownloadFile}
          //   disabled={
          //     (!message.trim() && !selectedFile) ||
          //     isSendingMessage ||
          //     isSendingWithTip
          //   }
          className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Send message"
        >
          {isSendingMessage || isSendingWithTip ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <IoSendOutline className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
