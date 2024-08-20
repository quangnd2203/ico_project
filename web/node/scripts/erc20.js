const { BrowserProvider, Contract, formatUnits } = require('ethers');
const erc20ABI = require('../abi/erc20.json');

ERC20 = function({walletConnectProvider, contractAddress}){
    this.provider = new BrowserProvider(walletConnectProvider);
    this.signer = this.provider.getSigner();
    this.contract = new Contract(contractAddress, erc20ABI, this.signer);

    this.buyByUSDT = async function(amount){
        this.contract.buyByUSDT(formatUnits(amount, 'ether'));
    }

    this.buyByEther = async function(amount){
        return this.contract.buyByEther({value: formatUnits(amount, 'ether')});
    }
}