import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-options',
  templateUrl: './bottom-options.component.html',
  styleUrls: ['./bottom-options.component.scss']
})
export class BottomOptionsComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data, private matBtnSheet : MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  choose(item){

    this.matBtnSheet.dismiss(item)
  }

}
