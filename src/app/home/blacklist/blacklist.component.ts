import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.css']
})
export class BlacklistComponent implements OnInit {
  usersInBlock: any[];
  constructor(private service:UserService,private toastr:ToastrService,private router: Router) { }

  ngOnInit() {
    this.service.getUsersInBlackList().subscribe(
      (res:any) => {
      this.usersInBlock = res;
        console.log(this.usersInBlock);
    },
    err => {
      console.log(err);
  });
  }

  DeleteFromBlackList(Id)
  {
    this.service.deleteFromBlock(Id).subscribe(
      (res:any)=>{ 
        this.ngOnInit();
       this.toastr.success("User deleteded from your BlockList successfully","Success");
      },
      err => {
        console.log(err);
        this.toastr.error(err.description,"Failed");
      }
    );
   
  }
  public ImgPath = (serverPath: string) => {
    return `https://localhost:44370/${serverPath}`;
  }
}
