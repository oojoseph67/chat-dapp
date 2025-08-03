import { useState } from "react";

export function NotificationSettings() {
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Notification Settings
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Push Notifications
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive notifications for new messages and activities
            </p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            aria-label={`${notifications ? 'Disable' : 'Enable'} push notifications`}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              notifications
                ? "bg-primary"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                notifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Email Notifications
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Receive email updates about your account
            </p>
          </div>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            aria-label={`${emailNotifications ? 'Disable' : 'Enable'} email notifications`}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              emailNotifications
                ? "bg-primary"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                emailNotifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
} 