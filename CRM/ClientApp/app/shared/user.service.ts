import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Router } from '@angular/router';
import { Role, UserRole, User, UserProfile } from '../models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    readonly rootURL = 'http://localhost:64971/api/';

    constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  formModel = this.fb.group({
    UserName:['', Validators.required],
    Email:['', Validators.email],
    FullName:[''],
    Passwords: this.fb.group({
      Password:['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword:['', [Validators.required, Validators.minLength(4)]]
    },{validator : this.comparePasswords})
  });

  comparePasswords(fb: FormGroup){
    let confirmPasswordCtrl = fb.get('ConfirmPassword');
    if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors){
      if (fb.get('Password').value != confirmPasswordCtrl.value)
        confirmPasswordCtrl.setErrors({passwordMismatch:true});
      else
        
      confirmPasswordCtrl.setErrors(null);
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
    }

    return this.http.post(this.rootURL+'Users/Register', body);
  }

  login(formData){
      return this.http.post(this.rootURL +'Users/Login', formData);
  }

    getUserProfile() {
        return this.http.get(this.rootURL + 'Users/UserProfile')
            .toPromise()
            .then((u: UserProfile) => {
                this.userProfile = u;
            });
  }

    loadRoles(): Observable<boolean> {
        return this.http.get(this.rootURL + "Users/Roles")
            .pipe(
                map((data: any) => {
                    this.roles = data;
                    return true;
                })
            )
    }

    loadUserRoles(): Observable<boolean> {
        return this.http.get(this.rootURL + "Users/UserRoles")
            .pipe(
                map((data: any) => {
                    this.userRoles = data;
                    return true;
                })
            )
    }

    onLogout() {
        localStorage.removeItem('token');
        this.router.navigate(['user/login']);
    }

  roleMatch(allowedRoles): boolean{
    var isMatch = false;
    var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payload.role;
    allowedRoles.forEach(element => {
      if (userRole == element){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
    }

    public roles: Role[] = []; 
    public userRoles: UserRole[] = [];
    public userProfile: UserProfile = new UserProfile();
}
