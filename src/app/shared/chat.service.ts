import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { MessageModel } from './MessageModel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 
  constructor(private http:HttpClient) { }
  readonly BaseURI='https://localhost:44370/api';
  
  getDialogs()
  {
    return this.http.get(this.BaseURI+'/chat/dialogs');
  }
  getDialog(id): Observable<any>
  {
    return this.http.get(this.BaseURI+'/chat/'+id);
  }
  deleteD(id):Observable<any>
  {
    return this.http.delete(this.BaseURI+'/chat/'+id);
    
  }
  // send(formData)
  //   {
  //     return this.http.put(this.BaseURI+'/chathub',formData)
  //   }
  sendMessage(form:MessageModel){
    var formData = new FormData();
    formData.append('Text', form.text);
    formData.append('ReceiverId', form.receiverId);
    form.attachment.forEach(element => {
      formData.append('Attachment', element);
    });
    return this.http.post(this.BaseURI+'/chat/sendMessage', formData);
}
}
