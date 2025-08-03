import { IoWalletOutline } from "react-icons/io5";

interface WalletWarningProps {
  title?: string;
  message?: string;
  className?: string;
}

export function WalletWarning({ 
  title = "Connect Your Wallet",
  message = "Please connect your wallet to access this feature.",
  className = ""
}: WalletWarningProps) {
  return (
    <div className={`bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-8 ${className}`}>
      <div className="flex items-center space-x-3">
        <IoWalletOutline className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        <div>
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
            {title}
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
} 