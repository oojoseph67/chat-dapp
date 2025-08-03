import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { Nav } from "../component/nav";
import { Sidebar } from "../component/sidebar";

type RootLayoutProps = {
  children: ReactNode;
  scrollToTop?: boolean;
};

const Toast = dynamic(() => import("@/modules/components/toast/toast"), {
  ssr: false,
});
export const RootLayout = ({ children, scrollToTop }: RootLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex isolate h-screen relative bg-background">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Nav />
        <div
          className="flex-1 z-10 py-6 font-inter overflow-auto"
          ref={(node) => {
            if (node && scrollToTop) {
              node.scroll(0, 0);
            }
          }}
        >
          {children}
          <Toast />
        </div>
      </div>
    </div>
  );
};
