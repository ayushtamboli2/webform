import { FormGroup,FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'dept_id', 'dept_name','officer_name','designation','email','mobile','action'];
  constructor(private fB: FormBuilder,  private admin : AdminService) { }

  public department: any = [];
  dataSource: any = [];

  deptForm : FormGroup = this.fB.group({
    dept_name : [''],
    action:['']
  })
  

  ngOnInit(): void {
    this.getDeptDetails();
  }

  //Function add department
  addDepartment(){
    // console.log(this.deptForm.value)
    this.admin.saveDetails('admin/addDept',this.deptForm.value).subscribe((res:any) => {
      console.log(res);
      if (res['affectedRows']) {
         this.getDeptDetails();
         this.deptForm.reset();
         Swal.fire({ icon: 'success', text: "Added Successfully.", timer: 2000 });

      }
    });
  }

  //Table Get Department List
  getDeptDetails() {
    this.admin.getFunction('admin/dept').subscribe((res: any) => {

      if (res.length) {
        this.department = res;
        this.dataSource = new MatTableDataSource(this.department);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  //Filter for table data
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Delete Department
  deleteDepartment(dept_id:any): void{
    // console.log(dept_id,'Id selected')
      this.admin.deleteFunction('admin/delete/'+ dept_id).subscribe((res:any)=>{
        if (res['affectedRows']) {
          this.getDeptDetails();
          Swal.fire({ icon: 'success', text: "delete Successfully.", timer: 2000 });
       }
      })
  }
}
