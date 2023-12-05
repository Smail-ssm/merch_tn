import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAdmins } from '../admins.model';
import { AdminsService } from '../service/admins.service';

export const adminsResolve = (route: ActivatedRouteSnapshot): Observable<null | IAdmins> => {
  const id = route.params['id'];
  if (id) {
    return inject(AdminsService)
      .find(id)
      .pipe(
        mergeMap((admins: HttpResponse<IAdmins>) => {
          if (admins.body) {
            return of(admins.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default adminsResolve;
