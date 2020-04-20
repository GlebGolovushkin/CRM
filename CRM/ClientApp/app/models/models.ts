export class Process {
    id: number;
    timeStart: Date;
    timeEnd: Date;
    name: string;
    tasks: Task[];
}

export class User {
    firstName: string;
    lastName?: any;
    tasks: Task[];
    id: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber?: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd?: any;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}

export class Task {
    id: number;
    timeStart: Date;
    timeEnd: Date;
    criticalDate: Date;
    name: string;
    product: Product;
    process: Process;
    parentId?: number;
    processId?: number;
    resourceId?: number;
    productId?: number;
    taskTypeId?: number;
    userId: string;
    resource: Product;
    type: Type;
    timeReserv: Date;
    priority: number;
    isImportant: boolean;
    isChangeTime: boolean;
    isChangeUsers: boolean;
    isStarted: boolean;
    isStopped: boolean;
    children?: Task[];
    parent?: Task;
    user: User;
}

export class Type {
    id: number;
    name: string;
    tasks: Task[];
}

export class Product {
    id: number;
    name: string;
    resourceTasks: Task[];
    productTasks: Task[];
}

export class Resource {
    id: number;
    name: string;
    resourceTasks: Task[];
    productTasks: Task[];
}

export class TaskView {
    id: number;
    name: string;
    timeStart: Date;
    timeEnd: Date;
    product: Product;
    resource: Resource;
    type: Type;
    timeReserv: Date;
    parent?: number;
    resourceIds: string[];
}

export class ResourceView {
    id: string;
    name: string;
}