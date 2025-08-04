# FriendFi MVP - Decentralized Messaging Platform

## Overview

The FriendFi MVP lays the foundation for a secure, scalable, and decentralized messaging platform. By utilizing XFI tokens for staking, rewards, and governance, FriendFi ensures transparency and community-driven development. With an eye toward multi-chain support, gamified staking, and mobile accessibility, FriendFi is poised to redefine Web3 communication. The platform's roadmap emphasizes flexibility, security, and long-term growth, setting FriendFi on a path toward becoming a leading platform for decentralized messaging and user engagement.

## Features

### Core Functionality
- **Decentralized Messaging**: Secure peer-to-peer messaging with blockchain-based authentication
- **XFI Token Integration**: Staking, rewards, and governance through XFI tokens
- **User Dashboard**: Comprehensive analytics and user management interface
- **Friends System**: Connect and manage friend relationships
- **Staking Platform**: Stake XFI tokens to earn rewards and participate in governance
- **Analytics Dashboard**: Track platform usage, staking performance, and user engagement

### Security & Transparency
- **Smart Contract Security**: Audited smart contracts for staking and rewards
- **Decentralized Architecture**: No single point of failure
- **Community Governance**: Token holders participate in platform decisions
- **Transparent Rewards**: Clear and verifiable reward distribution

## Technology Stack

### Frontend
- **Next.js**: React framework for server-side rendering and static generation
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Query**: Data fetching and state management

### Blockchain
- **Ethereum**: Primary blockchain for smart contracts
- **Solidity**: Smart contract development language
- **Web3.js**: Ethereum JavaScript API
- **Hardhat**: Development environment for Ethereum

### Infrastructure
- **IPFS**: Decentralized file storage for messages and content
- **MetaMask**: Wallet integration for user authentication
- **Toast Notifications**: User feedback system

## Project Structure

```
chat-dapp/
├── components/          # Reusable UI components
│   ├── dashboard/      # Dashboard-specific components
│   └── messages/       # Messaging components
├── modules/            # Core application modules
│   ├── app/           # Main application logic
│   ├── blockchain/    # Blockchain integration
│   ├── mutation/      # Data mutation operations
│   ├── provider/      # Context providers
│   └── query/         # Data query operations
├── pages/             # Next.js pages
├── public/            # Static assets
├── styles/            # Global styles
└── utils/             # Utility functions
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or pnpm
- MetaMask browser extension
- Ethereum testnet/mainnet access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-dapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
   NEXT_PUBLIC_NETWORK_ID=your_network_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Smart Contracts

The project includes smart contracts for:
- **Chat DApp Contract**: Core messaging functionality
- **Token Contract**: XFI token implementation
- **Staking Contract**: Token staking and rewards
- **Admin Functions**: Platform management

### Contract Deployment
```bash
# Deploy to testnet
npx hardhat run scripts/deploy.js --network testnet

# Deploy to mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

## Usage

### Connecting Wallet
1. Install MetaMask browser extension
2. Connect your wallet to the application
3. Ensure you have XFI tokens for staking and messaging

### Messaging
1. Navigate to the Messages page
2. Add friends using their wallet addresses
3. Start secure, decentralized conversations

### Staking
1. Visit the Staking page
2. Stake your XFI tokens
3. Earn rewards based on staking duration and amount
4. Participate in platform governance

### Analytics
1. Access the Analytics dashboard
2. View platform statistics and your performance
3. Track staking rewards and user engagement

## Roadmap

### Phase 1: MVP (Current)
- ✅ Core messaging functionality
- ✅ XFI token integration
- ✅ Basic staking system
- ✅ User dashboard

### Phase 2: Enhancement
- 🔄 Multi-chain support
- 🔄 Advanced analytics
- 🔄 Mobile application
- 🔄 Enhanced security features

### Phase 3: Expansion
- 📋 Gamified staking mechanics
- 📋 Advanced governance features
- 📋 Cross-chain messaging
- 📋 Enterprise integrations

## Contributing

We welcome contributions from the community! Please read our contributing guidelines and submit pull requests for review.

### Development Guidelines
- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation for new features
- Follow the existing code style

## Security

FriendFi prioritizes security through:
- Regular smart contract audits
- Bug bounty programs
- Community security reviews
- Transparent development process

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Join our Discord community
- Check our documentation
- Open an issue on GitHub
- Contact the development team

## Acknowledgments

Thank you to all contributors, community members, and supporters who have helped make FriendFi possible.

---

**FriendFi** - Redefining Web3 Communication
