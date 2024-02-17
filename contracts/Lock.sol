// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Lock {
    uint public unlockTime;
    address private owner;

    event Withdrawal(address indexed recipient, uint amount, uint timestamp);

    constructor(uint _unlockTime) {
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");
        unlockTime = _unlockTime;
        owner = msg.sender;
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "Withdrawal time not reached");
        require(msg.sender == owner, "Only the owner can withdraw");

        emit Withdrawal(owner, address(this).balance, block.timestamp);
        payable(owner).transfer(address(this).balance);
    }
}