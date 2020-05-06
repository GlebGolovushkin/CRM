import { Component } from "@angular/core";
import { DataService } from "../shared/dataService";
import { Process, Resource, Product, Type, User, Task, Status } from '../models/models';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProcessCard } from './processCard/process';
import { TypeCard } from './typeCard/type';
import { ProductCard } from './productCard/product';
import { UserService } from '../shared/user.service';

@Component({
    selector: "task",
    templateUrl: "task.component.html",
    styleUrls: []
})

export class TaskCard {
    constructor(public dataService: DataService, private dialogRef: MatDialogRef<TaskCard>, private dialog: MatDialog, public userService: UserService) {
        this.dataService.loadStatuses()
            .subscribe(success => {
                if (success) {
                    this.statuses = this.dataService.statuses;
                }
            });
        this.dataService.loadTasks()
            .subscribe(success => {
                if (success) {
                    this.tasks = this.dataService.tasks;
                }
            });
        this.dataService.loadProccesses()
            .subscribe(success => {
                if (success) {
                    this.processes = this.dataService.processes;
                }
            });
        this.dataService.loadResources()
            .subscribe(success => {
                if (success) {
                    this.resources = this.dataService.resources;
                    this.products = this.dataService.products;
                }
            });
        this.dataService.loadTypes()
            .subscribe(success => {
                if (success) {
                    this.types = this.dataService.types;
                }
            });
        this.dataService.loadUsers()
            .subscribe(success => {
                if (success) {
                    this.users = this.dataService.users;
                }
            });
        this.userService.getUserProfile();
    }

    public processes: Process[] = [];
    public resources: Resource[] = [];
    public products: Product[] = [];
    public types: Type[] = [];
    public users: User[] = [];
    public tasks: Task[] = [];
    public statuses: Status[] = []; 

    public onClear() {
        this.dataService.taskCard.reset();
        this.dataService.initializeTaskCard();
        this.dialogRef.close();
    }

    public onSubmit() {
        if (this.dataService.taskCard.valid) {
            if (this.dataService.add) {
                if (!this.dataService.taskCard.value["user"]) {
                    this.dataService.addTaskFromTaskCard(this.userService.userProfile.id);
                }
                this.dataService.addTaskFromTaskCard();
            }
            else {
                this.dataService.updateTaskFromTaskCard();
            }
        }

        this.onClear();
    }

    public onDelete() {
        this.dataService.deleteTask(this.dataService.taskCard.value["id"])
    }



    public createProcess(): void {
        this.dataService.initializeTaskCard();
        const dialogRef = this.dialog.open(ProcessCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }

    public sortUsersById() {
        this.dataService.getSortUsersByTypeId(this.dataService.taskCard.value["type"]);
        this.users = this.dataService.users;
    }

    public sortTasksByProcess() {
        this.dataService.loadTasks()
            .subscribe(success => {
                if (success) {
                    this.tasks = this.dataService.tasks;
                    if (this.dataService.taskCard.value["process"] != null) {
                        this.tasks = this.tasks.filter(t => t.processId == this.dataService.taskCard.value["process"]);
                    }
                }
            });
    }

    public createType(): void {
        this.dataService.initializeTypeCard();
        const dialogRef = this.dialog.open(TypeCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }

    public createProduct(): void {
        this.dataService.initializeProductCard();
        const dialogRef = this.dialog.open(ProductCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }
}