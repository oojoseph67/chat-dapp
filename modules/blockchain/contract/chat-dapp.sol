// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Web3SocialChat {
    using Counters for Counters.Counter;

    // Contract owner
    address public owner;

    // Staking system
    uint256 public minStakeAmount;
    mapping(address => uint256) public stakedAmounts;

    // User information (store usernames for each address)
    mapping(address => string) public usernames;
    mapping(address => bool) public hasUsername;

    // Messaging system
    struct Message {
        address sender;
        address receiver;
        string contentIPFSHash; // Store the IPFS hash of the message content
        uint256 timestamp;
        uint256 tipAmount;
        bool isEncrypted;
    }

    Counters.Counter private _messageIdCounter;
    mapping(uint256 => Message) public messages;
    mapping(address => uint256[]) public userSentMessages;
    mapping(address => uint256[]) public userReceivedMessages;

    // User activity tracking
    struct UserActivity {
        uint256 messageCount;
        uint256 tipSent;
        uint256 tipReceived;
        uint256 lastActive;
        uint256 stakeAmount;
    }

    mapping(address => UserActivity) public userActivities;

    // Reward system
    IERC20 public rewardToken;
    uint256 public rewardRate = 1e18;
    uint256 public rewardInterval = 1 days;

    // Events
    event TipSent(address indexed from, address indexed to, uint256 amount);
    event MessageSent(
        uint256 indexed messageId,
        address indexed from,
        address indexed to,
        string contentIPFSHash,
        uint256 timestamp
    );
    event UserStaked(address indexed user, uint256 amount);
    event UserUnstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event UsernameSet(address indexed user, string username);

    constructor(address _rewardToken, uint256 _minStakeAmount) {
        owner = msg.sender;
        rewardToken = IERC20(_rewardToken);
        minStakeAmount = _minStakeAmount;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyStakedUsers() {
        require(stakedAmounts[msg.sender] >= minStakeAmount, "No stake found");
        _;
    }

    // Staking functions
    function stake() external payable onlyStakedUsers {
        require(msg.value >= minStakeAmount, "Insufficient stake");
        stakedAmounts[msg.sender] += msg.value;
        userActivities[msg.sender].stakeAmount += msg.value;
        emit UserStaked(msg.sender, msg.value);
    }

    function unstake() external onlyStakedUsers {
        uint256 amount = stakedAmounts[msg.sender];
        require(amount > 0, "Nothing staked");
        stakedAmounts[msg.sender] = 0;
        userActivities[msg.sender].stakeAmount = 0;
        payable(msg.sender).transfer(amount);
        emit UserUnstaked(msg.sender, amount);
    }

    // Username setting
    function setUsername(string calldata username) external onlyStakedUsers {
        require(bytes(username).length > 0, "Username can't be empty");
        require(!hasUsername[msg.sender], "Username already set");

        usernames[msg.sender] = username;
        hasUsername[msg.sender] = true;

        emit UsernameSet(msg.sender, username);
    }

    // Message functions
    function sendMessage(
        address receiver,
        string memory contentIPFSHash,
        bool isEncrypted
    ) external onlyStakedUsers {
        require(bytes(contentIPFSHash).length > 0, "Empty content IPFS hash");

        uint256 messageId = _messageIdCounter.current();
        _messageIdCounter.increment();

        messages[messageId] = Message({
            sender: msg.sender,
            receiver: receiver,
            contentIPFSHash: contentIPFSHash,
            timestamp: block.timestamp,
            tipAmount: 0,
            isEncrypted: isEncrypted
        });

        userSentMessages[msg.sender].push(messageId);
        userReceivedMessages[receiver].push(messageId);

        // Update activity
        userActivities[msg.sender].messageCount++;
        userActivities[msg.sender].lastActive = block.timestamp;
        userActivities[receiver].lastActive = block.timestamp;

        emit MessageSent(
            messageId,
            msg.sender,
            receiver,
            contentIPFSHash,
            block.timestamp
        );
    }

    function sendMessageWithTip(
        address receiver,
        string memory contentIPFSHash,
        bool isEncrypted
    ) external payable onlyStakedUsers {
        require(msg.value > 0, "Tip must be > 0");

        uint256 messageId = _messageIdCounter.current();
        _messageIdCounter.increment();

        messages[messageId] = Message({
            sender: msg.sender,
            receiver: receiver,
            contentIPFSHash: contentIPFSHash,
            timestamp: block.timestamp,
            tipAmount: msg.value,
            isEncrypted: isEncrypted
        });

        userSentMessages[msg.sender].push(messageId);
        userReceivedMessages[receiver].push(messageId);

        // Update activity and transfer tip
        userActivities[msg.sender].messageCount++;
        userActivities[msg.sender].tipSent += msg.value;
        userActivities[receiver].tipReceived += msg.value;
        userActivities[msg.sender].lastActive = block.timestamp;
        userActivities[receiver].lastActive = block.timestamp;

        payable(receiver).transfer(msg.value);

        emit MessageSent(
            messageId,
            msg.sender,
            receiver,
            contentIPFSHash,
            block.timestamp
        );
        emit TipSent(msg.sender, receiver, msg.value);
    }

    // Rewards functions
    function claimRewards() external onlyStakedUsers {
        require(
            block.timestamp >
                userActivities[msg.sender].lastActive + rewardInterval,
            "Wait for reward interval"
        );

        uint256 rewardAmount = calculateRewards(msg.sender);
        require(rewardAmount > 0, "No rewards available");

        userActivities[msg.sender].lastActive = block.timestamp;
        rewardToken.transfer(msg.sender, rewardAmount);

        emit RewardsClaimed(msg.sender, rewardAmount);
    }

    function calculateRewards(address user) public view returns (uint256) {
        if (userActivities[user].lastActive == 0) return 0;

        uint256 timeSinceLastActive = block.timestamp -
            userActivities[user].lastActive;
        uint256 intervalsPassed = timeSinceLastActive / rewardInterval;

        return intervalsPassed * rewardRate;
    }

    // Admin functions
    function setRewardRate(uint256 newRate) external onlyOwner {
        rewardRate = newRate;
    }

    function setRewardInterval(uint256 newInterval) external onlyOwner {
        rewardInterval = newInterval;
    }

    function setMinStakeAmount(uint256 newAmount) external onlyOwner {
        minStakeAmount = newAmount;
    }

    function withdrawTokens(
        address tokenAddress,
        uint256 amount
    ) external onlyOwner {
        IERC20(tokenAddress).transfer(owner, amount);
    }

    // Getters
    function getUserMessageCount(address user) public view returns (uint256) {
        return userActivities[user].messageCount;
    }

    function getUserTipStats(
        address user
    ) public view returns (uint256 sent, uint256 received) {
        return (userActivities[user].tipSent, userActivities[user].tipReceived);
    }

    function getUserStake(address user) public view returns (uint256) {
        return userActivities[user].stakeAmount;
    }

    function getLastActive(address user) public view returns (uint256) {
        return userActivities[user].lastActive;
    }

    function getMessage(
        uint256 messageId
    ) public view returns (Message memory) {
        return messages[messageId];
    }

    function getUserSentMessages(
        address user
    ) public view returns (uint256[] memory) {
        return userSentMessages[user];
    }

    function getUserReceivedMessages(
        address user
    ) public view returns (uint256[] memory) {
        return userReceivedMessages[user];
    }

    function getUserUsername(address user) public view returns (string memory) {
        require(hasUsername[user], "User has not set a username");
        return usernames[user];
    }

    function getUserActivity(
        address user
    )
        public
        view
        returns (
            uint256 messageCount,
            uint256 tipSent,
            uint256 tipReceived,
            uint256 lastActive,
            uint256 stakeAmount
        )
    {
        UserActivity memory activity = userActivities[user];
        return (
            activity.messageCount,
            activity.tipSent,
            activity.tipReceived,
            activity.lastActive,
            activity.stakeAmount
        );
    }
}
