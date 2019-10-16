import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {
  dialogs: any[];
  config: any;
  b:boolean=false;

  houldNavigate: boolean = false;
 
  constructor(private service:ChatService,private toastr:ToastrService,private router: Router) { 
    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      //totalItems: this.users.count
    };
  }

  ngOnInit() {
    this.service.getDialogs().subscribe(
      (res:any) => {
      this.dialogs = res;
        console.log(this.dialogs);
       
        if (this.dialogs.length>0)
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
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  
  public ImgPath = (serverPath: string) => {
    return `https://localhost:44370/${serverPath}`;
  }
  
   
  DeleteDialog (contactId)
  {
    this.service.deleteD(contactId).subscribe(
      (res:any)=>{ 
       
        this.ngOnInit();
        
       this.toastr.success("Dialog deleteded from your dialogs successfully","Success");
      },
      err => {
        console.log(err);
        this.toastr.error(err.description,"Failed");
      }
    );
   
  }
  

}
