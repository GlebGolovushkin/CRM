import { __decorate } from "tslib";
import { Component } from '@angular/core';
let RegistrationComponent = class RegistrationComponent {
    constructor(service, toastr, router) {
        this.service = service;
        this.toastr = toastr;
        this.router = router;
    }
    ngOnInit() {
        if (localStorage.getItem('token') != null) {
            this.router.navigate(['/info']);
        }
        this.service.formModel.reset();
    }
    onSubmit() {
        this.service.register().subscribe((res) => {
            if (res.token != null) {
                this.service.formModel.reset();
                this.toastr.success("Login was created!", "Registration successful.");
                localStorage.setItem('token', res.token);
                this.router.navigateByUrl('/info');
            }
            else {
                res.errors.forEach(error => {
                    switch (error.Code) {
                        case 'DuplicateUserName':
                            this.toastr.error("Username is already taken", "Registration Failed.");
                            break;
                        default:
                            this.toastr.error(error.Description, "Registration Failed.");
                    }
                });
            }
        }, err => {
            console.log(err);
        });
    }
};
RegistrationComponent = __decorate([
    Component({
        selector: 'app-registration',
        templateUrl: './registration.component.html',
        styles: []
    })
], RegistrationComponent);
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map