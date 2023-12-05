import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IVendorOrders } from '../vendor-orders.model';
import { VendorOrdersService } from '../service/vendor-orders.service';

export const vendorOrdersResolve = (route: ActivatedRouteSnapshot): Observable<null | IVendorOrders> => {
  const id = route.params['id'];
  if (id) {
    return inject(VendorOrdersService)
      .find(id)
      .pipe(
        mergeMap((vendorOrders: HttpResponse<IVendorOrders>) => {
          if (vendorOrders.body) {
            return of(vendorOrders.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default vendorOrdersResolve;
