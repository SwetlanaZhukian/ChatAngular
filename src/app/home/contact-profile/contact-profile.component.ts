import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.component.html',
  styleUrls: ['./contact-profile.component.css']
})
export class ContactProfileComponent implements OnInit {
  editModel={
    Name:''
  }
  contactProfile;
  id:string;
  constructor(private service:UserService,private route: ActivatedRoute,private toastr:ToastrService) { 
    this.id = route.snapshot.params["id"];

  }

  ngOnInit() {
    this.service.getContactProfile(this.id).subscribe(
      res=>{
        this.contactProfile=res;
      },
      err=>{
        console.log(err);
      },
    );
   
  }
  public ImgPath = (serverPath: string) => {
    return `https://localhost:44370/${serverPath}`;
  }
  Add(Id)
{
  this.service.add(Id).subscribe(
    res => {
      this.ngOnInit();
     this.toastr.success("User added to your contacts successfully","Success");
    },
    err => {
      console.log(err);
      this.toastr.error(err.description,"Failed");
    }
  );
}
  Delete(Id)
  {
    this.service.delete(Id).subscribe(
      (res:any)=>{ 
        this.ngOnInit();
       this.toastr.success("User deleteded from your contacts successfully","Success");
      },
      err => {
        console.log(err);
        this.toastr.error(err.description,"Failed");
      }
    );
   
  }
  AddInBlock(Id)
{
  this.service.addInBlock(Id).subscribe(
    res => {
      this.ngOnInit();
     this.toastr.success("User added to your BlackList successfully","Success");
    },
    err => {
      console.log(err);
      this.toastr.error(err.description,"Failed");
    }
  );
}
DeleteFromBlock(Id)
{
  this.service.deleteFromBlock(Id).subscribe(
    (res:any)=>{ 
      this.ngOnInit();
     this.toastr.success("User deleteded from your BlackList successfully","Success");
    },
    err => {
      console.log(err);
      this.toastr.error(err.description,"Failed");
    }
  );
 
}
// save(Id,form:NgForm)
// {
//   this.service.saveNickName(Id,form.value).subscribe(
//     (res:any)=>{
//     //  this.ngOnInit();
 
//     },
//     err=>{
//       console.log(err);
//     }
//   );
// }
}
