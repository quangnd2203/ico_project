// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

interface IICO {

    function setUSDTAddress(address _usdt) external;
    function setPPCBAddress(address _ppcb) external;

    function setRateUSDT(uint256 _rate) external;
    function setRateEther(uint256 _rate) external;

    function buyByUSDT(uint256 _amount) external;
    function buyByEther() external payable;

    function setWallet(address payable _wallet) external;

    // USE when if user tranfer USDT, BNB to ICO contract without buy function
    function withdrawUSDT() external;
    function withdrawPPCB() external;
    function withdrawEther() external payable;

    function setPause(bool _isPause) external;

    function depositPPCB(uint256 _amount) external;

    function setBonusMapping(uint256 _ppcbReceive, uint256 _bonusBasicPoint) external;

    event SetUSDTAddress(address _usdt);
    event SetPPCBAddress(address _ppcb);

    event SetRateUSDT(uint256 _rate);
    event SetRateEther(uint256 _rate);

    event BuyByUSDT(address _address, uint256 _usdtPay, uint256 _ppcbReceive);
    event BuyByEther(address _address, uint256 _etherPay, uint256 _ppcbReceive);

    event SetWallet(address _wallet);

    event WithdrawUSDT(uint256 _amount);
    event WithdrawPPCB(uint256 _amount);
    event WithdrawEther(uint256 _amount);

    event SetPause(bool _isPause);

    event DepositPPCB(uint256 _amount);

    event SetBonusMapping(uint256 _ppcbReceive, uint256 _bonusBasicPoint);

    error NotEnougPPCB();
    error ICOPause();
}