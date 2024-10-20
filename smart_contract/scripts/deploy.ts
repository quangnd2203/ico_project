import { ethers, hardhatArguments } from 'hardhat';
import * as config from './config';

async function main() {
    await config.initConfig();
    const network = hardhatArguments.network ?? 'dev';
    const [deployer] = await ethers.getSigners();
    console.log('Deploy from address: %s', deployer.address);

    // const peopleCoin = await ethers.deployContract('PeopleCoin');
    // const peopleCoinAddress = await peopleCoin.getAddress();
    // console.log('PeopleCoin address: %s', peopleCoinAddress);
    // config.setConfig(network + '.PeopleCoin', peopleCoinAddress);
    // await config.updateConfig();

    // const usdt = await ethers.deployContract('USDT');
    // const usdtAddress = await usdt.getAddress();
    // console.log('USDT address: %s', usdtAddress);
    // config.setConfig(network + '.USDT', usdtAddress);
    // await config.updateConfig();

    // const ico = await ethers.deployContract('ICO', [usdtAddress, peopleCoinAddress, 1000, 10000, deployer.address]);
    // const icoAddress = await ico.getAddress();
    // console.log('ICO address: %s', icoAddress);
    // config.setConfig(network + '.ICO', icoAddress);
    
    const faucet = await ethers.deployContract('Faucet');
    const faucetAddress = await faucet.getAddress();
    console.log('Faucet address: %s', faucetAddress);
    config.setConfig(network + '.Faucet', faucetAddress);
    await config.updateConfig();
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });