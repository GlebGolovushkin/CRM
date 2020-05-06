import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/dataService';
import { User, UserRole, Role } from '../models/models';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'user-list',
    templateUrl: './userList.component.html',
    styles: []
})
export class UserListComponent implements OnInit {

    constructor(public dataService: DataService, public userService: UserService, private dialogRef: MatDialogRef<UserListComponent>) { }

    ngOnInit() {
        this.loadData();
    }

    public onSubmit() {
        this.dataService.updateUserFromCard();
        this.loadData();
        this.loadData();
    }

    public onCancel() {
        this.dataService.userCard.reset();
        this.dialogRef.close();
    }

    public onDelete(id: string) {
        this.dataService.deleteUser(id);
        this.loadData();
        this.loadData();
    }

    public populateForm(user: User) {
        this.dataService.populateUserCard(user);
    }

    public loadData() {
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
                    })
                    if (!u.role) {
                        u.role = this.roles[0].name;
                    }
                })
            })
        });

        this.userService.loadUserRoles().subscribe(() => {
            this.userRoles = this.userService.userRoles;
            this.userRoles.forEach((ur) => {
                this.users.forEach((u) => {
                    this.roles.forEach((r) => {
                        if (ur.roleId == r.id && ur.userId == u.id) {
                            u.role = r.name;
                        }
                    })
                })
            })
        });
    }

    public users: User[] = []
    public userRoles: UserRole[] = []
    public roles: Role[] = []
}
