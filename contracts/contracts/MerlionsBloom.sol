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

    // A mapping to store the request ID for each user
    mapping(address => uint256) public coinTosses;
    // A mapping to store the value sent by the user for each request
    mapping(uint256 => uint256) public openRequests;

    event CoinFlipped(address indexed user, uint256 requestId, uint256 amount);
    event CoinRevealed(address indexed user, uint256 requestId, uint8 coinFace, uint256 prize);

    /**
     * @dev Checks if a user has an open request.
     */
    function hasOpenRequest(address user) public view returns (bool) {
        return coinTosses[user] != 0;
    }

    /**
     * @dev Allows a user to flip a coin by sending FLOW to the contract. This is the commit step in the commit-reveal scheme.
     */
    function flipCoin() public payable {
        require(_isNonZero(msg.value), "Must send FLOW to place flip a coin");
        require(!_isNonZero(coinTosses[msg.sender]), "Must close previous coin flip before placing a new one");

        // request randomness
        uint256 requestId = _requestRandomness();
        // insert the request ID into the coinTosses mapping
        coinTosses[msg.sender] = requestId;
        // insert the value sent by the sender with the flipCoin function call into the openRequests mapping
        openRequests[requestId] = msg.value;

        emit CoinFlipped(msg.sender, requestId, msg.value);
    }

    /**
     * @dev Allows a user to reveal the result of the coin flip and claim their prize.
     */
    function revealCoin() public {
        require(hasOpenRequest(msg.sender), "Caller has not flipped a coin - nothing to reveal");

        // reveal random result and calculate winnings
        uint256 requestId = coinTosses[msg.sender];
        // delete the open request from the coinTosses mapping
        delete coinTosses[msg.sender];

        // fulfill the random request
        uint64 randomResult = _fulfillRandomness(uint32(requestId));
        // Greater than 6 equals Win, i.e. 40% odds to win coin toss
        uint8 coinFace = uint8(randomResult % 10);

        // get the value sent in the flipCoin function & remove the request from the openRequests mapping
        uint256 amount = openRequests[requestId];
        delete openRequests[requestId];

        // calculate the prize
        uint256 prize = 0;
        // send the prize if the random result is even
        if (coinFace >= 6) {
            prize = amount * multiplier;
            bool sent = payable(msg.sender).send(prize); // Use send to avoid revert
            require(sent, "Failed to send prize");
        }

        emit CoinRevealed(msg.sender, requestId, coinFace, prize);
    }

    /**
     * @dev Checks if a value is non-zero.
     */
    function _isNonZero(uint256 value) internal pure returns (bool) {
        return value > 0;
    }
}