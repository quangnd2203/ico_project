// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import 'hardhat/console.sol';

contract PeopleCoin is ERC20('People Coin', 'PPCB'), ERC20Burnable, Ownable(msg.sender) {

    uint256 public immutable maxcap;

    constructor(){
        uint _ether = 10 ** uint256(18);
        maxcap = 50_000_000_000 * _ether;
        _mint(owner(), maxcap);
    }
}
