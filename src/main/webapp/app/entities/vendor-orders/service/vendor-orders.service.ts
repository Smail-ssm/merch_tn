import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IVendorOrders, NewVendorOrders } from '../vendor-orders.model';

export type PartialUpdateVendorOrders = Partial<IVendorOrders> & Pick<IVendorOrders, 'id'>;

export type EntityResponseType = HttpResponse<IVendorOrders>;
export type EntityArrayResponseType = HttpResponse<IVendorOrders[]>;

@Injectable({ providedIn: 'root' })
export class VendorOrdersService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/vendor-orders');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(vendorOrders: NewVendorOrders): Observable<EntityResponseType> {
    return this.http.post<IVendorOrders>(this.resourceUrl, vendorOrders, { observe: 'response' });
  }

  update(vendorOrders: IVendorOrders): Observable<EntityResponseType> {
    return this.http.put<IVendorOrders>(`${this.resourceUrl}/${this.getVendorOrdersIdentifier(vendorOrders)}`, vendorOrders, {
      observe: 'response',
    });
  }

  partialUpdate(vendorOrders: PartialUpdateVendorOrders): Observable<EntityResponseType> {
    return this.http.patch<IVendorOrders>(`${this.resourceUrl}/${this.getVendorOrdersIdentifier(vendorOrders)}`, vendorOrders, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVendorOrders>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVendorOrders[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getVendorOrdersIdentifier(vendorOrders: Pick<IVendorOrders, 'id'>): number {
    return vendorOrders.id;
  }

  compareVendorOrders(o1: Pick<IVendorOrders, 'id'> | null, o2: Pick<IVendorOrders, 'id'> | null): boolean {
    return o1 && o2 ? this.getVendorOrdersIdentifier(o1) === this.getVendorOrdersIdentifier(o2) : o1 === o2;
  }

  addVendorOrdersToCollectionIfMissing<Type extends Pick<IVendorOrders, 'id'>>(
    vendorOrdersCollection: Type[],
    ...vendorOrdersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const vendorOrders: Type[] = vendorOrdersToCheck.filter(isPresent);
    if (vendorOrders.length > 0) {
      const vendorOrdersCollectionIdentifiers = vendorOrdersCollection.map(
        vendorOrdersItem => this.getVendorOrdersIdentifier(vendorOrdersItem)!,
      );
      const vendorOrdersToAdd = vendorOrders.filter(vendorOrdersItem => {
        const vendorOrdersIdentifier = this.getVendorOrdersIdentifier(vendorOrdersItem);
        if (vendorOrdersCollectionIdentifiers.includes(vendorOrdersIdentifier)) {
          return false;
        }
        vendorOrdersCollectionIdentifiers.push(vendorOrdersIdentifier);
        return true;
      });
      return [...vendorOrdersToAdd, ...vendorOrdersCollection];
    }
    return vendorOrdersCollection;
  }
}
