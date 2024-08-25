// ignore_for_file: library_private_types_in_public_api
part of 'flutter_wallet_connect.dart';

@JS()
@anonymous
class ICO{
    
  external dynamic get provide;

  external Future<void> init();

  external Future<dynamic> buyByUSDT(String amount);

  external Future<dynamic> buyByEther(String amount);
}

class ICOImp implements ICO {
  ICOImp(this.instance);

  final ICO instance;

  @override
  Future<dynamic> buyByEther(String amount) {
    return promiseToFuture<dynamic>(instance.buyByEther(amount));
  }

  @override
  Future<dynamic> buyByUSDT(String amount) {
    return promiseToFuture<dynamic>(instance.buyByUSDT(amount));
  }

  @override
  Future<void> init() {
    return promiseToFuture<void>(instance.init());
  }

  @override
  get provide => instance.provide;
}
