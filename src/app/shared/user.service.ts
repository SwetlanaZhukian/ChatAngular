import { Injectable, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import  {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'  
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  readonly BaseURI='https://localhost:44370/api';
  formModel=this.fb.group({
    UserName :['',Validators.required],
    Email :['',[Validators.required,Validators.email]],
    PhoneNumber :['',Validators.required],
    Passwords:this.fb.group({
      Password :['',[Validators.required,Validators.minLength(6)]],
      PasswordConfirm :['',Validators.required]
    },{validator :this.comparePasswords})
   
  });
  comparePasswords(fb:FormGroup){
    let confirmPassword= fb.get('PasswordConfirm');
    if (confirmPassword.errors==null ||'passwordMismatch'in confirmPassword.errors)
    {
      if (fb.get('Password').value!=confirmPassword.value)
      confirmPassword.setErrors({passwordMismatch:true});
      else
      confirmPassword.setErrors(null);

    }
  }
  register()
    {
      var body= {
        Name:this.formModel.value.UserName,
        Email:this.formModel.value.Email,
        PhoneNumber:this.formModel.value.PhoneNumber,
        Password:this.formModel.value.Passwords.Password,
       // PasswordConfirm:this.formModel.value.UserName
      };
     return this.http.post(this.BaseURI+'/account/register',body);

    }
    login(formData)
    {
      return this.http.post(this.BaseURI+'/account/login',formData);
    }   
    getUserProfile(){
     return this.http.get(this.BaseURI+'/user/profile');
    }
    saveUserName(formData)
    {
      return this.http.put(this.BaseURI+'/user',formData)
    }
  
  search(query):Observable<any>{
      return this.http.get(this.BaseURI+'/user/search?str='+ query);
    
  }
  add(id):Observable<any>{
  
    return this.http.get(this.BaseURI+'/contact/add/'+id);
  }
  delete(id):Observable<any>
  {
    return this.http.delete(this.BaseURI+'/contact/'+id);
  }
  getContactProfile(id)
  {
    return this.http.get(this.BaseURI+'/contact/profile/'+id);
  }
  getContacts()
  {
    return this.http.get(this.BaseURI+'/contact/contact');
  }
  addInBlock(id):Observable<any>{
    return this.http.get(this.BaseURI+'/blacklist/add/'+id);
  }
  deleteFromBlock(id):Observable<any>
  {
    return this.http.delete(this.BaseURI+'/blacklist/'+id);
  }
  getUsersInBlackList()
  {
    return this.http.get(this.BaseURI+'/blacklist/blockusers');
  }
  saveNickName(id,formData)
  {
    return this.http.put(this.BaseURI+'/contact/'+id,formData);
  }
  }