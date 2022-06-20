import { DownloadComponent } from './../../../wim/components/download/download.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ViewComponent } from 'src/app/modules/wim/components/view/view.component';
import { FormService } from 'src/app/services/form.service';
import { environment } from 'src/environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ], 
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class TrackComponent implements OnInit {

 
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'dept_name', 'date', 'form', 'letter', 'attachment', 'remark', 'admin_remark'];
  
  deptData: any;
  // date: any;
  dataSource: any = [];
  expandedElement:FormElement | null = null;

  constructor(private form : FormService,  public dialog: MatDialog, private helper: JwtHelperService, ) { 
    //getting token data
    this.deptData = localStorage.getItem('token');
    if (!this.helper.isTokenExpired(this.deptData)) {
      this.deptData = this.helper.decodeToken(this.deptData)
    }
  }

  ngOnInit(): void {
    this.getFormList();
  }

  //Filter for table data
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  

  //get form list by perticular user logged in
  getFormList():void{
    const dept_name = this.deptData.deptName;
    //instance load data
    this.form.getFunction('form/formList/'+ dept_name).subscribe((res: any) => {
      
      if (res.length) {
        // console.log(res)
        // this.dept_name = res;
        this.dataSource = new MatTableDataSource(res.reverse());
        // this.dataSource = res;
      }
    });
  } 



  //open View
  openDialog(form_id: any) {
    // console.log(form_id, 'Id Selected')
    this.form.getFunction('users/selectForm/' + form_id).subscribe((res: any) => {
      // console.log(res)
      
      const dialogRef = this.dialog.open(ViewComponent,{data:res[0]});

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    })
  }


  //Download Letter Pdf
  letter_pdf(letter_pdf: any) {
    const dialogRef = this.dialog.open(DownloadComponent,{data:letter_pdf});

    // const url = (environment.rootUrl+ 'letter/' + letter_pdf);
    // window.open(url);
  
  }

  //Download Letter Pdf
  soft_pdf(soft_pdf: any) {
    const dialogRef = this.dialog.open(DownloadComponent,{data:soft_pdf});
    
    // const url = (environment.rootUrl+ 'soft/' + soft_pdf);
    // window.open(url);
    // console.log(url);
  }

}

export interface FormElement {
  date: string;
  dept_name: string;
  designation: string;
  eng_link: string;
  form_id: number;
  from_date: string;
  hindi_link: string;
  info_type: string;
  letter_pdf: string;
  mobile: string;
  remark: string;
  soft_pdf: string;
  status: number;
  submited_by: string;
  to_date: string;
  }