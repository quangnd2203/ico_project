const { BrowserProvider, Contract, ethers } = require('ethers');
const icoABI = require('../abi/ico.json');

ICO = function({walletConnectProvider, contractAddress}){
    this.provider = new BrowserProvider(walletConnectProvider);

    this.init = async function(){
        this.signer = await this.provider.getSigner();
        this.contract = new Contract(contractAddress, icoABI, this.signer);
    }

    this.buyByUSDT = async function(amount){

        return this.contract.buyByUSDT(ethers.parseUnits(amount, 'ether'), {gasLimit: 100000,});
    }

    this.buyByEther = async function(amount){
        return this.contract.buyByEther({value: ethers.parseUnits(amount, 'ether')});
    }
}

module.exports = ICO;