import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {MatTableDataSource} from '@angular/material/table';
import { MultiDataSet, Label } from 'ng2-charts';


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
  parties;
  stats: object = {
    total: 0,
    registered_voters: 0,
    spoilt_votes: 0,
  };
  doughnutChartData: MultiDataSet = [[]]
  doughnutChartLabels: Label[] = [];
  constructor(private http: HttpClient) {
    this.myheaders = new HttpHeaders();
  }

  getData(type: string, year?: string, query?: string) {
    let urlQuery = year ? "/" + year : "";
    urlQuery += query ? "/" + query : "";
    return this.http.get(this.baseURL + type + urlQuery);
  }

  getTopThree(year) {
    this.topThree = []
    this.getData("generalElections", year, "topThree").subscribe(
      (res: object) => {
        let keys = Object.keys(res["results"]);

        for (let elem of keys) {
          this.topThree.push({
            name: elem,
            data: res["results"][elem],
          });

          this.doughnutChartData[0].push(res["results"][elem]);
          this.doughnutChartLabels.push(elem)
        }

        console.log(this.topThree);
      }
    );
  }

  getGenElecResult(year) {

    this.parties = []
    return this.getData("generalElections", year).subscribe(
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
        this.parties.sort((a, b) => parseFloat(b.data) - parseFloat(a.data));
        this.parties = new MatTableDataSource(this.parties)
        console.log(this.stats)
        return this.parties
      }
    );
  }

}
