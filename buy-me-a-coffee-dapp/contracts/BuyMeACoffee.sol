// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BuyMeACoffee {
    // Event to emit when a Memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received
    Memo[] memos;

    // Address of contract deployer
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    // Buy a coffee for the owner
    function buyCoffee(string memory name, string memory message) public payable {
        require(msg.value > 0, "Cannot buy coffee with 0 ETH");

        // Add the memo to storage!
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            name,
            message
        ));

        // Emit a NewMemo event with details about the memo.
        emit NewMemo(
            msg.sender,
            block.timestamp,
            name,
            message
        );
    }

    // Send the entire balance to the owner
    function withdrawTips() public {
        require(owner == msg.sender, "Only owner can withdraw");
        owner.transfer(address(this).balance);
    }

    // Retrieve all memos
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
