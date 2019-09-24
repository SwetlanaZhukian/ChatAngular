import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
    onSubmit()
    {
      
      this.service.register().subscribe(
        (res: any) => {
          
          if (res.succeeded) {
            this.service.formModel.reset();
            this.toastr.success('New user created!', 'Further instructions for completing registration have been sent to the email address.');
          } else {
            res.errors.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                 this.toastr.error('Phone Number is already taken','Registration failed.');
                  break;
                  case 'DuplicateEmail':
                      this.toastr.error('Email is already taken','Registration failed.');
                      break;
                default:
                this.toastr.error(element.description,'Registration failed.');
                  break;
              }
            });
            
          }
        },
        err=>{
          console.log(err);
        }
      )
    }
  

}
