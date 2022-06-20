import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import * as CryptoJs from 'crypto-js';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  //array form Group
  userForm: FormGroup = this.fB.group({
    dept_id: [''],
    role_code: [''],
    username: ['',[Validators.required, Validators.minLength(4)]],
    password: ['',[Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
  })

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns: string[] = ['sn', 'dept_name', 'username', 'role_name', 'action'];

  constructor(private fB: FormBuilder, private admin: AdminService) { }

  dept_id: any = [];
  dept_name: any = [];
  role_name: any = [];
  dataSource: any = [];


  //fro Password encryption Key
  encryptionKey = 'ayushTamboli';

  ngOnInit(): void {
    this.getUserDetails();
    this.getDepartment();
    this.getRole_name();
  }
  defaultRole:number=2;
  // selectRole:boolean= true;
  //
  addUser() {
    // console.log(this.userForm.value);
    const password = CryptoJs.AES.encrypt(this.userForm.get('password')?.value, this.encryptionKey)
    this.userForm.patchValue({ password: `${password}` })
    // console.log(this.userForm.value.password)
    this.admin.saveDetails('admin/addUser', this.userForm.value).subscribe((res: any) => { 
      // console.log(res);
      if (res['affectedRows']) {
        this.getUserDetails();
        this.userForm.reset();
        Swal.fire({ icon: 'success', text: "Saved Successfully.", timer: 2000 });
      }
    });
  }

  getUserDetails() {
    this.admin.getFunction('admin/userdata').subscribe((res: any) => {
      // console.log(res);
      if (res.length) {
        this.dept_id = res;
        this.dataSource = new MatTableDataSource(this.dept_id);
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

  //Choose Department Name
  getDepartment() {
    this.admin.getFunction('admin/dept').subscribe((res: any) => {
      this.dept_name = res;
      console.log(this.dept_name);
    });
  }

  //get Role Name
  getRole_name() {
    this.admin.getFunction('admin/role').subscribe((res: any) => {
      this.role_name = res;
      // console.log(this.role_name);
    });
  }

  //Delete Users
  deleteUser(username: any) {
    // console.log(username, "selected ID");
    this.admin.deleteFunction('admin/del/' + username).subscribe((res: any) => {
      // console.log(res)
      if (res['affectedRows']) {
        this.getUserDetails();
        Swal.fire({ icon: 'success', text: "delete Successfully.", timer: 2000 });
      }
    })
  }
}
