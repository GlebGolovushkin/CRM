import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task, Process, Product, Resource, Type, User } from "../models/models";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
import { FormGroup, FormControl, Validators } from "@angular/forms"

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {

    }

    private rootUrl = "http://localhost:64971/api/";

    loadProccesses(): Observable<boolean> {
        return this.http.get(this.rootUrl + "processes")
            .pipe(
                map((data: any) => {
                    this.processes = data;
                    return true;
                })
            )
    }

    loadTasks(): Observable<boolean> {
        return this.http.get(this.rootUrl + "tasks")
            .pipe(
                map((data: any) => {
                    this.tasks = data;
                    return true;
                })
            )
    }

    addTask(task: Task) {
        this.http.post(this.rootUrl + 'tasks/', task)
            .toPromise()
            .then(res => this.loadTasks())
            .catch(err => {
                console.log(err);
            });
    }

    addProcess(process: Process) {
        this.http.post(this.rootUrl + 'processes/', process)
            .toPromise()
            .then(res => this.loadProccesses())
            .catch(err => {
                console.log(err);
            });
    }

    addType(type: Type) {
        this.http.post(this.rootUrl + 'types/', type)
            .toPromise()
            .then(res => this.loadTypes())
            .catch(err => {
                console.log(err);
            });
    }

    addProduct(product: Product) {
        this.http.post(this.rootUrl + 'resources/', product)
            .toPromise()
            .then(res => this.loadResources())
            .catch(err => {
                console.log(err);
            });
    }

    addTaskFromTaskCard() {
        let task: Task = new Task();
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
        let process: Process = new Process();
        process.name = this.processCard.value["name"];
        process.timeStart = this.processCard.value["timeStart"];
        process.timeEnd = this.processCard.value["timeEnd"];

        this.addProcess(process);
    }

    addTypeFromTypeCard() {
        let type: Type = new Type();
        type.name = this.typeCard.value["name"];

        this.addType(type);
    }

    addProductFromProductCard() {
        let product: Product = new Product();
        product.name = this.productCard.value["name"];

        this.addProduct(product);
    }

    loadResources(): Observable<boolean> {
        return this.http.get(this.rootUrl + "resources")
            .pipe(
                map((data: any) => {
                    this.resources = data;
                    this.products = data;
                    return true;
                })
            )
    }

    loadTypes(): Observable<boolean> {
        return this.http.get(this.rootUrl + "types")
            .pipe(
                map((data: any) => {
                    this.types = data;
                    return true;
                })
            )
    }

    loadUsers(): Observable<boolean> {
        return this.http.get(this.rootUrl + "users")
            .pipe(
                map((data: any) => {
                    this.users = data;
                    return true;
                })
            )
    }

    public initializeProcessCard() {
        this.processCard.setValue({
            id: null,
            name: "",
            timeStart: new Date(),
            timeEnd: new Date()
        });
    }

    public initializeTypeCard() {
        this.typeCard.setValue({
            id: null,
            name: ""
        });
    }

    public initializeProductCard() {
        this.productCard.setValue({
            id: null,
            name: ""
        });
    }

    public initializeTaskCard() {
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

    public taskCard: FormGroup = new FormGroup({
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

    public processCard: FormGroup = new FormGroup({
        id: new FormControl(0),
        name: new FormControl('', Validators.required),
        timeStart: new FormControl(new Date(), Validators.required),
        timeEnd: new FormControl(new Date(), Validators.required)
    });

    public typeCard: FormGroup = new FormGroup({
        id: new FormControl(0),
        name: new FormControl('', Validators.required)
    });

    public productCard: FormGroup = new FormGroup({
        id: new FormControl(0),
        name: new FormControl('', Validators.required)
    });

    public resourceCard: FormGroup = new FormGroup({
        id: new FormControl(0),
        name: new FormControl('', Validators.required)
    });

    public processes: Process[] = []; 
    public resources: Resource[] = []; 
    public products: Product[] = []; 
    public types: Type[] = []; 
    public users: User[] = []; 
    public tasks: Task[] = []; 
}
