// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ICO {
    address public owner;
    IERC20 public token;
    uint256 public tokenPrice;

    constructor(address _token, uint256 _price) {
        owner = msg.sender;
        token = IERC20(_token);
        tokenPrice = _price;
    }

    function buyTokens() public payable {
        uint256 tokensToBuy = msg.value / tokenPrice;
        require(token.balanceOf(address(this)) >= tokensToBuy, "Not enough tokens in the contract");
        token.transfer(msg.sender, tokensToBuy);
    }

    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(owner).transfer(address(this).balance);
    }
}
