import 'package:flutter/material.dart';

import '../../../generated/l10n.dart';
import '../../constants/constants.dart';

class LoadMoreEmpty extends StatelessWidget {
  const LoadMoreEmpty({super.key, this.fromHome = false, this.title, this.onRefresh});
  final bool fromHome;
  final String? title;
  final VoidCallback? onRefresh;

  @override
  Widget build(BuildContext context) {
    return fromHome ? noDataWidget(context) : SizedBox(height: MediaQuery.of(context).size.height * 0.6, child: noDataWidget(context));
  }

  Padding noDataWidget(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(MediaQuery.of(context).size.height * 0.025),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              title ?? S.current.no_data_found,
              textAlign: TextAlign.center,
              style: AppTextStyles.getLgStyle(AppTextStyles.regular),
            ),
            const SizedBox(height: 20),
            if(onRefresh != null)
              InkWell(
                onTap: onRefresh,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Icon(
                      Icons.refresh,
                      color: Theme.of(context).primaryColor,
                    ),
                    Text(
                      S.current.refresh,
                      textAlign: TextAlign.center,
                      style: AppTextStyles.getLgStyle(AppTextStyles.regular),
                    ),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
