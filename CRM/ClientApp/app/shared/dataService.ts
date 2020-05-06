import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task, Process, Product, Resource, Type, User, UserByType, Status } from "../models/models";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { TaskType } from '@syncfusion/ej2-gantt';

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
        this.http.post(this.rootUrl + 'tasks/add/', task)
            .toPromise()
            .then(res => this.loadTasks())
            .catch(err => {
                console.log(err);
            });
    }

    updateTask(task: Task) {
        this.http.post(this.rootUrl + 'tasks/update/', task)
            .toPromise()
            .then(res => this.loadTasks())
            .catch(err => {
                console.log(err);
            });
    }

    updateUser(user: User) {
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

    deleteUser(id: string) {
        this.http.delete(this.rootUrl + 'users/' + id)
            .toPromise()
            .then(res => this.loadUsers())
            .catch(err => {
                console.log(err);
            });
    }

    getSortUsersByTypeId(id: number) {
        return this.http.get(this.rootUrl + "users/bytype?id=" + id)
            .toPromise()
            .then((res: UserByType[]) => {
                this.usersByType = res;
                this.users.forEach((u) => {
                    this.usersByType.forEach((ut) => {
                        if (ut.key == u.id) {
                            u.numberOfTasksByType = ut.value;
                        }
                    })
                })
                this.users = this.users.sort((u1, u2) => u1.numberOfTasksByType > u2.numberOfTasksByType ? -1 : 1);
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteTask(task: any) {
        this.http.delete(this.rootUrl + 'tasks/' + task)
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

    addTaskFromTaskCard(id:string="") {
        let task: Task = new Task();
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
        task.userId = id? id : this.taskCard.value["user"];
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
        if (this.taskCard.value["user"]) {
            if (task.userId != this.taskCard.value["user"]) {
                task.userId = this.taskCard.value["user"];
            }
        }

        this.updateTask(task);
    }

    updateUserFromCard() {
        let user = this.users.find((t) => t.id == this.userCard.value["id"]);
        user.email = this.userCard.value["email"];
        user.userName = this.userCard.value["name"];
        user.role = this.userCard.value["role"];

        this.updateUser(user);
    }

    initTaskCardById(id: any) {
        let t:Task = this.tasks.find((t) => t.id == id);
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

    loadStatuses(): Observable<boolean> {
        return this.http.get(this.rootUrl + "statuses")
            .pipe(
                map((data: any) => {
                    this.statuses = data;
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

    public populateUserCard(user: User) {
        this.userCard.setValue({
            id: user.id,
            name: user.userName,
            email: user.email,
            role: user.role
        })
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
            status:'',
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

    public taskCard: FormGroup = new FormGroup({
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

    public processCard: FormGroup = new FormGroup({
        id: new FormControl(0),
        name: new FormControl('', Validators.required),
        timeStart: new FormControl(new Date(), Validators.required),
        timeEnd: new FormControl(new Date(), Validators.required)
    });

    public userCard: FormGroup = new FormGroup({
        id: new FormControl(0),
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('', Validators.required)
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
    public statuses: Status[] = []; 
    public tasks: Task[] = []; 
    public add: boolean = true;
    public lastUserUpdate: Date = new Date();
    public usersByType: UserByType[] = [];
}
