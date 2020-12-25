import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  data: Array<object> = [];
  columnsToDisplay = ['Flag', 'Name', 'Number of Votes']

  constructor(public api: ApiService) {}

  ngOnInit() {
    this.api.getTopThree();
    this.api.getGenElecResult()
  }


}
