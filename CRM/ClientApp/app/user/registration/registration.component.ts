import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null){
        this.router.navigate(['/info']);
    }
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
        if (res.token!=null){
            this.service.formModel.reset();
            this.toastr.success("Login was created!", "Registration successful.");
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('/info');
        }
        else{
          res.errors.forEach(error => {
            switch(error.Code){
              case 'DuplicateUserName':
                  this.toastr.error("Username is already taken", "Registration Failed.");
                  break;
              default:
                  this.toastr.error(error.Description, "Registration Failed.");
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
