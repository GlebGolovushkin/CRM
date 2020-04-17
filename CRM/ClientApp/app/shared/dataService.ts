import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task, Process } from "../models/models";
import { Observable } from "rxjs";
import {map} from "rxjs/operators"

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

    public processes: Process[] = []; 
    public tasks: Task[] = []; 
}
