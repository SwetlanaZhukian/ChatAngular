import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SygnalRService {
  private hubConnection: HubConnection;
  constructor() {
   
   }
   initialize(): Promise<any> {
   let connection = new HubConnectionBuilder()
    .withUrl("https://localhost:44370/chat",{ accessTokenFactory: () => localStorage.getItem("token"), skipNegotiation: true,  transport: signalR.HttpTransportType.WebSockets} )
    .build();
    this.hubConnection= connection
    return this.hubConnection.start()
     .then(() => { console.log("Connection started"); })
     .catch(err => { console.error(err); });
    }
  
   SendMessage(method: (...args: any[]) => void):void{
    this.hubConnection.on("Send", method);
  }
  SendMySelfMessage(method: (...args: any[]) => void):void{
    this.hubConnection.on("SendMyself", method);
  }
  send(message:string,conversationId:string):void{
    this.hubConnection.invoke("SendFaraway", message, conversationId);
  }
}
