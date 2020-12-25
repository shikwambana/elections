import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { url } from 'inspector';

class partyData {
  name: string;
  data: string;
}
@Injectable({
  providedIn: "root",
})
export class ApiService {
  myheaders: HttpHeaders;
  baseURL: string = "https://elections-sa.herokuapp.com/v1/";
  currentYear: string = "1994";
  topThree: Array<partyData> = [];
  parties: Array<object> = [];
  stats: object = {
    total: 0,
    registered_voters: 0,
    spoilt_votes: 0,
  };
  constructor(private http: HttpClient) {
    this.myheaders = new HttpHeaders();
  }

  getData(type: string, year?: string, query?: string) {
    let urlQuery = year ? "/" + year : "";
    urlQuery += query ? "/" + query : "";
    return this.http.get(this.baseURL + type + urlQuery);
  }

  getTopThree() {
    this.getData("generalElections", this.currentYear, "topThree").subscribe(
      (res: object) => {
        let keys = Object.keys(res["results"]);

        for (let elem of keys) {
          this.topThree.push({
            name: elem,
            data: res["results"][elem],
          });
        }

        console.log(this.topThree);
      }
    );
  }

  getGenElecResult() {
    this.getData("generalElections", this.currentYear).subscribe(
      (res: object) => {
        let keys = Object.keys(res["results"][0]);
        let arr = [];

        for (let elem of keys) {

          var matches = elem.match(/\b(\w)/g);
          var acronym = matches.join('');

          arr.push({
            icon: acronym,
            id: elem,
            data: res["results"][0][elem],
          });
        }
        this.parties = arr.slice(7, arr.length - 1);
        this.stats = {
          total: arr[5]['data'],
          registered_voters: arr[4]['data'],
          spoilt_votes: arr[6]['data'],
        };

        console.log(this.stats)

      }
    );
  }
}
