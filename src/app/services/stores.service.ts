import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreModel } from '../models/store.model';
import {StoreTagModel} from "../models/store-tag.model";

@Injectable({providedIn: 'root'})
export class StoresService {
  constructor(private _httpClient: HttpClient) {
  }

  getAllStores(): Observable<StoreModel[]> {
    return this._httpClient.get<StoreModel[]>('https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores');
  }

  getAllStoreTags(): Observable<StoreTagModel[]> {
    return this._httpClient.get<StoreTagModel[]>('https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-store-tags')
  }

  getOneStore(id: string): Observable<StoreModel> {
    return this._httpClient.get<StoreModel>(`https://6384fca14ce192ac60696c4b.mockapi.io/freshcart-stores/${id}`)
  }
}
