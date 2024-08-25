// ignore_for_file: library_private_types_in_public_api
part of 'flutter_wallet_connect.dart';

// @JS()
// @anonymous
// class ContractOptions{
//     external factory ContractOptions({
//     required dynamic walletConnectProvider,
//     required String contractAddress,
//   });

//   external dynamic get walletConnectProvider;
//   external String get contractAddress;
// }

@JS()
@anonymous
class ERC20 {

  external dynamic get provide;

  external Future<void> init();

  external Future<dynamic> approve(String spender, String amount);

  external Future<void> importToken();
}

class ERC20Imp implements ERC20 {
  ERC20Imp(this.instance);

  final ERC20 instance;

  @override
  Future<dynamic> approve(String spender, String amount) {
    return promiseToFuture<dynamic>(instance.approve(spender, amount));
  }

  @override
  Future<void> importToken() {
    return promiseToFuture<void>(instance.importToken());
  }

  @override
  Future<void> init() {
    return promiseToFuture<void>(instance.init());

  }

  @override
  get provide => instance.provide;
}
