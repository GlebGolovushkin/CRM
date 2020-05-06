export class Process {
    id: number;
    timeStart: Date;
    timeEnd: Date;
    name: string;
    tasks: Task[];
}

export class User {
    numberOfTasksByType: number;
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
    role: string;
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
    priority: number;
    isChangeTime: boolean;
    isChangeUsers: boolean;
    children?: Task[];
    parent?: Task;
    user: User;
    statusId: number;
    userQueuParentId: number;
    processQueuParentId: number;
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
    criticalDate: Date;
    parent?: number;
    resourceIds: string[];
}

export class ResourceView {
    id: string;
    name: string;
}

export class UserRole {
    userId: string;
    roleId: string;
}

export class Role {
    id: string;
    name: string;
    normalizedName: string;
    concurrencyStamp: string;
}

export class UserByType {
    key: string;
    value: number;
}

export class UserProfile {
    id: string;
    userName: string;
    email: string;
}

export class Status {
    id: number;
    name: string;
}