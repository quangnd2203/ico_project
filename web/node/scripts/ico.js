const { BrowserProvider, Contract, formatUnits } = require('ethers');
const icoABI = require('../abi/ico.json');

ICO = function({walletConnectProvider, contractAddress}){
    this.provider = new BrowserProvider(walletConnectProvider);
    this.signer = this.provider.getSigner();
    this.contract = new Contract(contractAddress, icoABI, this.signer);

    this.buyByUSDT = async function(amount){
        return await this.contract.buyByUSDT(formatUnits(amount, 'ether'));
    }

    this.buyByEther = async function(amount){
        return await this.contract.buyByEther({value: formatUnits(amount, 'ether')});
    }
}

window.ICO = ICO;