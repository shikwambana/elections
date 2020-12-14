import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  myheaders: HttpHeaders;
  baseURL : string = 'https://elections-sa.herokuapp.com/v1/'
  constructor(private http: HttpClient) {
    this.myheaders = new HttpHeaders();
  }

  getData(type : string,year? : string, query? : string){

    let urlQuery = year ? '/' + year : '';
    urlQuery += query ? '/' + query : '';
    return this.http.get(this.baseURL + type + urlQuery)

  }
}
