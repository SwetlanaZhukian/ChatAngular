import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
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



const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {path:'chat', component: ChatComponent},
  {path:'user',component:UserComponent,
  children:[
    {
      path:'registration',component:RegistrationComponent
    },
    {
      path:'login',component:LoginComponent
    }
  ]
},
{path: 'home',component:HomeComponent,canActivate:[AuthGuard],
children:[
  {
    path: 'profile',component:ProfileComponent,
    children:[
      {
        path:'edit',component:EditComponent
      },
      {
        path:'upload',component:UploadComponent
      }
    ]
  },
  {
  path: 'search/:searchQuery',component:SearchComponent
  },
  {
    path:'contactprofile/:id',component:ContactProfileComponent
   
  },
  {
    path:'contact',component:ContactComponent
  },
  {
    path:'blacklist',component:BlacklistComponent
  },
  {
    path:'dialog/:id',component:DialogComponent
  },
  {
    path:'dialogs',component:DialogsComponent
  }
]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
