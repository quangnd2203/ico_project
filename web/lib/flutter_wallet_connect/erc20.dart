// ignore_for_file: library_private_types_in_public_api

@JS('window')
import 'package:js/js.dart';
import 'package:js/js_util.dart';


@JS()
@anonymous
class ContractParams {
  external factory ContractParams({
    required dynamic walletConnectProvider,
    required String contractAddress,
  });

  external dynamic get walletConnectProvider;
  external String get contractAddress;
}

@JS('ERC20')
class _ERC20{
  external _ERC20(ContractParams options);
  external dynamic get provider;
  external Future<void> init();
  external Future<void> importToken();
  external Future<dynamic> approve(String spender, num amount);
}

class ERC20 implements _ERC20{

  ERC20(ContractParams options) : instance = _ERC20(options);
  final _ERC20 instance;

    
  @override
  dynamic get provider => instance.provider;

  @override
  Future<dynamic> approve(String spender, num amount) {
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

}
