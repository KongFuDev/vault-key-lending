// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@fhevm/lib/Reencrypt.sol";
import "@fhevm/lib/Fhe.sol";

contract VaultKeyLending {
    using Fhe for euint32;
    using Fhe for ebool;
    using Fhe for euint256;
    
    struct VaultKey {
        euint32 keyId;
        euint32 tokenId;
        euint32 collateralAmount;
        euint32 loanAmount;
        euint32 interestRate;
        euint32 duration;
        ebool isActive;
        ebool isLiquidated;
        address owner;
        address borrower;
        uint256 createdAt;
        uint256 expiresAt;
    }
    
    struct LoanRequest {
        euint32 requestId;
        euint32 tokenId;
        euint32 requestedAmount;
        euint32 offeredCollateral;
        euint32 maxInterestRate;
        ebool isActive;
        address requester;
        uint256 createdAt;
    }
    
    struct LiquidationEvent {
        euint32 eventId;
        euint32 keyId;
        euint32 finalPrice;
        ebool wasSuccessful;
        address liquidator;
        uint256 timestamp;
    }
    
    mapping(uint256 => VaultKey) public vaultKeys;
    mapping(uint256 => LoanRequest) public loanRequests;
    mapping(uint256 => LiquidationEvent) public liquidations;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public userCreditScore;
    
    uint256 public keyCounter;
    uint256 public requestCounter;
    uint256 public liquidationCounter;
    
    address public owner;
    address public verifier;
    euint32 public platformFeeRate;
    euint32 public liquidationThreshold;
    
    event KeyCreated(uint256 indexed keyId, address indexed owner, uint32 tokenId);
    event LoanRequested(uint256 indexed requestId, address indexed requester, uint32 tokenId);
    event LoanGranted(uint256 indexed keyId, address indexed borrower, uint32 loanAmount);
    event LoanRepaid(uint256 indexed keyId, address indexed borrower, uint32 amount);
    event KeyLiquidated(uint256 indexed keyId, address indexed liquidator, uint32 finalPrice);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
        platformFeeRate = Fhe.asEuint32(250); // 2.5% in basis points
        liquidationThreshold = Fhe.asEuint32(8000); // 80% in basis points
    }
    
    function createVaultKey(
        euint32 _tokenId,
        euint32 _collateralAmount
    ) public returns (uint256) {
        require(Fhe.decrypt(_tokenId) > 0, "Invalid token ID");
        require(Fhe.decrypt(_collateralAmount) > 0, "Invalid collateral amount");
        
        uint256 keyId = keyCounter++;
        
        vaultKeys[keyId] = VaultKey({
            keyId: _tokenId, // Will be set properly
            tokenId: _tokenId,
            collateralAmount: _collateralAmount,
            loanAmount: Fhe.asEuint32(0),
            interestRate: Fhe.asEuint32(0),
            duration: Fhe.asEuint32(0),
            isActive: Fhe.asEbool(true),
            isLiquidated: Fhe.asEbool(false),
            owner: msg.sender,
            borrower: address(0),
            createdAt: block.timestamp,
            expiresAt: 0
        });
        
        emit KeyCreated(keyId, msg.sender, Fhe.decrypt(_tokenId));
        return keyId;
    }
    
    function requestLoan(
        euint32 _tokenId,
        euint32 _requestedAmount,
        euint32 _offeredCollateral,
        euint32 _maxInterestRate
    ) public returns (uint256) {
        require(Fhe.decrypt(_tokenId) > 0, "Invalid token ID");
        require(Fhe.decrypt(_requestedAmount) > 0, "Invalid requested amount");
        require(Fhe.decrypt(_offeredCollateral) > 0, "Invalid collateral amount");
        
        uint256 requestId = requestCounter++;
        
        loanRequests[requestId] = LoanRequest({
            requestId: _tokenId, // Will be set properly
            tokenId: _tokenId,
            requestedAmount: _requestedAmount,
            offeredCollateral: _offeredCollateral,
            maxInterestRate: _maxInterestRate,
            isActive: Fhe.asEbool(true),
            requester: msg.sender,
            createdAt: block.timestamp
        });
        
        emit LoanRequested(requestId, msg.sender, Fhe.decrypt(_tokenId));
        return requestId;
    }
    
    function grantLoan(
        uint256 _keyId,
        uint256 _requestId,
        euint32 _loanAmount,
        euint32 _interestRate,
        euint32 _duration
    ) public {
        require(vaultKeys[_keyId].owner == msg.sender, "Only key owner can grant loan");
        require(Fhe.decrypt(vaultKeys[_keyId].isActive), "Key is not active");
        require(Fhe.decrypt(loanRequests[_requestId].isActive), "Request is not active");
        require(vaultKeys[_keyId].borrower == address(0), "Key already has a borrower");
        
        // Check if the loan amount is within the collateral value
        euint32 maxLoanAmount = vaultKeys[_keyId].collateralAmount * Fhe.asEuint32(8000) / Fhe.asEuint32(10000); // 80% LTV
        require(Fhe.decrypt(_loanAmount) <= Fhe.decrypt(maxLoanAmount), "Loan amount exceeds maximum");
        
        // Update vault key with loan details
        vaultKeys[_keyId].loanAmount = _loanAmount;
        vaultKeys[_keyId].interestRate = _interestRate;
        vaultKeys[_keyId].duration = _duration;
        vaultKeys[_keyId].borrower = loanRequests[_requestId].requester;
        vaultKeys[_keyId].expiresAt = block.timestamp + Fhe.decrypt(_duration);
        
        // Deactivate the loan request
        loanRequests[_requestId].isActive = Fhe.asEbool(false);
        
        // Transfer loan amount to borrower through secure contract call
        address borrower = loanRequests[_requestId].requester;
        (bool success, ) = borrower.call{value: Fhe.decrypt(_loanAmount)}("");
        require(success, "Loan transfer failed");
        
        emit LoanGranted(_keyId, loanRequests[_requestId].requester, Fhe.decrypt(_loanAmount));
    }
    
    function repayLoan(uint256 _keyId) public payable {
        require(vaultKeys[_keyId].borrower == msg.sender, "Only borrower can repay");
        require(Fhe.decrypt(vaultKeys[_keyId].isActive), "Key is not active");
        require(!Fhe.decrypt(vaultKeys[_keyId].isLiquidated), "Key is already liquidated");
        
        euint32 totalRepayment = calculateTotalRepayment(_keyId);
        require(msg.value >= Fhe.decrypt(totalRepayment), "Insufficient repayment amount");
        
        // Update vault key
        vaultKeys[_keyId].isActive = Fhe.asEbool(false);
        vaultKeys[_keyId].borrower = address(0);
        
        // Transfer collateral back to original owner through secure contract call
        uint256 collateralAmount = Fhe.decrypt(vaultKeys[_keyId].collateralAmount);
        address owner = vaultKeys[_keyId].owner;
        (bool success, ) = owner.call{value: collateralAmount}("");
        require(success, "Collateral transfer failed");
        
        // Calculate and distribute platform fee through secure contract call
        uint256 platformFee = (msg.value * Fhe.decrypt(platformFeeRate)) / 10000;
        (bool feeSuccess, ) = owner.call{value: platformFee}("");
        require(feeSuccess, "Platform fee transfer failed");
        
        emit LoanRepaid(_keyId, msg.sender, Fhe.decrypt(totalRepayment));
    }
    
    function liquidateKey(uint256 _keyId) public {
        require(Fhe.decrypt(vaultKeys[_keyId].isActive), "Key is not active");
        require(!Fhe.decrypt(vaultKeys[_keyId].isLiquidated), "Key is already liquidated");
        require(block.timestamp > vaultKeys[_keyId].expiresAt, "Loan has not expired");
        
        // Calculate liquidation price (simplified auction mechanism)
        euint32 liquidationPrice = vaultKeys[_keyId].collateralAmount * liquidationThreshold / Fhe.asEuint32(10000);
        
        // Update vault key
        vaultKeys[_keyId].isLiquidated = Fhe.asEbool(true);
        vaultKeys[_keyId].isActive = Fhe.asEbool(false);
        
        // Record liquidation event
        uint256 eventId = liquidationCounter++;
        liquidations[eventId] = LiquidationEvent({
            eventId: liquidationPrice, // Will be set properly
            keyId: Fhe.asEuint32(_keyId),
            finalPrice: liquidationPrice,
            wasSuccessful: Fhe.asEbool(true),
            liquidator: msg.sender,
            timestamp: block.timestamp
        });
        
        // Transfer collateral to liquidator through secure contract call
        uint256 liquidationAmount = Fhe.decrypt(liquidationPrice);
        (bool success, ) = msg.sender.call{value: liquidationAmount}("");
        require(success, "Liquidation transfer failed");
        
        emit KeyLiquidated(_keyId, msg.sender, Fhe.decrypt(liquidationPrice));
    }
    
    function updateUserReputation(address _user, euint32 _reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(_user != address(0), "Invalid user address");
        
        userReputation[_user] = _reputation;
        emit ReputationUpdated(_user, Fhe.decrypt(_reputation));
    }
    
    function updateUserCreditScore(address _user, euint32 _creditScore) public {
        require(msg.sender == verifier, "Only verifier can update credit score");
        require(_user != address(0), "Invalid user address");
        
        userCreditScore[_user] = _creditScore;
    }
    
    function calculateTotalRepayment(uint256 _keyId) public view returns (euint32) {
        euint32 principal = vaultKeys[_keyId].loanAmount;
        euint32 interest = principal * vaultKeys[_keyId].interestRate / Fhe.asEuint32(10000);
        return principal + interest;
    }
    
    function getVaultKeyInfo(uint256 _keyId) public view returns (
        uint32 tokenId,
        uint32 collateralAmount,
        uint32 loanAmount,
        uint32 interestRate,
        uint32 duration,
        bool isActive,
        bool isLiquidated,
        address owner,
        address borrower,
        uint256 createdAt,
        uint256 expiresAt
    ) {
        VaultKey storage key = vaultKeys[_keyId];
        return (
            Fhe.decrypt(key.tokenId),
            Fhe.decrypt(key.collateralAmount),
            Fhe.decrypt(key.loanAmount),
            Fhe.decrypt(key.interestRate),
            Fhe.decrypt(key.duration),
            Fhe.decrypt(key.isActive),
            Fhe.decrypt(key.isLiquidated),
            key.owner,
            key.borrower,
            key.createdAt,
            key.expiresAt
        );
    }
    
    function getLoanRequestInfo(uint256 _requestId) public view returns (
        uint32 tokenId,
        uint32 requestedAmount,
        uint32 offeredCollateral,
        uint32 maxInterestRate,
        bool isActive,
        address requester,
        uint256 createdAt
    ) {
        LoanRequest storage request = loanRequests[_requestId];
        return (
            Fhe.decrypt(request.tokenId),
            Fhe.decrypt(request.requestedAmount),
            Fhe.decrypt(request.offeredCollateral),
            Fhe.decrypt(request.maxInterestRate),
            Fhe.decrypt(request.isActive),
            request.requester,
            request.createdAt
        );
    }
    
    function getUserReputation(address _user) public view returns (uint32) {
        return Fhe.decrypt(userReputation[_user]);
    }
    
    function getUserCreditScore(address _user) public view returns (uint32) {
        return Fhe.decrypt(userCreditScore[_user]);
    }
    
    function getPlatformFeeRate() public view returns (uint32) {
        return Fhe.decrypt(platformFeeRate);
    }
    
    function getLiquidationThreshold() public view returns (uint32) {
        return Fhe.decrypt(liquidationThreshold);
    }
    
    // Emergency functions
    function pauseContract() public {
        require(msg.sender == owner, "Only owner can pause");
        // Implementation for pausing contract
    }
    
    function updatePlatformFeeRate(euint32 _newRate) public {
        require(msg.sender == owner, "Only owner can update fee rate");
        platformFeeRate = _newRate;
    }
    
    function updateLiquidationThreshold(euint32 _newThreshold) public {
        require(msg.sender == owner, "Only owner can update liquidation threshold");
        liquidationThreshold = _newThreshold;
    }
}
