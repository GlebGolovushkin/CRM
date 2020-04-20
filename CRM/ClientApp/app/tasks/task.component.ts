import { Component } from "@angular/core";
import { DataService } from "../shared/dataService";
import { Process, Resource, Product, Type, User, Task } from '../models/models';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ProcessCard } from './processCard/process';
import { TypeCard } from './typeCard/type';
import { ProductCard } from './productCard/product';

@Component({
    selector: "task",
    templateUrl: "task.component.html",
    styleUrls: []
})

export class TaskCard{
    constructor(public service: DataService, private dialogRef: MatDialogRef<TaskCard>, private dialog: MatDialog) {
        this.service.loadTasks()
            .subscribe(success => {
                if (success) {
                    this.tasks = this.service.tasks;
                }
            });
        this.service.loadProccesses()
            .subscribe(success => {
                if (success) {
                    this.processes = this.service.processes;
                }
            });
        this.service.loadResources()
            .subscribe(success => {
                if (success) {
                    this.resources = this.service.resources;
                    this.products = this.service.products;
                }
            });
        this.service.loadTypes()
            .subscribe(success => {
                if (success) {
                    this.types = this.service.types;
                }
            });
        this.service.loadUsers()
            .subscribe(success => {
                if (success) {
                    this.users = this.service.users;
                }
            });
    }

    public processes: Process[] = [];
    public resources: Resource[] = [];
    public products: Product[] = [];
    public types: Type[] = [];
    public users: User[] = [];
    public tasks: Task[] = []; 

    public onClear() {
        this.service.taskCard.reset();
        this.service.initializeTaskCard();
        this.dialogRef.close();
    }

    public onSubmit() {
        if (this.service.taskCard.valid) {
            this.service.addTaskFromTaskCard();
        }

        this.onClear();
    }



    public createProcess(): void {
        this.service.initializeTaskCard();
        const dialogRef = this.dialog.open(ProcessCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }

    public createType(): void {
        this.service.initializeTypeCard();
        const dialogRef = this.dialog.open(TypeCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }

    public createProduct(): void {
        this.service.initializeProductCard();
        const dialogRef = this.dialog.open(ProductCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }
}