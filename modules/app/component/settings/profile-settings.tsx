import { useRegisterUserMutation } from "@/modules/mutation";
import { useUserChainInfo, useUserUsernameQuery } from "@/modules/query";
import { useState, useEffect } from "react";

export function ProfileSettings() {
  const { account } = useUserChainInfo();
  const address = account?.address;

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { data: userUsername } = useUserUsernameQuery(address!);

  console.log({ userUsername });

  const { mutate: registerUserMutation } = useRegisterUserMutation();

  // Load bio from localStorage on component mount
  useEffect(() => {
    const savedBio = localStorage.getItem("userBio");
    if (savedBio) {
      setBio(savedBio);
    }
  }, []);

  const handleSaveUsername = () => {
    registerUserMutation({ username });
  };

  const handleSave = () => {
    const localStorageBio = localStorage.getItem("userBio");

    if (localStorageBio !== bio) {
      handleSaveBio();
    }

    if (userUsername !== username) {
      handleSaveUsername();
    }
  };

  const handleSaveBio = () => {
    localStorage.setItem("userBio", bio);
    setIsSaving(true);
    // Simulate save delay
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Profile Settings
      </h2>

      <div className="space-y-4">
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            defaultValue="CryptoUser123"
            placeholder="Enter your display name"
            aria-label="Display name"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <input
            type="text"
            defaultValue={username || userUsername}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Set your username"
            aria-label="Username"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            aria-label="Bio"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
