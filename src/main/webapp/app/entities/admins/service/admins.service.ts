import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IAdmins, NewAdmins } from '../admins.model';

export type PartialUpdateAdmins = Partial<IAdmins> & Pick<IAdmins, 'id'>;

type RestOf<T extends IAdmins | NewAdmins> = Omit<T, 'createdat' | 'updatedat'> & {
  createdat?: string | null;
  updatedat?: string | null;
};

export type RestAdmins = RestOf<IAdmins>;

export type NewRestAdmins = RestOf<NewAdmins>;

export type PartialUpdateRestAdmins = RestOf<PartialUpdateAdmins>;

export type EntityResponseType = HttpResponse<IAdmins>;
export type EntityArrayResponseType = HttpResponse<IAdmins[]>;

@Injectable({ providedIn: 'root' })
export class AdminsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/admins');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(admins: NewAdmins): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(admins);
    return this.http
      .post<RestAdmins>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(admins: IAdmins): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(admins);
    return this.http
      .put<RestAdmins>(`${this.resourceUrl}/${this.getAdminsIdentifier(admins)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(admins: PartialUpdateAdmins): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(admins);
    return this.http
      .patch<RestAdmins>(`${this.resourceUrl}/${this.getAdminsIdentifier(admins)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAdmins>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAdmins[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAdminsIdentifier(admins: Pick<IAdmins, 'id'>): number {
    return admins.id;
  }

  compareAdmins(o1: Pick<IAdmins, 'id'> | null, o2: Pick<IAdmins, 'id'> | null): boolean {
    return o1 && o2 ? this.getAdminsIdentifier(o1) === this.getAdminsIdentifier(o2) : o1 === o2;
  }

  addAdminsToCollectionIfMissing<Type extends Pick<IAdmins, 'id'>>(
    adminsCollection: Type[],
    ...adminsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const admins: Type[] = adminsToCheck.filter(isPresent);
    if (admins.length > 0) {
      const adminsCollectionIdentifiers = adminsCollection.map(adminsItem => this.getAdminsIdentifier(adminsItem)!);
      const adminsToAdd = admins.filter(adminsItem => {
        const adminsIdentifier = this.getAdminsIdentifier(adminsItem);
        if (adminsCollectionIdentifiers.includes(adminsIdentifier)) {
          return false;
        }
        adminsCollectionIdentifiers.push(adminsIdentifier);
        return true;
      });
      return [...adminsToAdd, ...adminsCollection];
    }
    return adminsCollection;
  }

  protected convertDateFromClient<T extends IAdmins | NewAdmins | PartialUpdateAdmins>(admins: T): RestOf<T> {
    return {
      ...admins,
      createdat: admins.createdat?.toJSON() ?? null,
      updatedat: admins.updatedat?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restAdmins: RestAdmins): IAdmins {
    return {
      ...restAdmins,
      createdat: restAdmins.createdat ? dayjs(restAdmins.createdat) : undefined,
      updatedat: restAdmins.updatedat ? dayjs(restAdmins.updatedat) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAdmins>): HttpResponse<IAdmins> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAdmins[]>): HttpResponse<IAdmins[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
