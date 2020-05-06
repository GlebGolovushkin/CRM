import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { ProcessCard } from './processCard/process';
import { TypeCard } from './typeCard/type';
import { ProductCard } from './productCard/product';
let TaskCard = class TaskCard {
    constructor(dataService, dialogRef, dialog, userService) {
        this.dataService = dataService;
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.userService = userService;
        this.processes = [];
        this.resources = [];
        this.products = [];
        this.types = [];
        this.users = [];
        this.tasks = [];
        this.statuses = [];
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
    onClear() {
        this.dataService.taskCard.reset();
        this.dataService.initializeTaskCard();
        this.dialogRef.close();
    }
    onSubmit() {
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
    onDelete() {
        this.dataService.deleteTask(this.dataService.taskCard.value["id"]);
    }
    createProcess() {
        this.dataService.initializeTaskCard();
        const dialogRef = this.dialog.open(ProcessCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }
    sortUsersById() {
        this.dataService.getSortUsersByTypeId(this.dataService.taskCard.value["type"]);
        this.users = this.dataService.users;
    }
    sortTasksByProcess() {
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
    createType() {
        this.dataService.initializeTypeCard();
        const dialogRef = this.dialog.open(TypeCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
    }
    createProduct() {
        this.dataService.initializeProductCard();
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