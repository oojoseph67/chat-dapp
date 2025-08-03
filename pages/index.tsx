import { useState } from "react";
import Link from "next/link";
import {
  IoRocketOutline,
  IoChatbubbleOutline,
  IoWalletOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

export default function Home() {
  const [hasStake, setHasStake] = useState(false); // Dummy state for demo

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">FF</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                FriendFi
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              The revolutionary Web3 social platform where meaningful connections
              meet blockchain technology. Stake tokens, earn rewards, and build
              genuine friendships in a secure, decentralized environment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!hasStake ? (
                <>
                  <Link
                    href="/staking"
                    className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <IoWalletOutline className="w-5 h-5 mr-2" />
                    Start Staking
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary transition-colors duration-200"
                  >
                    <IoRocketOutline className="w-5 h-5 mr-2" />
                    Explore Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/messages"
                  className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <IoChatbubbleOutline className="w-5 h-5 mr-2" />
                  Start Chatting
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose FriendFi?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Experience the future of Web3 social networking with blockchain-powered
              features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <IoWalletOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Stake & Earn
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stake your tokens to earn rewards while building connections.
                The more you engage, the more you earn.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl border border-purple-200 dark:border-purple-800">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <IoChatbubbleOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Secure Messaging
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                End-to-end encrypted messaging with file sharing and tipping
                capabilities for meaningful interactions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl border border-green-200 dark:border-green-800">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <IoPeopleOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Build Connections
              </h3>
                              <p className="text-gray-600 dark:text-gray-300">
                  Connect with like-minded Web3 enthusiasts, discover new friends, and
                  grow your network in a trusted decentralized environment.
                </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-8 rounded-2xl border border-red-200 dark:border-red-800">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-6">
                <IoShieldCheckmarkOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Decentralized Security
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is secured on the blockchain with full control over
                your privacy and digital assets.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-8 rounded-2xl border border-yellow-200 dark:border-yellow-800">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-6">
                <IoRocketOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Fast & Scalable
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built on modern blockchain technology for lightning-fast
                transactions and seamless user experience.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-8 rounded-2xl border border-indigo-200 dark:border-indigo-800">
              <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <IoWalletOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Token Economy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Participate in a vibrant token economy where engagement and
                contribution are rewarded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your FriendFi Journey?
          </h2>
                      <p className="text-xl text-white/90 mb-8">
              Join thousands of Web3 users already building meaningful connections and
              earning rewards
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/staking"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <IoWalletOutline className="w-5 h-5 mr-2" />
              Get Started with Staking
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white hover:text-primary transition-colors duration-200"
            >
              <IoRocketOutline className="w-5 h-5 mr-2" />
              Explore Platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
