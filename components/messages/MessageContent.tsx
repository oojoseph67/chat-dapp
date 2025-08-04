import { useState, useEffect } from "react";
import { IoDocumentOutline, IoImageOutline } from "react-icons/io5";
import { parseMessageContent, MessageMetadata } from "@/utils/global";

interface MessageContentProps {
  ipfsHash: string;
  isEncrypted: boolean;
}

export function MessageContent({ ipfsHash, isEncrypted }: MessageContentProps) {
  const [content, setContent] = useState<MessageMetadata | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ipfsHash) return;

    setLoading(true);
    setError(null);

    parseMessageContent(ipfsHash)
      .then((result) => {
        setContent(result);
        if (!result) {
          setError('Failed to load content');
        }
      })
      .catch((err) => {
        console.error('Error loading IPFS content:', err);
        setError('Failed to load content');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ipfsHash]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="text-red-500 text-sm">
        {error || 'Failed to load content'}
      </div>
    );
  }

  if (content.type === 'file') {
    return (
      <div className="flex items-center space-x-2">
        {content.mimeType?.startsWith('image/') ? (
          <IoImageOutline className="w-4 h-4 text-blue-500" />
        ) : (
          <IoDocumentOutline className="w-4 h-4 text-gray-500" />
        )}
        <span className="text-sm">
          {content.fileName || 'File'} 
          {content.fileSize && ` (${(content.fileSize / 1024).toFixed(1)} KB)`}
        </span>
      </div>
    );
  }

  return (
    <div className="text-sm">
      {content.content || 'No content'}
    </div>
  );
} 