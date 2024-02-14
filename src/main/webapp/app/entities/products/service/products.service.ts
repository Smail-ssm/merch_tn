import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProducts, NewProducts } from '../products.model';

export type PartialUpdateProducts = Partial<IProducts> & Pick<IProducts, 'id'>;

type RestOf<T extends IProducts | NewProducts> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type RestProducts = RestOf<IProducts>;

export type NewRestProducts = RestOf<NewProducts>;

export type PartialUpdateRestProducts = RestOf<PartialUpdateProducts>;

export type EntityResponseType = HttpResponse<IProducts>;
export type EntityArrayResponseType = HttpResponse<IProducts[]>;

@Injectable({ providedIn: 'root' })
export class ProductsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/products');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(products: NewProducts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(products);
    return this.http
      .post<RestProducts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(products: IProducts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(products);
    return this.http
      .put<RestProducts>(`${this.resourceUrl}/${this.getProductsIdentifier(products)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(products: PartialUpdateProducts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(products);
    return this.http
      .patch<RestProducts>(`${this.resourceUrl}/${this.getProductsIdentifier(products)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestProducts>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }
  findByUser(id: number): Observable<any> {
    return this.http
      .get<RestProducts>(`${this.resourceUrl}/user/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestProducts[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProductsIdentifier(products: Pick<IProducts, 'id'>): number {
    return products.id;
  }

  compareProducts(o1: Pick<IProducts, 'id'> | null, o2: Pick<IProducts, 'id'> | null): boolean {
    return o1 && o2 ? this.getProductsIdentifier(o1) === this.getProductsIdentifier(o2) : o1 === o2;
  }

  addProductsToCollectionIfMissing<Type extends Pick<IProducts, 'id'>>(
    productsCollection: Type[],
    ...productsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const products: Type[] = productsToCheck.filter(isPresent);
    if (products.length > 0) {
      const productsCollectionIdentifiers = productsCollection.map(productsItem => this.getProductsIdentifier(productsItem)!);
      const productsToAdd = products.filter(productsItem => {
        const productsIdentifier = this.getProductsIdentifier(productsItem);
        if (productsCollectionIdentifiers.includes(productsIdentifier)) {
          return false;
        }
        productsCollectionIdentifiers.push(productsIdentifier);
        return true;
      });
      return [...productsToAdd, ...productsCollection];
    }
    return productsCollection;
  }

  protected convertDateFromClient<T extends IProducts | NewProducts | PartialUpdateProducts>(products: T): RestOf<T> {
    return {
      ...products,
      createdAt: products.createdAt?.toJSON() ?? null,
      updatedAt: products.updatedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restProducts: RestProducts): IProducts {
    return {
      ...restProducts,
      createdAt: restProducts.createdAt ? dayjs(restProducts.createdAt) : undefined,
      updatedAt: restProducts.updatedAt ? dayjs(restProducts.updatedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestProducts>): HttpResponse<IProducts> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestProducts[]>): HttpResponse<IProducts[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
