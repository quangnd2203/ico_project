import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

import '../../../../blocs/application/application_cubit.dart';
import '../../../../resources/repository/purchase_packages_repository.dart';
import '../../../../resources/resources.dart';

part 'purchase_packages_state.dart';

class PurchasePackagesCubit extends Cubit<PurchasePackagesState> {
  PurchasePackagesCubit() : super(PurchasePackagesInitial());

  final PurchasePackagesRepository repository = PurchasePackagesRepository();

  Future<void> getPurchasePackages() async {
    GetIt.I<ApplicationCubit>().setLoading();
    final NetworkState<List<Map<String, dynamic>>> networkState = await repository.getAll();
    GetIt.I<ApplicationCubit>().setLoading(false);
    if (networkState.isSuccess) {
      emit(PurchasePackagesLoaded(networkState.data!));
    }
  }
}
