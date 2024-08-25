
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:logger/logger.dart';
import 'package:js/js.dart';
import 'package:js/js_util.dart';
// import 'package:flutter_web3/flutter_web3.dart';

import '../../../flutter_wallet_connect/flutter_wallet_connect.dart';
import '../../constants/constants.dart';
import '../application/application_cubit.dart';

part 'web3_state.dart';

class Web3Cubit extends Cubit<Web3State> {
  Web3Cubit() : super(const Web3Initial()) {
    walletConnect = FlutterWalletConnect(FlutterWalletConnectOptions(
      projectId: 'c36bf582b97350dd8130834ceb358c39',
      metadata: WalletConnectMetadata(
        name: 'PPCB',
        description: 'PPCB',
        url: 'https://ppcb.io',
        icons: <String>['https://avatars.githubusercontent.com/u/37784886'],
      ),
      chains: <NetworkChain>[chain],
    ));
    walletConnect.subscribeWalletInfo(onWalletInfo);
    walletConnect.subscribeProvider(onProvider);
    walletConnect.subscribeState(onWeb3ModalState);
  }
  late final FlutterWalletConnect walletConnect;

  final Logger logger = Logger();

  NetworkChain get chain {
    if (flavor == 'dev') {
      return NetworkChain.bscTest();
    }
    return NetworkChain.bsc();
  }

  Future<void> connect() async {
    await Future<dynamic>.delayed(const Duration(milliseconds: 100));
    await walletConnect.connect();
  }

  Future<void> getAccount() async {
    final String? accounts = await walletConnect.getAccounts();
    if (accounts != null) {
      emit(Web3Connected(account: accounts));
    }
  }

  Future<void> onWalletInfo(ConnectWalletInfo? walletInfo) async {
    logger.d('onWalletInfo: ${<String, dynamic>{
      'name': walletInfo?.name,
      'icon': walletInfo?.icon,
    }}');
    if (walletInfo == null) {
      walletConnect.disconnect();
      emit(const Web3Initial());
    }else{
      await getAccount();
    }
  }

  Future<void> onProvider(EthersStoreState? ethersStoreState) async {
    logger.d('onWeb3Provider: ${<String, dynamic>{
      'provider': ethersStoreState?.provider,
      'providerType': ethersStoreState?.providerType,
      'address': ethersStoreState?.address,
      'chainId': ethersStoreState?.chainId,
      'error': ethersStoreState?.error,
      'isConnected': ethersStoreState?.isConnected,
    }}');
    if (ethersStoreState?.isConnected ?? false) {
      await getAccount();
    }
  }

  Future<void> onWeb3ModalState(Web3ModalState? web3ModalState) async {
    logger.d('onWeb3ModalState: ${<String, Object?>{
      'loading': web3ModalState?.loading,
      'open': web3ModalState?.open,
      'selectedNetworkId': web3ModalState?.selectedNetworkId,
    }}');
  }

  Future<void> buyByUSDT(num amount) async {
    final ERC20 usdt = await walletConnect.usdtSmartContract();
    final ICO ico = await walletConnect.icoSmartContract();
    try{
      GetIt.I<ApplicationCubit>().setLoading(true);
      final dynamic approveTx = await usdt.approve('0x80e2dDD5fB4acB62755e1eD645bB8819029b0766', amount.toString());
      await Future.delayed(const Duration(seconds: 5));
      final dynamic buyTx = await ico.buyByUSDT(amount.toString());
      GetIt.I<ApplicationCubit>().setLoading(false);
    }catch(e){
      GetIt.I<ApplicationCubit>().setLoading(false);
      logger.e('buy error: $e');
    }
  }

    Future<void> buyByEther(num amount) async {
    final ICO ico = await walletConnect.icoSmartContract();
    try{
      GetIt.I<ApplicationCubit>().setLoading();
      final dynamic buyTx = await ico.buyByEther(amount.toString());
      GetIt.I<ApplicationCubit>().setLoading(false);
    }catch(e){
      GetIt.I<ApplicationCubit>().setLoading(false);
      logger.e('buy error: $e');
    }
  }
}
