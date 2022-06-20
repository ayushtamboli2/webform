import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { WimService } from 'src/app/services/wim.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as CryptoJs from 'crypto-js';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: boolean = true;
  deptData: any;
  //fro Password encryption Key
  encryptionKey = 'ayushTamboli';

  constructor(private fB: FormBuilder, private wim: WimService, private helper: JwtHelperService, private AS: AuthService) {
    //getting token data
    this.deptData = localStorage.getItem('token');
    if (!this.helper.isTokenExpired(this.deptData)) {
      this.deptData = this.helper.decodeToken(this.deptData)
    }
  }

  changepass: FormGroup = this.fB.group({
    oldPassword: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    newPassword: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
    confirmPassword: ['', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]]
  });

  updateProfile: FormGroup = this.fB.group({
    officer_name: ['',[Validators.required]],
    designation: ['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  })
  checkPassword: boolean = false;
  redIcon: boolean = false;
  greenIcon: boolean = false;

  //Change Password
  changePass() {
    // console.log(this.deptData)
    const OldPassword = CryptoJs.AES.encrypt(this.changepass.get('oldPassword')?.value, this.encryptionKey)
    this.changepass.patchValue({ oldPassword: `${OldPassword}` })

    const NewPassword = CryptoJs.AES.encrypt(this.changepass.get('newPassword')?.value, this.encryptionKey)
    this.changepass.patchValue({ newPassword: `${NewPassword}` })

    const ConfirmPassword = CryptoJs.AES.encrypt(this.changepass.get('confirmPassword')?.value, this.encryptionKey)
    this.changepass.patchValue({ confirmPassword: `${ConfirmPassword}` })

    // console.log(this.changepass.value.newPassword)

    this.changepass.value.username = this.deptData.username
    // console.log(this.changepass.value)
    if (this.changepass.valid) {
      this.wim.updateFunction('users/changepass', this.changepass.value).subscribe((res: any) => {
        // console.log(res)
        if (res.affectedRows) {
          Swal.fire({ icon: 'success', text: "Password Change Successfully.", timer: 1000 });
          this.profile = true;
          this.checkPassword = false
          this.greenIcon = false;
          this.redIcon = false;
          this.changepass.reset();
          this.AS.logout();
          location.reload();
        } else {
          Swal.fire({ icon: 'error', text: "Incorrect Password or Username", timer: 1000 });
          this.profile = false;
          this.checkPassword = false;
          this.greenIcon = false;
          this.redIcon = false;
          this.changepass.reset();
        }
        
      })
    }
  }

 
  updatePro() {
    // console.log(this.updateProfile.value)
    this.updateProfile.value.deptName = this.deptData.deptName;
    if(this.updateProfile.valid){
      this.wim.updateFunction('users/updateProfile', this.updateProfile.value).subscribe((res:any)=>{
        if (res.affectedRows){
          Swal.fire({icon: 'success', text: "Profile update successfully", timer:1000});
        }
      })
    }
  }
  
  //get Profile for update
  getProfile(){
    //instance load data
    const dept_name = this.deptData.deptName
    this.wim.getFunction('users/getProfile/' + dept_name).subscribe((res: any) => {
      // console.log(res);
        this.updateProfile.patchValue({
          officer_name: res[0].officer_name,
          designation: res[0].designation,
          email: res[0].email,
          mobile: res[0].mobile
        })      
    });
  }

  ngOnInit(): void {
    // console.log(this.deptData);
    this.getProfile();
  }

  matchPass(n: string, m: string) {
    if (n != m) this.redIcon = true;
    else this.redIcon = false;
    if (n == m) {
      this.greenIcon = true;
      this.checkPassword = true
    } else {
      this.greenIcon = false;
      this.checkPassword = false
    }
  }

}
