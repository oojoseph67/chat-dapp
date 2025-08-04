import { createThirdwebClient, defineChain } from "thirdweb";

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

if (!process.env.NEXT_PUBLIC_IS_TESTNET) {
  throw new Error("NEXT_PUBLIC_IS_TESTNET is not set");
}

export const IS_TESTNET = process.env.NEXT_PUBLIC_IS_TESTNET === "true";

export const testnetProviderUrlMap = [
  // "https://crossfi-testnet.g.alchemy.com/v2/LyMEMlI9ehqzPfajiDhvBXZ4MGjUQ6L-",
  "https://4157.rpc.thirdweb.com",
  "https://rpc.testnet.ms/",
  "https://rpc.xfi.ms/archive/4157",
];

export const mainnetProviderUrlMap = [
  // "https://crossfi-mainnet.g.alchemy.com/v2/LyMEMlI9ehqzPfajiDhvBXZ4MGjUQ6L-",
  "https://rpc.mainnet.ms/",
  "https://4158.rpc.thirdweb.com",
];

export const chain1Testnet = defineChain({
  id: 4157,
  name: "CrossFi Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "XFI",
    symbol: "XFI",
  },
  rpcUrls: {
    default: {
      http: testnetProviderUrlMap,
    },
  },
  testnet: true,
  blockExplorers: [
    { name: "Testnet Explorer", url: "https://test.xfiscan.com/" },
  ],
});

export const chain1Mainnet = defineChain({
  id: 4158,
  name: "CrossFi Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "XFI",
    symbol: "XFI",
  },
  rpcUrls: {
    default: {
      http: mainnetProviderUrlMap,
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://xfiscan.com/" },
  },
});

export const chatContractTestnet = "0xEfa1D9CdC8021096985f8be3935e3cEbC302a98f";
export const chatContractMainnet = "";

export const usdtContractTestnet = "0xc89016a86ccEE9365e893f294f74E81a5A3AB559";
export const usdtContractMainnet = "";

export const usdtContract = IS_TESTNET
  ? usdtContractTestnet
  : usdtContractMainnet;

export const chatContract = IS_TESTNET
  ? chatContractTestnet
  : chatContractMainnet;

export const chainInfo = IS_TESTNET ? chain1Testnet : chain1Mainnet;
