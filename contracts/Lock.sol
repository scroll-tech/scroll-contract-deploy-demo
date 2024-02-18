// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/**
 * @title Lock
 * @dev This contract allows locking funds until a specified time, after which the owner can withdraw them.
 */
contract Lock {
    uint public unlockTime; // The timestamp when the contract unlocks and funds can be withdrawn
    address payable public owner; // The address that deployed the contract and can withdraw funds

    /**
     * @dev Emitted when funds are withdrawn from the contract.
     * @param amount The amount of funds withdrawn.
     * @param when The timestamp when the withdrawal occurred.
     */
    event Withdrawal(uint amount, uint when);

    /**
     * @dev Constructor function that initializes the contract.
     * @param _unlockTime The timestamp when funds can be withdrawn.
     */
    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    /**
     * @dev Allows the owner to withdraw funds after the unlock time has passed.
     */
    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
