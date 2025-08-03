import { useUserChainInfo } from "@/modules/query";
import { IoLogOutOutline } from "react-icons/io5";

export function LogoutButton() {
  const { wallet } = useUserChainInfo();

  const handleLogout = () => {
    wallet?.disconnect();
  };

  return (
    <div className="mt-8 flex justify-center">
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
      >
        <IoLogOutOutline className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
