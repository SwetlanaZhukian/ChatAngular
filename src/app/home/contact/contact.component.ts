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
  config: any;
  b:boolean=false;
  constructor(private service:UserService,private toastr:ToastrService) { 
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      //totalItems: this.users.count
    };
  }

  ngOnInit() {
    this.service.getContacts().subscribe(
      (res:any) => {
      this.contacts = res;
        console.log(this.contacts);
        if (this.contacts.length>0)
        {
          this.b=true;
        }
        else{
          this.b=false;
        }
    },
    err => {
      console.log(err);

  });
this.b=false;
  }
  public ImgPath = (serverPath: string) => {
    return `https://localhost:44370/${serverPath}`;
  }
  pageChanged(event){
    this.config.currentPage = event;
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
