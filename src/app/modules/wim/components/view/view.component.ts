import { Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DatePipe} from '@angular/common'

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private datePipe : DatePipe) { 
    data.from_date = datePipe.transform(data.from_date,'dd-MM-yyyy'),
    data.to_date = datePipe.transform(data.to_date, 'dd-MM-yyyy'),
    data.date = datePipe.transform(data.date,'dd-MM-yyyy')
  }
  ngOnInit(): void { 
    
  }

}
