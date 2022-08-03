import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Application} from "../Model/application";

@Injectable({
  providedIn: 'root'
})
export class ListerAppService {

  private host = environment.host;

  constructor(private http:HttpClient) {}



  public getDataDom(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/lister_app_by_dom/treelist`);
  }

  public getDataCat(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/lister_app_by_categ/treelist`);
  }

  public getDataStruct(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/lister_app_by_struct/treelist`);
  }


}
