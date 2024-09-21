// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "./CadenceRandomConsumer.sol";

/**
 * @dev This contract is a simple coin toss game where users can place win prizes by flipping a coin as a demonstration
 * of safe usage of Flow EVM's native secure randomness.
 */
contract MerlionsBloom is CadenceRandomConsumer {
    // A constant to store the multiplier for the prize
    uint8 public constant multiplier = 2;
    
    uint256 public currentRequestId; 
    uint256 public currentDepositAmount;

    address public currentPlayer;

    event CoinFlipped(address indexed user, uint256 requestId, uint256 amount);
    event CoinRevealed(address indexed user, uint256 requestId, uint8 coinFace, uint256 prize);
    event Received(address sender, uint amount);

    constructor() {
        // Game start amount in 1 FLOW token
        currentDepositAmount = 10e18;
    }

    /**
     * @dev Checks if a user has an open request.
     */
    function hasOpenRequest() public view returns (bool) {
        return currentRequestId != 0;
    }

    /**
     * @dev Allows a user to flip a coin by sending FLOW to the contract. This is the commit step in the commit-reveal scheme.
     */
    function flipCoin() public payable {
        require(msg.value >= currentDepositAmount, "Player's deposit must be greater than required deposit amount");
        require(!_isNonZero(currentRequestId), "Must close previous coin flip before placing a new one");

        // request randomness
        uint256 requestId = _requestRandomness();
        // insert the request ID into the coinTosses mapping
        currentRequestId = requestId;
        // insert the address for current player
        currentPlayer = msg.sender;

        emit CoinFlipped(msg.sender, requestId, currentDepositAmount);
    }

    /**
     * @dev Allows a user to reveal the result of the coin flip and claim their prize.
     */
    function revealCoin() public {
        require(hasOpenRequest(), "Caller has not flipped a coin - nothing to reveal");

        // reveal random result and calculate winnings
        uint256 requestId = currentRequestId;
        // delete the open request from the coinTosses mapping
        delete currentRequestId;

        // fulfill the random request
        uint64 randomResult = _fulfillRandomness(uint32(requestId));
        // Greater than 6 equals Win, i.e. 40% odds to win coin toss
        uint8 coinFace = uint8(randomResult % 10);

        // get the value sent in the flipCoin function & remove the request from the openRequests mapping
        uint256 amount = currentDepositAmount;

        address player = currentPlayer;
        delete currentPlayer;

        // calculate the prize
        uint256 prize = 0;
        // send the prize if the random result is even
        if (coinFace >= 6) {
            prize = amount * multiplier;
            bool sent = payable(player).send(prize); // Use send to avoid revert
            require(sent, "Failed to send prize");
            currentDepositAmount = currentDepositAmount / multiplier;
        }     else {
            currentDepositAmount = currentDepositAmount * multiplier;
        }

        emit CoinRevealed(player, requestId, coinFace, prize);
    }

    /**
     * @dev Checks if a value is non-zero.
     */
    function _isNonZero(uint256 value) internal pure returns (bool) {
        return value > 0;
    }

        fallback() external payable {
        emit Received(msg.sender, msg.value);
    }

     receive() external payable {
        // custom function code
    }
}