import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../../../../entities/products/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'api/products'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getAll(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(this.apiUrl);
  }

  getOne(id: number): Observable<IProducts> {
    return this.http.get<IProducts>(`${this.apiUrl}/${id}`);
  }

  create(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(this.apiUrl, product);
  }

  update(product: IProducts): Observable<IProducts> {
    return this.http.put<IProducts>(`${this.apiUrl}/${product.id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Additional methods as needed
  findByUser(id: number) {
    return this.http.get<IProducts[]>(`${this.apiUrl}/user/${id}`);
  }
}
