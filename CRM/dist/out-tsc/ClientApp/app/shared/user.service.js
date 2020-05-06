import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { UserProfile } from '../models/models';
import { map } from 'rxjs/operators';
let UserService = class UserService {
    constructor(fb, http, router) {
        this.fb = fb;
        this.http = http;
        this.router = router;
        this.rootURL = 'http://localhost:64971/api/';
        this.formModel = this.fb.group({
            UserName: ['', Validators.required],
            Email: ['', Validators.email],
            FullName: [''],
            Passwords: this.fb.group({
                Password: ['', [Validators.required, Validators.minLength(4)]],
                ConfirmPassword: ['', [Validators.required, Validators.minLength(4)]]
            }, { validator: this.comparePasswords })
        });
        this.roles = [];
        this.userRoles = [];
        this.userProfile = new UserProfile();
    }
    comparePasswords(fb) {
        let confirmPasswordCtrl = fb.get('ConfirmPassword');
        if (confirmPasswordCtrl.errors == null || 'passwordMismatch' in confirmPasswordCtrl.errors) {
            if (fb.get('Password').value != confirmPasswordCtrl.value)
                confirmPasswordCtrl.setErrors({ passwordMismatch: true });
            else
                confirmPasswordCtrl.setErrors(null);
        }
    }
    register() {
        var body = {
            UserName: this.formModel.value.UserName,
            Email: this.formModel.value.Email,
            Password: this.formModel.value.Passwords.Password,
        };
        return this.http.post(this.rootURL + 'Users/Register', body);
    }
    login(formData) {
        return this.http.post(this.rootURL + 'Users/Login', formData);
    }
    getUserProfile() {
        return this.http.get(this.rootURL + 'Users/UserProfile')
            .toPromise()
            .then((u) => {
            this.userProfile = u;
        });
    }
    loadRoles() {
        return this.http.get(this.rootURL + "Users/Roles")
            .pipe(map((data) => {
            this.roles = data;
            return true;
        }));
    }
    loadUserRoles() {
        return this.http.get(this.rootURL + "Users/UserRoles")
            .pipe(map((data) => {
            this.userRoles = data;
            return true;
        }));
    }
    onLogout() {
        localStorage.removeItem('token');
        this.router.navigate(['user/login']);
    }
    roleMatch(allowedRoles) {
        var isMatch = false;
        var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var userRole = payload.role;
        allowedRoles.forEach(element => {
            if (userRole == element) {
                isMatch = true;
                return false;
            }
        });
        return isMatch;
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map