import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
formModel={
  Email:'',
  Password:''
}
  constructor(private servise:UserService, private  router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }
onSubmit(form:NgForm)
{
  this.servise.login(form.value).subscribe(
    (res:any)=>{
      localStorage.setItem('token',res.token);
      this.router.navigateByUrl('/home/profile');
    },
    err=>{
      if(err.status==400)
      this.toastr.error('Incorrect username or password.','Autentification failed.');
      else if(err.status==401)
      this.toastr.error('Email not confirmed.','Autentification failed.');
      else
      console.log(err);
    }
  );
  
  }
  
}
