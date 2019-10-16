import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { HubConnectionBuilder, HubConnection, HttpTransportType } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/shared/chat.service';
import { formatDate, DatePipe } from '@angular/common';
import { SygnalRService } from 'src/app/shared/sygnal-r.service';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../home.component';
import { MessageModel } from 'src/app/shared/MessageModel';
import { MessageInfo } from 'src/app/shared/MessageInfo';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';

export class Message{
mess:string;
user:string;
date:  string= new Date ().toString();
 }
 
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [DatePipe]
})
  
export class DialogComponent implements OnInit {
  dialog;
  id: string;
  token = localStorage.getItem("token");
  private hubConnection: HubConnection;
  message: string = '';
  messages: any[] = [];
  images: File[]=[];
  showEmojiPicker = false;
  searchValue:string = '';
  dropzone: any;
  showDropZone = false;
  clicks:number = 0;
  
 
  constructor(private activeRoute: ActivatedRoute,private service:ChatService,private toastr: ToastrService,private datePipe: DatePipe,private signal:SygnalRService) {
    this.id = activeRoute.snapshot.params["id"];
    
   }
 onFilesAdded(files: File[]) {
   files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
      };
      reader.readAsDataURL(file);
    });
    this.images = files;
  }
  onChanged(increased:any){
    increased==this.clicks++;
  }
  inputReset(){
    this.message = '';
    this.images = [];
  }
  ngOnInit() {
    this.service.getDialog(this.id).subscribe(
      (res: any) =>{
        this.dialog=res;
      },
      err=>{
        console.log(err);
      },
    );

   
  this.signal.SendMessage( (msg) => {
    var message = new MessageInfo();
    message.mess = msg;
    message.user = 'contact';
    message.date=this.datePipe.transform(message.date, 'dd-MM-yyyy HH:mm');
    this.messages.push(message);
    this.toastr.success("You have got a message!");
   
  }
  );
  
     this.signal.SendMySelfMessage( (msg) => {
      var message = new MessageInfo();
      message.mess = msg;
      message.user = 'user';
      message.date=this.datePipe.transform(message.date, 'dd-MM-yyyy HH:mm');
     this.messages.push(message);
   });
   
}

chat() {
  var form = new MessageModel();
    form.receiverId = this.id;
    form.text = this.message;
    form.attachment = this.images;
    this.service.sendMessage(form).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        this.toastr.error(err.error, "Failed");
      },
    );

 
}
toggleEmojiPicker() {
  this.showEmojiPicker = !this.showEmojiPicker;
}
dropZone() {
  this.showDropZone = !this.showDropZone;
}
addEmoji(event) {
  const { message } = this;
  const text = `${message}${event.emoji.native}`;
  this.message = text;
  this.showEmojiPicker = false;
}
}
