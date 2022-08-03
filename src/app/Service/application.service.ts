import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Application} from "../Model/application";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  private host = environment.host;

  constructor(private http:HttpClient) {}


  public getApplications(): Observable<Application[]>{
    return this.http.get<Application[]>(`${this.host}/application/all`);
  }

  public getApplicationsDeco(): Observable<Application[]>{
    return this.http.get<Application[]>(`${this.host}/application_deco/all`);
  }


  fetchDataDashboard() : Observable<Application[]>{
    return this.http.get<any[]>(`${this.host}/dashboard/dashboard-data`);
  }
}
