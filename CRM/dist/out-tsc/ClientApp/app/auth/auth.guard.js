import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    canActivate(next, state) {
        if (localStorage.getItem('token') != null) {
            let roles = next.data['permittedRoles'];
            if (roles) {
                if (this.service.roleMatch(roles)) {
                    return true;
                }
                else {
                    this.router.navigate(['/forbidden']);
                    return false;
                }
            }
        }
        else {
            this.router.navigate(['/user/login']);
            return false;
        }
    }
    canActivateChild(next, state) {
        return true;
    }
    canLoad(route, segments) {
        return true;
    }
};
AuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map