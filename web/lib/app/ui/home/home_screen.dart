import 'package:flutter/material.dart';

import '../navigation/widget/app_navigation_bar.dart';
import '../ui.dart';
import 'widget/home_purchase_packages.dart';
import 'widget/top_background.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key, this.childPage});
  final String? childPage;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> with AppResponsiveScreen {
  ScrollController get scrollController => NavigationProvider.of(context).scrollController;
  @override
  void initState() {
    Future<void>.delayed(const Duration(milliseconds: 500), firstScroll);
    super.initState();
  }

  void firstScroll() {
    switch (widget.childPage) {
      case 'roadmap':
        scrollController.animateTo(
          scrollController.position.maxScrollExtent * 0.6,
          duration: const Duration(milliseconds: 500),
          curve: Curves.ease,
        );
        break;
      case 'team':
        scrollController.animateTo(
          scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 500),
          curve: Curves.ease,
        );
        break;
      default:
        scrollController.animateTo(
          scrollController.position.minScrollExtent,
          duration: const Duration(milliseconds: 500),
          curve: Curves.ease,
        );
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return buildResponsiveScreen(context);
  }

  @override
  Widget buildDesktop(BuildContext context) {
    return const SizedBox(
      width: double.infinity,
      child: Column(
        children: <Widget>[
          TopBackground(
            isDynamicHeigh: true,
            child: Column(
              children: <Widget>[
                AppNavigationBar(),
                SizedBox(
                  height: 16,
                ),
                HomePurchasePackages(),
              ],
            ),
          ),
          // SizedBox(
          //   height: 16,
          // ),
          // TopBackground(
          //   showBlur: false,
          //   child: HomePresaleBoard(),
          // ),
        ],
      ),
    );
  }

  @override
  Widget buildMobile(BuildContext context) {
    return const SizedBox(
      width: double.infinity,
      child: Column(
        children: <Widget>[
          TopBackground(
            isDynamicHeigh: true,
            child: Column(
              children: <Widget>[
                AppNavigationBar(),
                SizedBox(
                  height: 8,
                ),
                HomePurchasePackages(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget buildTablet(BuildContext context) {
    return buildDesktop(context);
  }
}
