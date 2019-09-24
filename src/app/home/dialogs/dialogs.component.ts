import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {
  dialogs: any[];
  constructor(private service:ChatService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getDialogs().subscribe(
      (res:any) => {
      this.dialogs = res;
        console.log(this.dialogs);
    },
    err => {
      console.log(err);
  });
  }
  public ImgPath = (serverPath: string) => {
    return `https://localhost:44370/${serverPath}`;
  }
 

}
