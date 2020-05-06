import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        this.formModel = {
            UserName: '',
            Password: ''
        };
    }
    ngOnInit() {
        if (localStorage.getItem('token') != null) {
            this.router.navigate(['/info']);
        }
    }
    onSubmit(form) {
        this.service.login(form.value).subscribe((res) => {
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('/info');
            this.service.getUserProfile();
        }, err => {
            if (err.status == 400) {
                this.toastr.error('Incorrect username or password.', 'Authentification failed.');
            }
            else {
                console.log(err);
            }
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styles: []
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map