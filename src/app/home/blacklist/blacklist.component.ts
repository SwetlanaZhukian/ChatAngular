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
  config: any;
  b:boolean=false;
  constructor(private service:UserService,private toastr:ToastrService,private router: Router) {
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      //totalItems: this.users.count
    };
   }

  ngOnInit() {
    this.service.getUsersInBlackList().subscribe(
      (res:any) => {
      this.usersInBlock = res;
        console.log(this.usersInBlock);
        if (this.usersInBlock.length>0)
        {
          this.b=true;
        }
    },
    err => {
      console.log(err);
  });
  this.b=false;
  }
  pageChanged(event){
    this.config.currentPage = event;
  }

  DeleteFromBlackList(Id)
  {
    this.service.deleteFromBlock(Id).subscribe(
      (res:any)=>{ 
        this.ngOnInit();
       this.toastr.success("User deleteded from your Black List successfully","Success");
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
