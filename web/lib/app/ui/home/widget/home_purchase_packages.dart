// ignore_for_file: avoid_dynamic_calls

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

import '../../../app.dart';
import '../../../constants/app_colors.dart';
import '../../../constants/app_images.dart';
import '../../../constants/app_text_styles.dart';
import '../../../constants/app_values.dart';
import '../../ui.dart';
import '../../widgets/app_responsive_screen.dart';
import '../../widgets/custom_outline_button.dart';
import 'bloc/purchase_packages_cubit.dart';
import 'home_banner_icon_animation.dart';

const List<Map<String, dynamic>> RAW = <Map<String, dynamic>>[
  <String, dynamic>{
    "id": "66bc7638081bc4883dfa57f1",
    "name": "BNB PACKAGE 01",
    "value": 0.1,
    "tokenReceive": 1000,
    "bonus": null,
    "type": "BNB",
    "createdAt": "2024-08-14T09:17:44.046Z",
    "updatedAt": "2024-08-14T09:19:18.093Z"
  },
  <String, dynamic>{
    "id": "66bc764a081bc4883dfa57f5",
    "name": "BNB PACKAGE 02",
    "value": 0.2,
    "tokenReceive": 2000,
    "bonus": 0.1,
    "type": "BNB",
    "createdAt": "2024-08-14T09:18:02.175Z",
    "updatedAt": "2024-08-14T09:19:24.859Z"
  },
  <String, dynamic>{
    "id": "66bc765b081bc4883dfa57fa",
    "name": "BNB PACKAGE 03",
    "value": 0.3,
    "tokenReceive": 3000,
    "bonus": 0.2,
    "type": "BNB",
    "createdAt": "2024-08-14T09:18:19.837Z",
    "updatedAt": "2024-08-14T09:19:28.902Z"
  },
  <String, dynamic>{
    "id": "66bc765b081bc4883dfa57fa",
    "name": "BNB PACKAGE 04",
    "value": 0.4,
    "tokenReceive": 4000,
    "bonus": 0.3,
    "type": "BNB",
    "createdAt": "2024-08-14T09:18:19.837Z",
    "updatedAt": "2024-08-14T09:19:28.902Z"
  },
  <String, dynamic>{
    "id": "66bc76c26292f4b0f0de7442",
    "name": "USDT PACKAGE 01",
    "value": 10,
    "tokenReceive": 1000,
    "bonus": null,
    "type": "USDT",
    "createdAt": "2024-08-14T09:20:02.898Z",
    "updatedAt": "2024-08-14T09:20:02.898Z"
  },
  <String, dynamic>{
    "id": "66bc76d06292f4b0f0de7446",
    "name": "USDT PACKAGE 02",
    "value": 20,
    "tokenReceive": 2000,
    "bonus": 0.1,
    "type": "USDT",
    "createdAt": "2024-08-14T09:20:16.455Z",
    "updatedAt": "2024-08-14T09:20:16.455Z"
  },
  <String, dynamic>{
    "id": "66bc76e36292f4b0f0de744a",
    "name": "USDT PACKAGE 03",
    "value": 30,
    "tokenReceive": 3000,
    "bonus": 0.2,
    "type": "USDT",
    "createdAt": "2024-08-14T09:20:35.157Z",
    "updatedAt": "2024-08-14T09:20:35.157Z"
  },
  <String, dynamic>{
    "id": "66bc765b081bc4883dfa57fa",
    "name": "USDT PACKAGE 04",
    "value": 40,
    "tokenReceive": 4000,
    "bonus": 0.3,
    "type": "USDT",
    "createdAt": "2024-08-14T09:18:19.837Z",
    "updatedAt": "2024-08-14T09:19:28.902Z"
  },
];

class HomePurchasePackages extends StatefulWidget {
  const HomePurchasePackages({super.key});

  @override
  State<HomePurchasePackages> createState() => _HomePurchasePackagesState();
}

class _HomePurchasePackagesState extends State<HomePurchasePackages> with AppResponsiveScreen {
  @override
  void initState() {
    if (!GetIt.I.isRegistered<PurchasePackagesCubit>()) {
      GetIt.I.registerSingleton(PurchasePackagesCubit());
    }
    _purchasePackagesCubit.getPurchasePackages();
    super.initState();
  }

  late final PurchasePackagesCubit _purchasePackagesCubit = GetIt.I<PurchasePackagesCubit>();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width - 100,
      child: Stack(
        children: [
          Positioned(
            top: 200,
            right: 0,
            child: HomeBannerIconAnimation(
              direction: Axis.vertical,
              speedRange: 100,
              duration: const Duration(seconds: 15),
              child: Image.asset(
                AppImages.png('features_shape02'),
                fit: BoxFit.fitHeight,
              ),
            ),
          ),
          Positioned(
            top: 0,
            left: 300,
            child: HomeBannerIconAnimation(
              speedRange: 150,
              duration: const Duration(seconds: 15),
              child: Image.asset(
                AppImages.png('features_shape02'),
                fit: BoxFit.fitHeight,
                width: 200,
              ),
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            child: HomeBannerIconAnimation(
              speedRange: -150,
              duration: const Duration(seconds: 15),
              child: Image.asset(
                AppImages.png('features_shape02'),
                fit: BoxFit.fitHeight,
                width: 400,
              ),
            ),
          ),
          Center(
            child: buildResponsiveScreen(context),
          ),
        ],
      ),
    );
  }

  Widget buildItem(Map<String, dynamic> item) {
    final String background = item['type'] == 'BNB' ? AppImages.png('bnb_bg') : AppImages.png('usdt_bg');
    final String icon = item['type'] == 'BNB' ? AppImages.png('bnb_icon') : AppImages.png('usdt_icon');
    return Container(
      width: 250,
      height: 350,
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: AppColors.black.withOpacity(0.5),
        border: Border.all(color: AppColors.warring.shade100, width: 1.5),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        children: <Widget>[
          SizedBox(
            height: 170,
            child: Stack(
              alignment: Alignment.bottomCenter,
              children: <Widget>[
                Align(
                  alignment: Alignment.topCenter,
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Image.asset(
                      background,
                      width: MediaQuery.of(context).size.width,
                      height: 120,
                      fit: BoxFit.fill,
                    ),
                  ),
                ),
                if (item['type'] == 'BNB')
                  Image.asset(
                    icon,
                    width: 85,
                    height: 85,
                    fit: BoxFit.fill,
                  )
                else
                  Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: CircleAvatar(
                      radius: 36,
                      backgroundColor: AppColors.warring.shade300,
                      child: Padding(
                        padding: const EdgeInsets.all(2.0),
                        child: Image.asset(
                          icon,
                          fit: BoxFit.fill,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
          ),
          Text(
            item['name'].toString(),
            style: AppTextStyles.getBaseStyle(AppTextStyles.bold).copyWith(color: AppColors.white),
          ),
          const Spacer(),
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(4),
              border: Border.all(color: AppColors.gray.shade400, width: 1.5),
            ),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: Text(
              '${item['tokenReceive']} PPCB${item['bonus'] != null ? ' + ${item['bonus'] * 100}%' : ''}',
              style: AppTextStyles.getXsStyle(AppTextStyles.bold).copyWith(color: AppColors.gray.shade300),
            ),
          ),
          const Spacer(),
          CustomOutlinedButton(
            title: 'BUY NOW (${item['value']} ${item['type']})',
            action: () {},
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 4),
            radius: 10,
            backgroundColor: AppColors.warring.shade300,
            borderColor: AppColors.primary,
            textColor: AppColors.black,
            textStyle: AppTextStyles.getSmStyle(AppTextStyles.bold),
          )
        ],
      ),
    );
  }

  @override
  Widget buildDesktop(BuildContext context) {
    return Container(
      width: DESKTOP_PAGE_MAX_WIDTH,
      height: MediaQuery.of(context).size.height - 16,
      padding: const EdgeInsets.all(16),
      child: BlocBuilder<PurchasePackagesCubit, PurchasePackagesState>(
        bloc: _purchasePackagesCubit,
        builder: (BuildContext context, PurchasePackagesState state) {
          if (state.data.isEmpty) {
            return const LoadMoreEmpty();
          }
          return GridView.count(
            crossAxisCount: 4,
            childAspectRatio: 3 / 3.7,
            mainAxisSpacing: 16,
            crossAxisSpacing: 16,
            shrinkWrap: true,
            children: List<Widget>.generate(
              state.data.length,
              (int index) => buildItem(state.data[index]),
            ),
          );
        },
      ),
    );
  }

  @override
  Widget buildMobile(BuildContext context) {
    return Container(
      width: MOBILE_PAGE_MAX_WIDTH,
      padding: const EdgeInsets.all(16),
      child: BlocBuilder<PurchasePackagesCubit, PurchasePackagesState>(
        bloc: _purchasePackagesCubit,
        builder: (BuildContext context, PurchasePackagesState state) {
          if (state.data.isEmpty) {
            return const LoadMoreEmpty();
          }
          return Column(
            children: List<Widget>.generate(
              state.data.length,
              (int index) => Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: buildItem(state.data[index]),
              ),
            ),
          );
        },
      ),
    );
  }

  @override
  Widget buildTablet(BuildContext context) {
    return Container(
      width: TABLET_PAGE_MAX_WIDTH,
      padding: const EdgeInsets.all(16),
      child: BlocBuilder<PurchasePackagesCubit, PurchasePackagesState>(
        bloc: _purchasePackagesCubit,
        builder: (BuildContext context, PurchasePackagesState state) {
          if (state.data.isEmpty) {
            return const LoadMoreEmpty();
          }
          return GridView.count(
            crossAxisCount: 4,
            childAspectRatio: 3 / 4.5,
            mainAxisSpacing: 8,
            crossAxisSpacing: 8,
            shrinkWrap: true,
            children: List<Widget>.generate(
              state.data.length,
              (int index) => buildItem(state.data[index]),
            ),
          );
        },
      ),
    );
  }
}
