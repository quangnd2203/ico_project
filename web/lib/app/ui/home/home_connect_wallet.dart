import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

import '../../../generated/l10n.dart';
import '../../blocs/web3/web3_cubit.dart';
import '../../constants/app_colors.dart';
import '../../constants/app_text_styles.dart';
import '../widgets/custom_outline_button.dart';
import 'bloc/pre_sale_cubit.dart';

class HomeConnectWallet extends StatefulWidget {
  const HomeConnectWallet({super.key});

  @override
  State<HomeConnectWallet> createState() => _HomeConnectWalletState();
}

class _HomeConnectWalletState extends State<HomeConnectWallet> {
  @override
  void initState() {
    if (!GetIt.I.isRegistered<PreSaleCubit>()) {
      GetIt.I.registerSingleton(PreSaleCubit());
    }
    super.initState();
  }

  late final PreSaleCubit _preSaleCubit = GetIt.I<PreSaleCubit>();

  @override
  Widget build(BuildContext context) {
    return BlocListener<Web3Cubit, Web3State>(
      bloc: GetIt.I<Web3Cubit>(),
      listener: (BuildContext context, Web3State state) {
        if (state is Web3Connected) {
          _preSaleCubit.emit(PreSaleConnected(state.account));
        } else {
          _preSaleCubit.emit(const PreSaleInitial());
        }
      },
      child: BlocBuilder<PreSaleCubit, PreSaleState>(
        bloc: _preSaleCubit,
        builder: (BuildContext context, PreSaleState state) {
          return Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: <Widget>[
              if (state is PreSaleConnected)
                Text(state.address!, style: AppTextStyles.getBaseStyle(AppTextStyles.bold))
              else
                CustomOutlinedButton(
                  title: S.current.presale_component_connenct.toUpperCase(),
                  action: () {
                    _preSaleCubit.connect();
                    // if (state is! PreSaleInitial)
                    //   _preSaleCubit.buy(context);
                    // else
                  },
                  padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 10),
                  radius: 10,
                  backgroundColor: AppColors.primary,
                  borderColor: AppColors.primary,
                  textColor: AppColors.white,
                  textStyle: AppTextStyles.getBaseStyle(AppTextStyles.medium),
                ),
            ],
          );
        },
      ),
    );
  }
}
