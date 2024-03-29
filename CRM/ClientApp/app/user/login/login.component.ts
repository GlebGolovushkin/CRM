import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel={
    UserName: '',
    Password:''
  }

  constructor(private service: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null){
      this.router.navigate(['/info']);
    }
  }

  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res: any) =>{
        localStorage.setItem('token',res.token);
            this.router.navigateByUrl('/info');
            this.service.getUserProfile();
      },
      err => {
        if(err.status == 400){
          this.toastr.error('Incorrect username or password.', 'Authentification failed.');
        }
        else{
          console.log(err);
        }
      }
    );
  }

}
