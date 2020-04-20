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
            user: new FormControl('', Validators.required),
            type: new FormControl(''),
            timeReserv: new FormControl(new Date(), Validators.required),
            priority: new FormControl(3),
            isImportant: new FormControl(false),
            isChangeTime: new FormControl(false),
            isChangeUsers: new FormControl(false),
            isStarted: new FormControl(false),
            isStopped: new FormControl(false),
            parent: new FormControl(new Task()),
            process: new FormControl(new Process(), Validators.required)
        });
        this.processCard = new FormGroup({
            id: new FormControl(0),
            name: new FormControl('', Validators.required),
            timeStart: new FormControl(new Date(), Validators.required),
            timeEnd: new FormControl(new Date(), Validators.required)
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
        this.tasks = [];
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
        this.http.post(this.rootUrl + 'tasks/', task)
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
    addTaskFromTaskCard() {
        let task = new Task();
        task.isChangeTime = this.taskCard.value["isChangeTime"];
        task.isChangeUsers = this.taskCard.value["isChangeUsers"];
        task.isImportant = this.taskCard.value["isImportant"];
        task.isStarted = this.taskCard.value["isStarted"];
        task.isStopped = this.taskCard.value["isStopped"];
        task.name = this.taskCard.value["name"];
        task.priority = this.taskCard.value["priority"];
        task.timeEnd = this.taskCard.value["timeEnd"];
        task.timeReserv = this.taskCard.value["timeReserv"];
        task.timeStart = this.taskCard.value["timeStart"];
        task.parentId = this.taskCard.value["parent"];
        task.productId = this.taskCard.value["product"];
        task.resourceId = this.taskCard.value["resource"];
        task.userId = this.taskCard.value["user"];
        task.taskTypeId = this.taskCard.value["type"];
        task.processId = this.taskCard.value["process"];
        this.addTask(task);
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
            product: '',
            resource: '',
            user: '',
            type: '',
            timeReserv: new Date(),
            priority: 1,
            isImportant: false,
            isChangeTime: false,
            isChangeUsers: false,
            isStarted: false,
            isStopped: false,
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