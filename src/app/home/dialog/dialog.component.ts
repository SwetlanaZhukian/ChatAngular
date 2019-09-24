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
  inputReset(){
    this.message = '';
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

    // this.hubConnection.on("SendMessage", (msg) => {
    //         var messageInfo = new MessageInfo();
    //        messageInfo.mess = msg;
    //          messageInfo.user = 'contact';
    //          messageInfo.date = new Date().toString();
    //               this.messages.push(messageInfo);});
  this.signal.SendMessage( (msg) => {
    var message = new MessageInfo();
    message.mess = msg;
    message.user = 'contact';
    message.date=this.datePipe.transform(message.date, 'dd-MM-yyyy HH:mm');
    this.messages.push(message);
  });
  // this.hubConnection.on("SendMySelfMessage", (msg) => {
  //         var messageInfo = new MessageInfo();
  //         messageInfo.mess = msg;
  //         messageInfo.user = 'user';
  //         messageInfo.date = new Date().toTimeString();
  //         this.messages.push(messageInfo);
  //       });

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
  this.message = ' ';
 
}
toggleEmojiPicker() {
  this.showEmojiPicker = !this.showEmojiPicker;
}
addEmoji(event) {
  const { message } = this;
  const text = `${message}${event.emoji.native}`;
  this.message = text;
  this.showEmojiPicker = false;
}
}
// export class DialogComponent implements OnInit {
//   private hubConnection: HubConnection;
//   showEmojiPicker = false;
//   constructor(private activeRoute: ActivatedRoute, private service: ChatService, private toastr: ToastrService, 
//     private router:Router, private home: HomeComponent) { this.id = activeRoute.snapshot.params["id"]; }
//   message: string = '';
//   messages: any[] = [];
//   images: File[] = [];
  
//   dialog;
//   id: string;
//   dropzone: any;
//   token = localStorage.getItem("token");
//  visible = false;
//   onFilesAdded(files: File[]) {
//     files.forEach(file => {
//       const reader = new FileReader();
//       reader.onload = (e: ProgressEvent) => {
//         const content = (e.target as FileReader).result;
//       };
//       reader.readAsDataURL(file);
//     });
//     this.images = files;
//   }
//   inputReset(){
//     this.message = '';
//   }
//   ngOnInit() {
//     this.onGetList(this.id);
//     this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:44370/chat", {
//       skipNegotiation: true,
//       transport: HttpTransportType.WebSockets, accessTokenFactory: () => this.token
//     }).build();
//     this.hubConnection.start()
//       .then(() => { console.log("Connection started"); })
//       .catch(err => { console.error(err); });
//     this.onSendListener();
//     this.onSendMyselfListener();
//   }
// onVisible(){
// this.visible =!this.visible;
// }
//   echo() {
//     var form = new MessageModel();
//     form.receiverId = this.id;
//     form.text = this.message;
//     form.attachment = this.images;
//     this.service.sendMessage(form).subscribe(
//       res => {
//         console.log(res);
//       },
//       err => {
//         console.log(err);
//         this.toastr.error(err.error, "Failed");
//       },
//     );
//   }
 
//   onGetList(Id) {
//     this.service.getDialog(Id).subscribe(
//       res => {
//         this.dialog = res;
//         console.log(this.dialog);
//       },
//       err => {
//         console.log(err);
//       },
//     );
//   }
//   // addEmoji(event) {
//   //   const { message } = this;
//   //   const text = `${message}${event.emoji.native}`;
//   //   this.message = text;
//   // }
//   toggleEmojiPicker() {
//        this.showEmojiPicker = !this.showEmojiPicker;
//      }
//      addEmoji(event) {
//       const { message } = this;
//       const text = `${message}${event.emoji.native}`;
//       this.message = text;
//       this.showEmojiPicker = false;
//      }
//   onSendListener() {
//     this.hubConnection.on("Send", (msg) => {
//       var messageInfo = new MessageInfo();
//       messageInfo.mess = msg;
//       messageInfo.user = 'user';
//       messageInfo.date = new Date().toString();
//       this.messages.push(messageInfo);
//     });
//   }

//   onSendMyselfListener() {
//     this.hubConnection.on("SendMyself", (msg) => {
//       var messageInfo = new MessageInfo();
//       messageInfo.mess = msg;
//       messageInfo.user = 'you';
//       messageInfo.date = new Date().toTimeString();
//       this.messages.push(messageInfo);
//     });
//   }
// }