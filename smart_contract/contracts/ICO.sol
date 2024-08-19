// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import './interfaces/IICO.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";

contract ICO is IICO, Ownable(msg.sender) {
    using EnumerableMap for EnumerableMap.UintToUintMap;
    using SafeERC20 for IERC20;

    /**
     * @dev The rate of the token received.
     * (token received => percentage bonus (basic point))
     * example: 1000 => 1000 (10%)
     */
    EnumerableMap.UintToUintMap private bonusRates;

    /**
     * @dev The rate of the token received.
     * example: 1000 =>  (1 USDT = 1000 PPCB)
     */
    uint256 public rateUSDT;

    /**
     * @dev The rate of the token received.
     * example: 1000 =>  (1 Ether = 1000 PPCB)
     */
    uint256 public rateEther;

    IERC20 public usdt;
    IERC20 public ppcb;

    bool public isPause;

    address payable public wallet;

    constructor(address _usdt, address _ppcb, uint256 _rateUSDT, uint256 _rateEther, address payable _wallet) {
        usdt = IERC20(_usdt);
        ppcb = IERC20(_ppcb);
        rateUSDT = _rateUSDT;
        rateEther = _rateEther;
        isPause = false;
        wallet = _wallet;
    }

    modifier notPause() {
        require(!isPause, 'ICOPause');
        _;
    }

    function setUSDTAddress(address _usdt) external override onlyOwner {
        usdt = IERC20(_usdt);
        emit SetUSDTAddress(_usdt);
    }

    function setPPCBAddress(address _ppcb) external override onlyOwner {
        ppcb = IERC20(_ppcb);
        emit SetPPCBAddress(_ppcb);
    }

    function setRateUSDT(uint256 _rate) external override onlyOwner {
        require(_rate > 0);
        rateUSDT = _rate;
        emit SetRateUSDT(_rate);
    }

    function setRateEther(uint256 _rate) external override onlyOwner {
        require(_rate > 0);
        rateEther = _rate;
        emit SetRateEther(_rate);
    }

    function setPause(bool _isPause) external override onlyOwner {
        isPause = _isPause;
        emit SetPause(_isPause);
    }

    /**
     * set bonus mapping
     * @param _ppcbReceive: token received
     * @param _bonusBasicPoint: percentage bonus (basic point)
     * example: 1000 (token_received) => 100 (basic point) (1%)
     */
    function setBonusMapping(uint256 _ppcbReceive, uint256 _bonusBasicPoint) external override onlyOwner {
        require(_ppcbReceive > 0, 'Invalid PPCB');
        require(_bonusBasicPoint > 0, 'Invalid bonus');
        bonusRates.set(_ppcbReceive, _bonusBasicPoint);
        emit SetBonusMapping(_ppcbReceive, _bonusBasicPoint);
    }

    function setWallet(address payable _wallet) external override onlyOwner {
        wallet = _wallet;
        emit SetWallet(_wallet);
    }

    /**
     * Buy by Ether
     * if buy validate success, transfer ether to wallet and transfer PPCB to user
     */
    function buyByEther() external payable override notPause{
        uint256 etherPay = msg.value;
        uint256 ppcbReceive = getTokenAmountEther(etherPay);
        require(ppcbReceive > 0, 'Amount be zero');
        require(ppcb.balanceOf(address(this)) >= ppcbReceive, 'Not enough PPCB');
        require(msg.sender.balance >= etherPay, 'Not enough balance');
        payable(wallet).transfer(etherPay);
        SafeERC20.safeTransfer(ppcb, msg.sender, ppcbReceive);
        emit BuyByEther(msg.sender, etherPay, ppcbReceive);
    }

    /**
     * Buy by USDT
     * if buy validate success, transfer USDT to wallet and transfer PPCB to user
     */
    function buyByUSDT(uint256 usdtAmount) external override notPause{
        uint256 ppcbReceive = getTokenAmountUSDT(usdtAmount);
        require(ppcbReceive > 0, 'Amount be zero');
        require(usdt.balanceOf(msg.sender) >= usdtAmount, 'Not enough USDT');
        require(ppcb.balanceOf(address(this)) >= ppcbReceive, 'Not enough PPCB');
        SafeERC20.safeTransferFrom(usdt, msg.sender, wallet, usdtAmount);
        SafeERC20.safeTransfer(ppcb, msg.sender, ppcbReceive);
        emit BuyByUSDT(msg.sender, usdtAmount, ppcbReceive);
    }

    /**
     * Deposit PPCB to ICO contract
     */
    function depositPPCB(uint256 _amount) external override {
        require(ppcb.balanceOf(msg.sender) >= _amount, 'Not enough PPCB');
        ppcb.safeTransferFrom(msg.sender, address(this), _amount);
        emit DepositPPCB(_amount);
    }

    /**
     * Withdraw USDT from ICO contract
     */
    function withdrawUSDT() external override onlyOwner {
        uint256 amount = usdt.balanceOf(address(this));
        require(amount > 0, 'Amount be zero');
        usdt.safeTransfer(wallet, amount);
        emit WithdrawUSDT(amount);
    }

    /**
     * Withdraw PPCB from ICO contract
     */
    function withdrawPPCB() external override onlyOwner {
        uint256 amount = ppcb.balanceOf(address(this));
        require(amount > 0, 'Amount be zero');
        ppcb.safeTransfer(wallet, amount);
        emit WithdrawPPCB(amount);
    }

    /**
     * Withdraw Ether from ICO contract
     */
    function withdrawEther() external payable override onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, 'Amount be zero');
        payable(wallet).transfer(amount);
        emit WithdrawEther(amount);
    }

    function getBonus(uint256 _ppcbReceive) public view returns(uint256) {
        uint256 bonus = 0;
        for(uint8 i = 0; i < bonusRates.length(); i++) {
            (uint256 k, uint256 v) = bonusRates.at(i);
            if(_ppcbReceive >= k) {
                bonus = v;
            }
        }
        return bonus;
    }

    function getTokenAmountEther(uint256 _etherPay) internal view returns(uint256) {
        uint256 tokenAmount = _etherPay * rateEther;
        uint256 bonus = tokenAmount * getBonus(tokenAmount) / 10_000;
        return tokenAmount + bonus;
    }

    function getTokenAmountUSDT(uint256 _usdtPay) internal view returns(uint256) {
        uint256 tokenAmount = _usdtPay * rateUSDT;
        uint256 bonus = tokenAmount * getBonus(tokenAmount) / 10_000;
        return tokenAmount + bonus;
    }
}