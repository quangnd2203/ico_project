// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "./interfaces/IFaucet.sol";
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Faucet is IFaucet, Ownable(msg.sender){
    IERC20 public usdt;

    uint256 usdtPerTime = 100 ether;
    uint256 etherPerTime = 0.01 ether;

    mapping(address => uint256) public lastReceiveTime;

    function setUSDTAddress(address _usdt) external onlyOwner override {
        usdt = IERC20(_usdt);
        emit SetUSDTAddress(_usdt);
    }
    
    function setRate(uint256 _usdtPerTime, uint256 _etherPerTime) external onlyOwner override {
        usdtPerTime = _usdtPerTime;
        etherPerTime = _etherPerTime;
    }

    function depositEther() external payable override {
        emit DepositEther(msg.value);
    }

    function withdrawUSDT() external override onlyOwner {
        uint256 usdtBalance = usdt.balanceOf(address(this));
        require(usdtBalance > 0, "Faucet: USDT balance is empty");
        usdt.transfer(owner(), usdtBalance);
        emit WithdrawUSDT(usdtBalance);
    }

    function withdrawEther() external override {
        uint256 etherBalance = address(this).balance;
        require(etherBalance > 0, "Faucet: Ether balance is empty");
        payable(owner()).transfer(etherBalance);
        emit WithdrawEther(etherBalance);
    }

    function receiveFaucet(address _receiver) external onlyOwner override {
        require(_checkDayValid(_receiver), "Faucet: next time in 24 hours");
        uint256 usdtBalance = usdt.balanceOf(address(this));
        uint256 etherBalance = address(this).balance;
        require(usdtBalance > 0 && etherBalance > 0, "Faucet: balance is empty");
        require(usdtBalance >= usdtPerTime && etherBalance >= etherPerTime, "Faucet: balance is not enough");
        usdt.transfer(_receiver, usdtPerTime);
        payable(_receiver).transfer(etherPerTime);
        emit ReceiveFaucet(_receiver, usdtPerTime, etherPerTime);
        _setDayValid(_receiver);
    }

    function checkUSDTBalance() external view override returns (uint256) {
        return usdt.balanceOf(address(this));
    }

    function checkEtherBalance() external view override returns (uint256) {
        return address(this).balance;
    }

    function _checkDayValid(address _receiver) internal view returns (bool) {
    return lastReceiveTime[msg.sender] == 0 || block.timestamp - lastReceiveTime[_receiver] >= 1 days;
    }

    function _setDayValid(address _receiver) internal {
        lastReceiveTime[_receiver] = block.timestamp;
    }

}