import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataArchiService {

  private host = environment.host;

  constructor(private http:HttpClient) {}



  public getSocle(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/socle/all`);
  }

  public getService(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/service/all`);
  }

  public getTopic(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/topic/all`);
  }

  public getObjet(): Observable<any[]> {
    return this.http.get<any[]>(`${this.host}/objet/all`);
  }

}
