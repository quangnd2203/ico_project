const { BrowserProvider, Contract, formatUnits } = require('ethers');
const icoABI = require('../abi/ico.json');

ICOContract = function({walletConnectProvider, contractAddress}){
    this.provider = new BrowserProvider(walletConnectProvider);
    this.signer = this.provider.getSigner();
    this.contract = new Contract(contractAddress, abi, this.signer);

    this.buyByUSDT = async function(amount){
        return this.contract.buyByUSDT(formatUnits(amount, 'ether'));
    }

    this.buyByEther = async function(amount){
        return this.contract.buyByEther({value: formatUnits(amount, 'ether')});
    }
}