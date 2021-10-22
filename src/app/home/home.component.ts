import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../api.service";
import { BottomOptionsComponent } from "../bottom-options/bottom-options.component";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  data: Array<object> = [];
  columnsToDisplay = ['icon', 'id', 'data']
  headersToDisplay = ['NameOfParty', 'Number of Votes']
  title = "elections";
  years: Array<string> = ["2021", "2019", "2014", "2009", "2004", "1999", "1994"];
  currentYear: string = "";
  parties;
  filteredParties;
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isReadMore = true

  constructor(private _bottomSheet: MatBottomSheet, public api: ApiService) {
    this.selectYear();
  }

  ngOnInit() {
    this.api.getTopThree(this.currentYear)
    this.api.getGenElecResult(this.currentYear)
    // this.api.parties.paginator = this.paginator;
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
        sessionStorage.setItem('year',res)
        this.api.getTopThree(this.currentYear)
        this.api.getGenElecResult(this.currentYear)
      }
    });
  }

  sortData(sort: Sort) {
    console.log(sort)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.api.parties.filter = filterValue.trim().toLowerCase();

  }
}
