
import 'package:flutter/material.dart';
import 'package:url_strategy/url_strategy.dart';
import 'package:flutter/services.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:logger/logger.dart';

import 'app/app.dart';
import 'app/constants/constants.dart';
import 'app/resources/service/wifi_service.dart';
import 'app/utils/utils.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  setPathUrlStrategy();
  WidgetsFlutterBinding.ensureInitialized();
  initializeDateFormatting('en');
  initializeDateFormatting('vi');
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual, overlays: <SystemUiOverlay>[SystemUiOverlay.top]);
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    systemNavigationBarColor: Colors.transparent,
    systemNavigationBarContrastEnforced: true,
  ));
  await SystemChrome.setPreferredOrientations(<DeviceOrientation>[DeviceOrientation.portraitUp]);
  flavor = const String.fromEnvironment('FLAVOR', defaultValue: 'dev');
  await AppPrefs.initListener();
  await dotenv.load();
  Logger().d('RUNNING IN $flavor ENVIRONMENT'.toUpperCase());
  WifiService();
  runApp(const App());
}
