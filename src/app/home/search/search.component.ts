import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery:string;

  constructor(private service:UserService, private route: ActivatedRoute,private toastr:ToastrService,private router: Router) {
  
    this.searchQuery = this.route.snapshot.params["searchQuery"];
    console.log(this.searchQuery);

  }
  
users: any[];

ngOnInit() {
  
   this.service.search(this.searchQuery).subscribe(
       res => {
       this.users = res;
         console.log(this.users);
     },
     err => {
       console.log(err);
   }
  );
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
  public ImgPath = (serverPath: string) => {
    return `https://localhost:44370/${serverPath}`;
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
  
}
