import Head from "next/head";

interface AnalyticsHeaderProps {
  address: string | undefined;
}

export function AnalyticsHeader({ address }: AnalyticsHeaderProps) {
  return (
    <>
      <Head>
        <title>Analytics - FriendFi</title>
        <meta
          name="description"
          content="Track your engagement, platform performance, and activity on FriendFi."
        />
        <meta
          name="keywords"
          content="analytics, platform performance, engagement, FriendFi, blockchain"
        />
        <meta name="author" content="FriendFi" />
      </Head>
      {/* Header */}
      {/* <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your engagement and platform performance.
        </p>
      </div> */}

      {!address && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your engagement and platform performance.
          </p>
        </div>
      )}
    </>
  );
} 