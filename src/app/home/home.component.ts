import { Component, OnInit, Output, EventEmitter, ViewChild,OnChanges, SimpleChanges, Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { stringify } from '@angular/compiler/src/util';
import { SearchComponent } from './search/search.component';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { SygnalRService } from '../shared/sygnal-r.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ['./home/search.component.css']
})
export class HomeComponent implements OnInit {
 
   searchQuery:any ;
   userDetails;
  private hubConnection: HubConnection;

    
  constructor(private router: Router,private service:UserService,private toastr:ToastrService,private signal:SygnalRService) { }
  
  ngOnInit() {
    
   this.signal.initialize();
  }
  
onLogout(){
  this.service.disconnect().subscribe(
    res => {
      console.log("logout");
    },
    err => {
      console.log(err);
    },
  );
  localStorage.removeItem('token');
  this.router.navigate(['/user/login']);
}
onSubmit(searchQuery) {
  console.log(searchQuery)
this.searchQuery = searchQuery;
 this.router.navigate(['/home/search',this.searchQuery] );
 this.searchQuery='';
 
}

}

