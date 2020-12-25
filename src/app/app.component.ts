import { Component } from "@angular/core";
import {  MatBottomSheet } from "@angular/material/bottom-sheet";
import { BottomOptionsComponent } from "./bottom-options/bottom-options.component";
import { ApiService } from "./api.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "elections";
  years: Array<string> = ["2019", "2014", "2009", "2004", "1999", "1994"];
  currentYear: string = "";

  constructor(private _bottomSheet: MatBottomSheet, private api : ApiService) {}

  ngOnInit() {
    this.selectYear();
  }
  selectYear() {
    this.currentYear = sessionStorage.getItem("year")
      ? sessionStorage.getItem("year")
      : "2019";
  }

  chooseDate() {
    const bottomSheet = this._bottomSheet.open(BottomOptionsComponent, {
      data: this.years,
    });

    bottomSheet.afterDismissed().subscribe((res) => {
      if (res) {
        this.currentYear = res;
        this.api.currentYear = res
      }
    });
  }
}
