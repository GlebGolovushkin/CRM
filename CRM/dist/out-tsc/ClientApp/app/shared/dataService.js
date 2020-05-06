import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { Task, Process, Product, Type } from "../models/models";
import { map } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from "@angular/forms";
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        this.rootUrl = "http://localhost:64971/api/";
        this.taskCard = new FormGroup({
            id: new FormControl(0),
            name: new FormControl('', Validators.required),
            timeStart: new FormControl(new Date(), Validators.required),
            timeEnd: new FormControl(new Date(), Validators.required),
            product: new FormControl(''),
            resource: new FormControl(''),
            user: new FormControl(''),
            type: new FormControl(''),
            criticalDate: new FormControl(new Date(), Validators.required),
            priority: new FormControl(3),
            isChangeTime: new FormControl(false),
            isChangeUsers: new FormControl(false),
            status: new FormControl(''),
            parent: new FormControl(new Task()),
            process: new FormControl(new Process(), Validators.required)
        });
        this.processCard = new FormGroup({
            id: new FormControl(0),
            name: new FormControl('', Validators.required),
            timeStart: new FormControl(new Date(), Validators.required),
            timeEnd: new FormControl(new Date(), Validators.required)
        });
        this.userCard = new FormGroup({
            id: new FormControl(0),
            name: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            role: new FormControl('', Validators.required)
        });
        this.typeCard = new FormGroup({
            id: new FormControl(0),
            name: new FormControl('', Validators.required)
        });
        this.productCard = new FormGroup({
            id: new FormControl(0),
            name: new FormControl('', Validators.required)
        });
        this.resourceCard = new FormGroup({
            id: new FormControl(0),
            name: new FormControl('', Validators.required)
        });
        this.processes = [];
        this.resources = [];
        this.products = [];
        this.types = [];
        this.users = [];
        this.statuses = [];
        this.tasks = [];
        this.add = true;
        this.lastUserUpdate = new Date();
        this.usersByType = [];
    }
    loadProccesses() {
        return this.http.get(this.rootUrl + "processes")
            .pipe(map((data) => {
            this.processes = data;
            return true;
        }));
    }
    loadTasks() {
        return this.http.get(this.rootUrl + "tasks")
            .pipe(map((data) => {
            this.tasks = data;
            return true;
        }));
    }
    addTask(task) {
        this.http.post(this.rootUrl + 'tasks/add/', task)
            .toPromise()
            .then(res => this.loadTasks())
            .catch(err => {
            console.log(err);
        });
    }
    updateTask(task) {
        this.http.post(this.rootUrl + 'tasks/update/', task)
            .toPromise()
            .then(res => this.loadTasks())
            .catch(err => {
            console.log(err);
        });
    }
    updateUser(user) {
        var res = new Date().getTime() - this.lastUserUpdate.getTime();
        if (res > 500) {
            this.lastUserUpdate = new Date();
            this.http.post(this.rootUrl + 'users/update/', user)
                .toPromise()
                .then(res => this.loadUsers())
                .catch(err => {
                console.log(err);
            });
        }
    }
    deleteUser(id) {
        this.http.delete(this.rootUrl + 'users/' + id)
            .toPromise()
            .then(res => this.loadUsers())
            .catch(err => {
            console.log(err);
        });
    }
    getSortUsersByTypeId(id) {
        return this.http.get(this.rootUrl + "users/bytype?id=" + id)
            .toPromise()
            .then((res) => {
            this.usersByType = res;
            this.users.forEach((u) => {
                this.usersByType.forEach((ut) => {
                    if (ut.key == u.id) {
                        u.numberOfTasksByType = ut.value;
                    }
                });
            });
            this.users = this.users.sort((u1, u2) => u1.numberOfTasksByType > u2.numberOfTasksByType ? -1 : 1);
        })
            .catch(err => {
            console.log(err);
        });
    }
    deleteTask(task) {
        this.http.delete(this.rootUrl + 'tasks/' + task)
            .toPromise()
            .then(res => this.loadTasks())
            .catch(err => {
            console.log(err);
        });
    }
    addProcess(process) {
        this.http.post(this.rootUrl + 'processes/', process)
            .toPromise()
            .then(res => this.loadProccesses())
            .catch(err => {
            console.log(err);
        });
    }
    addType(type) {
        this.http.post(this.rootUrl + 'types/', type)
            .toPromise()
            .then(res => this.loadTypes())
            .catch(err => {
            console.log(err);
        });
    }
    addProduct(product) {
        this.http.post(this.rootUrl + 'resources/', product)
            .toPromise()
            .then(res => this.loadResources())
            .catch(err => {
            console.log(err);
        });
    }
    addTaskFromTaskCard(id = "") {
        let task = new Task();
        task.isChangeTime = this.taskCard.value["isChangeTime"];
        task.isChangeUsers = this.taskCard.value["isChangeUsers"];
        task.name = this.taskCard.value["name"];
        task.priority = this.taskCard.value["priority"];
        task.timeEnd = this.taskCard.value["timeEnd"];
        task.criticalDate = this.taskCard.value["criticalDate"];
        task.timeStart = this.taskCard.value["timeStart"];
        task.parentId = this.taskCard.value["parent"];
        task.productId = this.taskCard.value["product"];
        task.resourceId = this.taskCard.value["resource"];
        task.userId = id ? id : this.taskCard.value["user"];
        task.taskTypeId = this.taskCard.value["type"];
        task.processId = this.taskCard.value["process"];
        this.addTask(task);
    }
    updateTaskFromTaskCard() {
        let task = this.tasks.find((t) => t.id == this.taskCard.value["id"]);
        task.name = this.taskCard.value["name"];
        task.timeEnd = this.taskCard.value["timeEnd"];
        task.criticalDate = this.taskCard.value["criticalDate"];
        task.timeStart = this.taskCard.value["timeStart"];
        task.statusId = this.taskCard.value["status"];
        this.updateTask(task);
    }
    updateUserFromCard() {
        let user = this.users.find((t) => t.id == this.userCard.value["id"]);
        user.email = this.userCard.value["email"];
        user.userName = this.userCard.value["name"];
        user.role = this.userCard.value["role"];
        this.updateUser(user);
    }
    initTaskCardById(id) {
        let t = this.tasks.find((t) => t.id == id);
        this.taskCard.setValue({
            id: t.id,
            name: t.name,
            status: t.statusId ? this.statuses.find((p) => p.id == t.statusId).name : "",
            timeStart: t.timeStart,
            timeEnd: t.timeEnd,
            product: t.productId ? this.products.find((p) => p.id == t.productId).name : "",
            resource: t.resourceId ? this.resources.find((p) => p.id == t.resourceId).name : "",
            user: t.userId ? this.users.find((p) => p.id == t.userId).userName : "",
            type: t.taskTypeId ? this.types.find((p) => p.id == t.taskTypeId).name : "",
            criticalDate: t.criticalDate,
            priority: t.priority,
            isChangeTime: t.isChangeTime,
            isChangeUsers: t.isChangeUsers,
            parent: t.parentId ? this.tasks.find((p) => p.id == t.parentId).name : "",
            process: t.processId ? this.processes.find((p) => p.id == t.processId).name : "",
        });
    }
    addProcessFromProcessCard() {
        let process = new Process();
        process.name = this.processCard.value["name"];
        process.timeStart = this.processCard.value["timeStart"];
        process.timeEnd = this.processCard.value["timeEnd"];
        this.addProcess(process);
    }
    addTypeFromTypeCard() {
        let type = new Type();
        type.name = this.typeCard.value["name"];
        this.addType(type);
    }
    addProductFromProductCard() {
        let product = new Product();
        product.name = this.productCard.value["name"];
        this.addProduct(product);
    }
    loadResources() {
        return this.http.get(this.rootUrl + "resources")
            .pipe(map((data) => {
            this.resources = data;
            this.products = data;
            return true;
        }));
    }
    loadTypes() {
        return this.http.get(this.rootUrl + "types")
            .pipe(map((data) => {
            this.types = data;
            return true;
        }));
    }
    loadStatuses() {
        return this.http.get(this.rootUrl + "statuses")
            .pipe(map((data) => {
            this.statuses = data;
            return true;
        }));
    }
    loadUsers() {
        return this.http.get(this.rootUrl + "users")
            .pipe(map((data) => {
            this.users = data;
            return true;
        }));
    }
    initializeProcessCard() {
        this.processCard.setValue({
            id: null,
            name: "",
            timeStart: new Date(),
            timeEnd: new Date()
        });
    }
    populateUserCard(user) {
        this.userCard.setValue({
            id: user.id,
            name: user.userName,
            email: user.email,
            role: user.role
        });
    }
    initializeTypeCard() {
        this.typeCard.setValue({
            id: null,
            name: ""
        });
    }
    initializeProductCard() {
        this.productCard.setValue({
            id: null,
            name: ""
        });
    }
    initializeTaskCard() {
        this.taskCard.setValue({
            id: null,
            name: "",
            timeStart: new Date(),
            timeEnd: new Date(),
            status: '',
            product: '',
            resource: '',
            user: '',
            type: '',
            criticalDate: new Date(),
            priority: 1,
            isChangeTime: false,
            isChangeUsers: false,
            parent: '',
            process: '',
        });
    }
};
DataService = __decorate([
    Injectable()
], DataService);
export { DataService };
//# sourceMappingURL=dataService.js.map