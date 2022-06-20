import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  total: any =[]

  constructor(private admin : AdminService) { }

  ngOnInit(): void {
    this.getCount();
  }

  //for Slide-show
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };


  //Count Announcement
  getCount() {
    this.admin.getFunction('users/count').subscribe((res: any) => {
      this.total= res
      // console.log(this.total);
    });
  }

}
