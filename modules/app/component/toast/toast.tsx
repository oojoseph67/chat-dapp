import React, { ReactNode } from "react";
import { cn } from "../../utils";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoWarningOutline,
  IoInformationCircleOutline,
  IoCloseOutline,
} from "react-icons/io5";

type CustomToastProps = {
  title: string;
  description: ReactNode;
  actions?: React.ReactNode;
  close: () => void;
  status: "success" | "error" | "warning" | "info" | "loading";
  isSucess?: boolean;
  isError?: boolean;
};

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300" />
);

const statusConfig = {
  success: {
    icon: IoCheckmarkCircleOutline,
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
    titleColor: "text-green-800 dark:text-green-200",
  },
  error: {
    icon: IoCloseCircleOutline,
    bgColor: "bg-red-50 dark:bg-red-900/20",
    borderColor: "border-red-200 dark:border-red-800",
    iconColor: "text-red-600 dark:text-red-400",
    titleColor: "text-red-800 dark:text-red-200",
  },
  warning: {
    icon: IoWarningOutline,
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    titleColor: "text-yellow-800 dark:text-yellow-200",
  },
  info: {
    icon: IoInformationCircleOutline,
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
    titleColor: "text-blue-800 dark:text-blue-200",
  },
  loading: {
    icon: LoadingSpinner,
    bgColor: "bg-gray-50 dark:bg-gray-900/20",
    borderColor: "border-gray-200 dark:border-gray-800",
    iconColor: "text-gray-600 dark:text-gray-400",
    titleColor: "text-gray-800 dark:text-gray-200",
  },
};

export const CustomToast = ({
  title,
  description,
  actions,
  status,
  close,
}: CustomToastProps) => {
  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        "relative shadow-lg rounded-xl flex p-4 border max-w-[400px] min-w-[320px] backdrop-blur-sm",
        config.bgColor,
        config.borderColor
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mr-3">
        <IconComponent className={cn("w-5 h-5", config.iconColor)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3
              className={cn(
                "text-sm font-semibold mb-1 leading-tight",
                config.titleColor
              )}
            >
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            )}
            {actions && <div className="mt-3">{actions}</div>}
          </div>

          {/* Close Button */}
          <button
            onClick={close}
            className="flex-shrink-0 ml-3 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close notification"
          >
            <IoCloseOutline className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
