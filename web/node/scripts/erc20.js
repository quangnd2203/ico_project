const { BrowserProvider, Contract, formatUnits, ethers } = require('ethers');
const erc20ABI = require('../abi/erc20.json');

ERC20 = function({walletConnectProvider, contractAddress}){
    this.provider = new BrowserProvider(walletConnectProvider);
    
    this.init = async function(){
        this.signer = await this.provider.getSigner();
        this.contract = new Contract(contractAddress, erc20ABI, this.signer);
    }

    this.importTokenToWallet = async function(){
        this.provider.send('wallet_watchAsset', {
            type: 'ERC20',
            options: {
                address: contractAddress,
            },
        })
    }

    this.approve = async function(spender, amount){
        return this.contract.approve(spender, ethers.parseUnits(amount, 'ether'));
    }
}

window.ERC20 = ERC20;

module.exports = ERC20;