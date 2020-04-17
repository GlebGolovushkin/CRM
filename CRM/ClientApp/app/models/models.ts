export interface User {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
}

export interface Product {
    id: number;
    name: string;
}

export class Resource {
    id: number;
    name: string;
}

export interface Type {
    id: number;
    name: string;
}

export interface Task {
    id: string;
    timeStart: Date;
    timeEnd: Date;
    name: string;
    user: User;
    products: Product[];
    resources: Resource[];
    type: Type;
    timeReserv: Date;
    priority: number;
    isImportant: boolean;
    isChangeTime: boolean;
    isChangeUsers: boolean;
    isStarted: boolean;
    isStopped: boolean;
    parent: Task;
    children: Task[];
}

export class TaskView {
    id: string;
    name: string;
    timeStart: Date;
    timeEnd: Date;
    products: Product[];
    resources: Resource[];
    type: Type;
    timeReserv: Date;
    parent: string;
    resource: number[];
}

export interface Process {
    id: number;
    timeStart: Date;
    timeEnd: Date;
    name: string;
    tasks: Task[];
}

