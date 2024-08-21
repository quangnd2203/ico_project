const { BrowserProvider, Contract, formatUnits } = require('ethers');
const erc20ABI = require('../abi/erc20.json');

ERC20 = function({walletConnectProvider, contractAddress}){
    this.provider = new BrowserProvider(walletConnectProvider);
    this.signer = this.provider.getSigner();
    this.contract = new Contract(contractAddress, erc20ABI, this.signer);

    this.importTokenToWallet = async function(){
        ethersProvider.send('wallet_watchAsset', {
            type: 'ERC20',
            options: {
                address: contractAddress,
            },
        })
    }

    this.approve = async function(spender, amount){
        return await this.contract.approve(spender, formatUnits(amount, 'ether'));
    }
}

window.ERC20 = ERC20;