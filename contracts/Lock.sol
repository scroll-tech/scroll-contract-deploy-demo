// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Lock {
    uint public unlockTime; // Timestamp when the contract can be unlocked
    address payable public owner; // Address of the contract owner

    event Withdrawal(uint amount, uint when); // Event emitted when a withdrawal occurs

    // Constructor function, initializes the unlock time and sets the owner as the sender
    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    // Withdraw function, allows the owner to withdraw funds after the unlock time
    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp); // Emit the Withdrawal event

        owner.transfer(address(this).balance); // Transfer the contract balance to the owner
    }
}
