import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { ProcessCard } from './processCard/process';
import { TypeCard } from './typeCard/type';
import { ProductCard } from './productCard/product';
let TaskCard = class TaskCard {
    constructor(service, dialogRef, dialog) {
        this.service = service;
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.processes = [];
        this.resources = [];
        this.products = [];
        this.types = [];
        this.users = [];
        this.tasks = [];
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
    onClear() {
        this.service.taskCard.reset();
        this.service.initializeTaskCard();
        this.dialogRef.close();
    }
    onSubmit() {
        if (this.service.taskCard.valid) {
            this.service.addTaskFromTaskCard();
        }
        this.onClear();
    }
    createProcess() {
        this.service.initializeTaskCard();
        const dialogRef = this.dialog.open(ProcessCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }
    createType() {
        this.service.initializeTypeCard();
        const dialogRef = this.dialog.open(TypeCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }
    createProduct() {
        this.service.initializeProductCard();
        const dialogRef = this.dialog.open(ProductCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }
};
TaskCard = __decorate([
    Component({
        selector: "task",
        templateUrl: "task.component.html",
        styleUrls: []
    })
], TaskCard);
export { TaskCard };
//# sourceMappingURL=task.component.js.map