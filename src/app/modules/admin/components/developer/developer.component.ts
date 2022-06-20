import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})
export class DeveloperComponent implements OnInit {

  constructor(private admin:AdminService) { }

  ngOnInit(): void {
  }

  sendQuery(queryDetail:string){
    this.admin.sendQuery('admin/sendQuery',{queryDetail:queryDetail}).subscribe((res:any) => {
      console.log(res);
    });
  }

}
