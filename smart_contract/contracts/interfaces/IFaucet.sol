// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

interface IFaucet {
    function setUSDTAddress(address _usdt) external;
    function depositEther() external payable;

    function withdrawUSDT() external;
    function withdrawEther() external;

    function receiveFaucet(address _receiver) external;

    function checkUSDTBalance() external view returns (uint256);
    function checkEtherBalance() external view returns (uint256);

    function setRate(uint256 _usdtPerTime, uint256 _etherPerTime) external;

    event SetUSDTAddress(address _usdt);
    event DepositUSDT(uint256 _amount);
    event DepositEther(uint256 _amount);

    event WithdrawUSDT(uint256 _amount);
    event WithdrawEther(uint256 _amount);

    event ReceiveFaucet(address _address, uint256 _usdtReceive, uint256 _etherReceive);
}