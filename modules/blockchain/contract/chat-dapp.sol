// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Web3SocialChat is ReentrancyGuard {
    using Counters for Counters.Counter;

    // 1. CORE STRUCTURES
    struct Message {
        address sender;
        address receiver;
        string contentIPFSHash;
        uint256 timestamp;
        uint256 tipAmount;
        bool isEncrypted;
    }

    struct UserActivity {
        uint256 messageCount;
        uint256 tipSent;
        uint256 tipReceived;
        uint256 lastActive;
        uint256 stakeAmount;
        uint256 totalRewards;
    }

    struct UserProfile {
        string username;
        uint256 joinDate;
        bool isActive;
    }

    // 2. STATE VARIABLES
    address public owner;
    uint256 public minStakeAmount;
    IERC20 public rewardToken;
    uint256 public rewardRate = 1 ether;
    uint256 public rewardInterval = 1 days;

    // Mappings
    mapping(address => UserProfile) public userProfiles;
    mapping(address => uint256) public stakedAmounts;
    mapping(address => UserActivity) public userActivities;
    mapping(uint256 => Message) public messages;
    mapping(address => uint256[]) public sentMessages;
    mapping(address => uint256[]) public receivedMessages;
    mapping(address => uint256) public lastRewardClaim;
    mapping(address => string) public usernames;
    mapping(address => bool) public hasUsername;

    // Arrays
    address[] public allUsers;
    address[] public activeUsers;

    // Counters
    Counters.Counter private _messageIdCounter;

    // 3. EVENTS
    event UserRegistered(address indexed user, string username);
    event MessageSent(
        uint256 indexed id,
        address from,
        address to,
        string contentHash,
        uint256 timestamp
    );
    event TipSent(address from, address to, uint256 amount);
    event UserStaked(address user, uint256 amount);
    event UserUnstaked(address user, uint256 amount);
    event RewardsClaimed(address user, uint256 amount);
    event UsernameUpdated(address user, string newUsername);

    // 4. MODIFIERS
    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized: Owner only");
        _;
    }

    modifier onlyRegistered() {
        require(
            bytes(userProfiles[msg.sender].username).length > 0,
            "User not registered"
        );
        _;
    }

    modifier onlyActive() {
        require(userProfiles[msg.sender].isActive, "User inactive");
        _;
    }

    // 5. CONSTRUCTOR
    constructor(address _rewardToken, uint256 _minStake) {
        owner = msg.sender;
        rewardToken = IERC20(_rewardToken);
        minStakeAmount = _minStake;
    }

    // 6. USER MANAGEMENT
    function registerUser(string calldata username) external {
        require(bytes(username).length >= 3, "Username too short");
        require(
            bytes(userProfiles[msg.sender].username).length == 0,
            "Already registered"
        );

        userProfiles[msg.sender] = UserProfile({
            username: username,
            joinDate: block.timestamp,
            isActive: false
        });
        allUsers.push(msg.sender);
        usernames[msg.sender] = username;
        hasUsername[msg.sender] = true;

        emit UserRegistered(msg.sender, username);
    }

    function updateUsername(
        string calldata newUsername
    ) external onlyRegistered {
        require(bytes(newUsername).length >= 3, "Username too short");
        userProfiles[msg.sender].username = newUsername;
        usernames[msg.sender] = newUsername;
        emit UsernameUpdated(msg.sender, newUsername);
    }

    // 7. STAKING FUNCTIONS
    function stake() external payable onlyRegistered nonReentrant {
        require(msg.value >= minStakeAmount, "Below minimum stake");

        stakedAmounts[msg.sender] += msg.value;
        userActivities[msg.sender].stakeAmount += msg.value;

        if (!userProfiles[msg.sender].isActive) {
            userProfiles[msg.sender].isActive = true;
            activeUsers.push(msg.sender);
        }

        emit UserStaked(msg.sender, msg.value);
    }

    function unstake(uint256 amount) external onlyRegistered nonReentrant {
        require(amount <= stakedAmounts[msg.sender], "Exceeds staked amount");
        require(amount > 0, "Amount must be positive");

        stakedAmounts[msg.sender] -= amount;
        userActivities[msg.sender].stakeAmount -= amount;
        payable(msg.sender).transfer(amount);

        if (stakedAmounts[msg.sender] == 0) {
            userProfiles[msg.sender].isActive = false;
            _removeFromActiveUsers(msg.sender);
        }

        emit UserUnstaked(msg.sender, amount);
    }

    // 8. MESSAGING SYSTEM
    function sendMessage(
        address receiver,
        string calldata ipfsHash,
        bool encrypted
    ) external onlyRegistered onlyActive {
        require(bytes(ipfsHash).length > 0, "Empty content hash");
        require(receiver != msg.sender, "Cannot message self");

        uint256 messageId = _messageIdCounter.current();
        _messageIdCounter.increment();

        messages[messageId] = Message({
            sender: msg.sender,
            receiver: receiver,
            contentIPFSHash: ipfsHash,
            timestamp: block.timestamp,
            tipAmount: 0,
            isEncrypted: encrypted
        });

        _updateActivity(msg.sender, receiver, 0);
        sentMessages[msg.sender].push(messageId);
        receivedMessages[receiver].push(messageId);

        emit MessageSent(
            messageId,
            msg.sender,
            receiver,
            ipfsHash,
            block.timestamp
        );
    }

    function sendMessageWithTip(
        address receiver,
        string calldata ipfsHash,
        bool encrypted
    ) external payable onlyRegistered onlyActive {
        require(msg.value > 0, "Tip must be > 0");

        uint256 messageId = _messageIdCounter.current();
        _messageIdCounter.increment();

        messages[messageId] = Message({
            sender: msg.sender,
            receiver: receiver,
            contentIPFSHash: ipfsHash,
            timestamp: block.timestamp,
            tipAmount: msg.value,
            isEncrypted: encrypted
        });

        _updateActivity(msg.sender, receiver, msg.value);
        sentMessages[msg.sender].push(messageId);
        receivedMessages[receiver].push(messageId);
        payable(receiver).transfer(msg.value);

        emit MessageSent(
            messageId,
            msg.sender,
            receiver,
            ipfsHash,
            block.timestamp
        );
        emit TipSent(msg.sender, receiver, msg.value);
    }

    // 9. REWARDS SYSTEM
    function claimRewards() external onlyRegistered nonReentrant {
        uint256 rewards = calculateRewards(msg.sender);
        require(rewards > 0, "No rewards available");

        lastRewardClaim[msg.sender] = block.timestamp;
        userActivities[msg.sender].totalRewards += rewards;
        rewardToken.transfer(msg.sender, rewards);

        emit RewardsClaimed(msg.sender, rewards);
    }

    // 10. INTERNAL HELPERS
    function _updateActivity(
        address sender,
        address receiver,
        uint256 tip
    ) internal {
        UserActivity storage senderAct = userActivities[sender];
        UserActivity storage receiverAct = userActivities[receiver];

        senderAct.messageCount++;
        senderAct.lastActive = block.timestamp;
        receiverAct.lastActive = block.timestamp;

        if (tip > 0) {
            senderAct.tipSent += tip;
            receiverAct.tipReceived += tip;
        }
    }

    function _removeFromActiveUsers(address user) internal {
        for (uint256 i = 0; i < activeUsers.length; i++) {
            if (activeUsers[i] == user) {
                activeUsers[i] = activeUsers[activeUsers.length - 1];
                activeUsers.pop();
                break;
            }
        }
    }

    // 11. GETTER FUNCTIONS
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
    )
        public
        view
        returns (
            Message memory,
            string memory senderUsername,
            string memory receiverUsername
        )
    {
        Message memory msgDetail = messages[messageId];
        string memory sender = hasUsername[msgDetail.sender]
            ? usernames[msgDetail.sender]
            : "No Username";
        string memory receiver = hasUsername[msgDetail.receiver]
            ? usernames[msgDetail.receiver]
            : "No Username";
        return (msgDetail, sender, receiver);
    }

    function getUserSentMessages(
        address user
    ) public view returns (uint256[] memory) {
        return sentMessages[user];
    }

    function getUserReceivedMessages(
        address user
    ) public view returns (uint256[] memory) {
        return receivedMessages[user];
    }

    function getActiveUsers() public view returns (address[] memory) {
        return activeUsers;
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

    function getUserStats(
        address user
    )
        public
        view
        returns (
            uint256 messageCount,
            uint256 tipSent,
            uint256 tipReceived,
            uint256 lastActive,
            uint256 stakeAmount,
            bool isUserActive
        )
    {
        UserActivity memory act = userActivities[user];
        return (
            act.messageCount,
            act.tipSent,
            act.tipReceived,
            act.lastActive,
            act.stakeAmount,
            userProfiles[user].isActive
        );
    }

    function getMessageDetails(
        uint256 id
    )
        public
        view
        returns (
            address sender,
            address receiver,
            string memory content,
            uint256 timestamp,
            uint256 tipAmount,
            bool encrypted
        )
    {
        Message memory m = messages[id];
        return (
            m.sender,
            m.receiver,
            m.contentIPFSHash,
            m.timestamp,
            m.tipAmount,
            m.isEncrypted
        );
    }

    function getUserMessages(
        address user
    ) public view returns (uint256[] memory sent, uint256[] memory received) {
        return (sentMessages[user], receivedMessages[user]);
    }

    function calculateRewards(address user) public view returns (uint256) {
        if (lastRewardClaim[user] == 0) return 0;

        uint256 elapsed = block.timestamp - lastRewardClaim[user];
        return (elapsed / rewardInterval) * rewardRate;
    }

    // 12. ADMIN FUNCTIONS
    function setRewardParameters(
        uint256 newRate,
        uint256 newInterval
    ) external onlyOwner {
        rewardRate = newRate;
        rewardInterval = newInterval;
    }

    function updateMinStake(uint256 newMinStake) external onlyOwner {
        minStakeAmount = newMinStake;
    }

    function emergencyWithdraw(address token) external onlyOwner nonReentrant {
        if (token == address(0)) {
            payable(owner).transfer(address(this).balance);
        } else {
            IERC20(token).transfer(
                owner,
                IERC20(token).balanceOf(address(this))
            );
        }
    }
}
