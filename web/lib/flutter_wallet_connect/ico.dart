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
