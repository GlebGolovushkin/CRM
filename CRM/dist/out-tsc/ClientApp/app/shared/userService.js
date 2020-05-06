import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
let UserService = class UserService {
    constructor(fb, http) {
        this.fb = fb;
        this.http = http;
        this.rootURL = 'http://localhost:33333/api/';
        this.formModel = this.fb.group({
            UserName: ['', Validators.required],
            Email: ['', Validators.email],
            FullName: [''],
            Passwords: this.fb.group({
                Password: ['', [Validators.required, Validators.minLength(4)]],
                ConfirmPassword: ['', [Validators.required, Validators.minLength(4)]]
            }, { validator: this.comparePasswords })
        });
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
            FullName: this.formModel.value.FullName,
            Password: this.formModel.value.Passwords.Password,
        };
        return this.http.post(this.rootURL + 'ApplicationUser/Register', body);
    }
    login(formData) {
        return this.http.post(this.rootURL + 'ApplicationUser/Login', formData);
    }
    getUserProfile() {
        return this.http.get(this.rootURL + 'UserProfile');
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
//# sourceMappingURL=userService.js.map