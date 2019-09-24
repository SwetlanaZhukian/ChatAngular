import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule } from "@angular/forms"
import  {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'  
import {NgxMaskModule, IConfig} from 'ngx-mask'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ProfileComponent } from './home/profile/profile.component';
import { EditComponent } from './home/profile/edit/edit.component';
import { UploadComponent } from './home/profile/upload/upload.component';
import { SearchComponent } from './home/search/search.component';
import { ContactProfileComponent } from './home/contact-profile/contact-profile.component';
import { ContactComponent } from './home/contact/contact.component';
import { BlacklistComponent } from './home/blacklist/blacklist.component';
import { ChatComponent } from './chat/chat.component';
import { DialogComponent } from './home/dialog/dialog.component';
import { DialogsComponent } from './home/dialogs/dialogs.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PickerModule } from '@ctrl/ngx-emoji-mart'




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    EditComponent,
    UploadComponent,
    SearchComponent,
    ContactProfileComponent,
    ContactComponent,
    BlacklistComponent,
    ChatComponent,
    DialogComponent,
    DialogsComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxDropzoneModule,
    PickerModule


  ],
  providers: [UserService,{
    provide:HTTP_INTERCEPTORS, 
    useClass:AuthInterceptor,
    multi:true
  }],
 
  bootstrap: [AppComponent]
})
export class AppModule { }

