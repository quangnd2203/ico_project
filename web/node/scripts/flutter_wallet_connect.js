const { createWeb3Modal, defaultConfig } = require('@web3modal/ethers');
const { BrowserProvider, Contract, formatUnits } = require('ethers');
const ICO = require('./ico.js');
const ERC20 = require('./erc20.js');

FlutterWalletConnect = function ({ projectId, metadata, chains }) {
    const config = defaultConfig({
        metadata,
        enableInjected: false
    });

    this.web3Modal = createWeb3Modal({
        projectId: projectId,
        ethersConfig: config,
        chains: chains,
    });

    this.connect = async function () {
        return this.web3Modal.open('Connect');
    }

    this.disconnect = function () {
        return this.web3Modal.disconnect();
    }

    this.getAccounts = async function () {
        return this.web3Modal.getAddress();
    }

    this.getChainId = function () {
        return this.web3Modal.getChainId();
    }

    this.isConnected = function () {
        return this.web3Modal.getIsConnected();
    }

    this.subscribeWalletInfo = function (callback) {
        this.web3Modal.subscribeWalletInfo(callback);
    }

    this.subscribeProvider = function (callback) {
        this.web3Modal.subscribeProvider(callback);
    }

    this.subscribeState = function (callback) {
        this.web3Modal.subscribeState(callback);
    }

    this.switchNetwork = async function (chainId) {
        return this.web3Modal.switchNetwork(chainId);
    }

    this.closeModal = async function () {
        return this.web3Modal.close();
    }

    this.openModal = async function (view) {
        return this.web3Modal.open({ view: view });
    }

    this.getState = function () {
        return this.web3Modal.getState();
    }

    this.getProvider = async function () {
        return this.web3Modal.getWalletProvider();
    }

    this.icoSmartContract = async function () {
        const provider = await this.getProvider();
        const ico = new ICO({
            walletConnectProvider: provider,
            contractAddress: '0x80e2dDD5fB4acB62755e1eD645bB8819029b0766',
        });
        await ico.init();
        return ico;
    }

    this.usdtSmartContract = async function () {
        const provider = await this.getProvider();
        const usdt = new ERC20({
            walletConnectProvider: provider,
            contractAddress: '0xc4a0879BBFbC7f557De9cfB4ACB2Dbf6441188BC',
        });
        await usdt.init();
        return usdt;
    }

    this.ppcbSmartContract = async function () {
        const provider = await this.getProvider();
        const ppcb = new ERC20({
            walletConnectProvider: provider,
            contractAddress: '0xbe9469fA5Ad0e37aD74Be8F71e3C661e94E61882',
        });
        await ppcb.init();
        return ppcb;
    }
}

window.FlutterWalletConnect = FlutterWalletConnect;