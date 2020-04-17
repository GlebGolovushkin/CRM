import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        this.rootUrl = "http://localhost:64971/api/";
        this.processes = [];
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
};
DataService = __decorate([
    Injectable()
], DataService);
export { DataService };
//# sourceMappingURL=dataService.js.map