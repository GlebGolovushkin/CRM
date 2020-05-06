import { __decorate } from "tslib";
import { Component } from '@angular/core';
let UserListComponent = class UserListComponent {
    constructor(dataService, userService, dialogRef) {
        this.dataService = dataService;
        this.userService = userService;
        this.dialogRef = dialogRef;
        this.users = [];
        this.userRoles = [];
        this.roles = [];
    }
    ngOnInit() {
        this.loadData();
    }
    onSubmit() {
        this.dataService.updateUserFromCard();
        this.loadData();
        this.loadData();
    }
    onCancel() {
        this.dataService.userCard.reset();
        this.dialogRef.close();
    }
    onDelete(id) {
        this.dataService.deleteUser(id);
        this.loadData();
        this.loadData();
    }
    populateForm(user) {
        this.dataService.populateUserCard(user);
    }
    loadData() {
        this.dataService.loadUsers().subscribe(() => {
            this.users = this.dataService.users;
        });
        this.userService.loadRoles().subscribe(() => {
            this.roles = this.userService.roles;
        });
        this.userService.loadUserRoles().subscribe(() => {
            this.userRoles = this.userService.userRoles;
            this.userRoles.forEach((ur) => {
                this.users.forEach((u) => {
                    this.roles.forEach((r) => {
                        if (ur.roleId == r.id && ur.userId == u.id) {
                            u.role = r.name;
                        }
                    });
                    if (!u.role) {
                        u.role = this.roles[0].name;
                    }
                });
            });
        });
        this.userService.loadUserRoles().subscribe(() => {
            this.userRoles = this.userService.userRoles;
            this.userRoles.forEach((ur) => {
                this.users.forEach((u) => {
                    this.roles.forEach((r) => {
                        if (ur.roleId == r.id && ur.userId == u.id) {
                            u.role = r.name;
                        }
                    });
                });
            });
        });
    }
};
UserListComponent = __decorate([
    Component({
        selector: 'user-list',
        templateUrl: './userList.component.html',
        styles: []
    })
], UserListComponent);
export { UserListComponent };
//# sourceMappingURL=userList.component.js.map