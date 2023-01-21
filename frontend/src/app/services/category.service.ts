import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string;

  constructor(public httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}categories`;
  }

  getAllCategory():Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl);
  }

}
