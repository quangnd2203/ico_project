// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

import '../../../blocs/application/application_cubit.dart';
import '../../../blocs/web3/web3_cubit.dart';
import '../../../resources/repository/purchase_packages_repository.dart';
import '../../../resources/resources.dart';

part 'purchase_packages_state.dart';

class PurchasePackagesCubit extends Cubit<PurchasePackagesState> {
  PurchasePackagesCubit() : super(PurchasePackagesInitial());

  final PurchasePackagesRepository repository = PurchasePackagesRepository();

  final Web3Cubit web3Cubit = GetIt.I<Web3Cubit>();

  Future<void> getPurchasePackages() async {
    GetIt.I<ApplicationCubit>().setLoading();
    final NetworkState<List<Map<String, dynamic>>> networkState = await repository.getAll();
    GetIt.I<ApplicationCubit>().setLoading(false);
    if (networkState.isSuccess) {
      emit(PurchasePackagesLoaded(networkState.data!));
    }
  }

  Future<void> buyByUSDT(num amount, BuildContext context) async {
    web3Cubit.buyByUSDT(amount, context);
  }

  Future<void> buyByEther(num amount, BuildContext context) async {
    web3Cubit.buyByEther(amount, context);
  }
}
