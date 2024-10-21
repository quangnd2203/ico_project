
import 'package:flutter/material.dart';
import 'package:flutter_app/app/blocs/application/application_cubit.dart';
import 'package:get_it/get_it.dart';

import '../../blocs/web3/web3_cubit.dart';
import '../../constants/constants.dart';
import '../navigation/widget/app_navigation_bar.dart';
import '../ui.dart';
import 'bloc/purchase_packages_cubit.dart';
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
    return SizedBox(
      width: double.infinity,
      child: Column(
        children: <Widget>[
          TopBackground(
            isDynamicHeigh: true,
            child: Column(
              children: <Widget>[
                const AppNavigationBar(),
                const SizedBox(
                  height: 16,
                ),
                buildImportTokens(),
                const SizedBox(
                  height: 16,
                ),
                const HomePurchasePackages(),
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
    return SizedBox(
      width: double.infinity,
      child: Column(
        children: <Widget>[
          TopBackground(
            isDynamicHeigh: true,
            child: Column(
              children: <Widget>[
                const AppNavigationBar(),
                const SizedBox(
                  height: 8,
                ),
                buildImportTokens(),
                const SizedBox(
                  height: 8,
                ),
                const HomePurchasePackages(),
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

  Widget buildImportTokens() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        CustomOutlinedButton(
          title: 'Import Tokens',
          action: () async {
            if(GetIt.I<Web3Cubit>().state is Web3Connected){
              (await GetIt.I<Web3Cubit>().walletConnect.usdtSmartContract()).importTokenToWallet();
              (await GetIt.I<Web3Cubit>().walletConnect.ppcbSmartContract()).importTokenToWallet();
            }else{
              GetIt.I<ApplicationCubit>().notification(context, title: 'Please connect wallet first');
            }
          },
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 10),
          radius: 10,
          backgroundColor: AppColors.primary,
          borderColor: AppColors.primary,
          textColor: AppColors.white,
          textStyle: AppTextStyles.getBaseStyle(AppTextStyles.medium),
        ), 
        const SizedBox(width: 16),
        CustomOutlinedButton(
          title: 'Faucet',
          action: () async {
            if(GetIt.I<Web3Cubit>().state is Web3Connected){
              GetIt.I<PurchasePackagesCubit>().faucet(context);
            }else{
              GetIt.I<ApplicationCubit>().notification(context, title: 'Please connect wallet first');
            }
          },
          padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 10),
          radius: 10,
          backgroundColor: AppColors.warring,
          borderColor: AppColors.warring,
          textColor: AppColors.white,
          textStyle: AppTextStyles.getBaseStyle(AppTextStyles.medium),
        )
      ],
    );
  }
}
