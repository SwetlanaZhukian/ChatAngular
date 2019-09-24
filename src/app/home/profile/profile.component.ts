import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public response: {'dbPath': ''}; 
  userDetails;
  constructor(private router: Router,private service:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res=>{
        this.userDetails=res;
      },
      err => {
        console.log(err);
      //  this.toastr.error(err.description,"Failed");
      },
    );
   
  }
 
   public uploadFinished = (event) => {
    this.response = event;
  }
 
  public createImgPath = (serverPath: string) => {
    this.ngOnInit();
    return `https://localhost:44370/${serverPath}`;
   
  }
}
