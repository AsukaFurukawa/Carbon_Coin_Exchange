// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCoin is ERC20, Ownable {
    mapping(address => bool) public minters;

    constructor() ERC20("CarbonCoin", "CC") {
        minters[msg.sender] = true;
    }

    modifier onlyMinter() {
        require(minters[msg.sender], "Caller is not a minter");
        _;
    }

    function addMinter(address minter) public onlyOwner {
        minters[minter] = true;
    }

    function removeMinter(address minter) public onlyOwner {
        minters[minter] = false;
    }

    function mint(address to, uint256 amount) public onlyMinter {
        _mint(to, amount);
    }
} 