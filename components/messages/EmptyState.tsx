import { IoChatbubbleOutline } from "react-icons/io5";

export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <IoChatbubbleOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">
          Select a friend to start chatting
        </p>
      </div>
    </div>
  );
} 