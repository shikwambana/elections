import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  data: Array<object> = [];
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getData("generalElections", "1994","topThree").subscribe((res: object) => {

      let keys = Object.keys(res['results'])

      for(let elem of keys){
        this.data.push({
          name: elem,
          data: res['results'][elem]
        })
      }

      console.log(this.data);
    });
  }
}
