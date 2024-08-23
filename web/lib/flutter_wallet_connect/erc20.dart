// ignore_for_file: library_private_types_in_public_api
part of 'flutter_wallet_connect.dart';

@JS()
@anonymous
class ContractOptions{
    external factory ContractOptions({
    required dynamic walletConnectProvider,
    required String contractAddress,
  });

  external dynamic get walletConnectProvider;
  external String get contractAddress;
}

@JS('ERC20')
@anonymous
class _ERC20 {
  external _ERC20(ContractOptions options);

  external dynamic get provide;

  external Future<void> init();

  external Future<dynamic> approve(String spender, String amount);

  external Future<void> importToken();
}

class ERC20 implements _ERC20 {
  ERC20(ContractOptions options) : instance = _ERC20(options);

  final _ERC20 instance;

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
