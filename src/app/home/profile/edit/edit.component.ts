import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileComponent } from '../profile.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
  
  editModel={
    Name:''
    
  }
  constructor(private servise:UserService, private  router:Router,private toastr:ToastrService, private profile:ProfileComponent) { }

  ngOnInit() {
  }
  saveUserName(form:NgForm)
  {
    this.servise.saveUserName(form.value).subscribe(
      (res:any)=>{
        this.profile.ngOnInit();
        this.router.navigateByUrl('/home/profile');
      },
      err=>{
        console.log(err);
      }
    );
   
    }
    
}
