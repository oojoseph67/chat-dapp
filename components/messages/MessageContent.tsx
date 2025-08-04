import { MessageMetadata } from "@/modules/mutation";
import { useState, useEffect } from "react";
import { IoDocumentOutline, IoImageOutline } from "react-icons/io5";
// import { parseMessageContent, MessageMetadata } from "@/utils/global";

interface MessageContentProps {
  message: {
    content: string;
    messageType: string;
    ipfsContent?: MessageMetadata;
    isEncrypted: boolean;
  };
}

export function MessageContent({ message }: MessageContentProps) {
  const { content, messageType, ipfsContent, isEncrypted } = message;
  
  if (messageType === "loading") {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (messageType === "unknown" || !content) {
    return (
      <div className="text-red-500 text-sm">
        Failed to load content
      </div>
    );
  }

  if (messageType === "file") {
    return (
      <div className="flex items-center space-x-2">
        <IoDocumentOutline className="w-4 h-4 text-gray-500" />
        <span className="text-sm">
          File: {content}
        </span>
      </div>
    );
  }

  return (
    <div className="text-sm">
      {content}
    </div>
  );
} 