part of 'purchase_packages_cubit.dart';

sealed class PurchasePackagesState {
  PurchasePackagesState({required this.data});

  final List<Map<String, dynamic>> data;  
}

final class PurchasePackagesInitial extends PurchasePackagesState {
  PurchasePackagesInitial() : super(data: <Map<String, dynamic>>[]);
}

final class PurchasePackagesLoaded extends PurchasePackagesState {
  PurchasePackagesLoaded(List<Map<String, dynamic>> data) : super(data: data);
}
