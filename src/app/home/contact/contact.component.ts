import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: any[];
  constructor(private service:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getContacts().subscribe(
      (res:any) => {
      this.contacts = res;
        console.log(this.contacts);
    },
    err => {
      console.log(err);
  });
  }
  public ImgPath = (serverPath: string) => {
    return `https://localhost:44370/${serverPath}`;
  }
 
  Delete(userId)
  {
    this.service.delete(userId).subscribe(
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
}
