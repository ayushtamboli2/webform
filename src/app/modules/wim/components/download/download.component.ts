import { environment } from 'src/environments/environment';
import { Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  links:string[];
  folder:string;
  root:string = environment.rootUrl
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { 
    this.links = data.split("@",5)
    if(this.links[0].charAt(0)=="s") this.folder = "soft"
    else this.folder = "letter"
  }

  ngOnInit(): void {
  }
}
