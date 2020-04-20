import { Component, OnInit } from "@angular/core";
import { Task, Resource, TaskView, ResourceView, User, Process } from "../models/models";
import { TaskCard } from "../tasks/task.component";
import { DataService } from '../shared/dataService';
import { Gantt } from "node_modules/@syncfusion/ej2-gantt";
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: "gantt-chart",
    templateUrl: "gantChart.component.html",
    styleUrls: []
})
export class GantChart implements OnInit {
    constructor(private dataService: DataService, private dialog: MatDialog) {
        this.tasks = dataService.tasks;
    }

    ngOnInit(): void {
        this.renderChart()
    }

    public gantt: Gantt;

    public tasks: Task[] = [];
    public users: User[] = [];
    public processes: Process[] = [];
    public lastUpdate:Date = new Date();
    public chartData: TaskView[] = [];
    public selectedUserId: string = "";
    public selectedProcessId: number = 0;

    public renderChart() {
        this.dataService.loadUsers()
            .subscribe(success => {
                if (success) {
                    this.users = this.dataService.users;
                }
            });
        this.dataService.loadProccesses()
            .subscribe(success => {
                if (success) {
                    this.processes = this.dataService.processes;
                }
            });
        this.dataService.loadTasks()
            .subscribe(success => {
                if (success) {
                    this.tasks = this.dataService.tasks;
                    this.renderGantt(this.tasks);
                }
            });
    }

    public renderGantt(tasks: Task[]) {
        let isUserSelect: boolean = this.selectedUserId?.length > 0;
        let isProcessSelect: boolean = this.selectedProcessId > 0;
        let add: boolean = true;
        this.chartData = [];
        let resources: ResourceView[] = [];
        let ids: number = 0;
        tasks.forEach((t) => {
            add = true;
            if ((isUserSelect && t.userId != this.selectedUserId) || (isProcessSelect && t.processId != this.selectedProcessId)) {
                add = false;
            }
            if (add) {
                let id: string = "";
                resources.forEach((r) => {
                    if (r.id == t.userId) {
                        id = r.id;
                    }
                });
                let taskView = new TaskView();

                if (id !== "") {
                    taskView.resourceIds = [];
                    taskView.resourceIds.push(id);
                } else {
                    let res = new ResourceView();
                    res.id = t.userId;
                    res.name = this.users.find((u) => u.id == t.userId).userName;
                    resources.push(res);
                    taskView.resourceIds = [];
                    taskView.resourceIds.push(res.id);
                }

                taskView.id = t.id;
                taskView.name = t.name;
                taskView.parent = t.parentId;
                taskView.product = t.product;
                taskView.resource = t.resource;
                taskView.timeEnd = t.timeEnd;
                taskView.timeStart = t.timeStart;
                taskView.timeReserv = t.timeReserv;
                taskView.type = t.type;
                this.chartData.push(taskView);
            }
        });

        this.gantt = new Gantt({
            dataSource: this.chartData,
            height: '600px',
            includeWeekend: true,
            taskFields: {
                name: 'name',
                startDate: 'timeStart',
                endDate: 'timeEnd',
                id: 'id',
                dependency: "parent",
                resourceInfo: "resourceIds"
            },
            resources: resources,
            resourceIDMapping: "id",
            resourceNameMapping: "name",
            labelSettings: {
                leftLabel: "resourceIds",
                rightLabel:"name"
            },
            editSettings: {
                allowAdding: true
            },
            allowSelection: true
        });

        this.gantt.appendTo("#piechart");
    }

    public onCreate(): void {
        this.dataService.initializeTaskCard();
        const dialogRef = this.dialog.open(TaskCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });

        dialogRef.afterClosed().subscribe(result => {
            this.reRenderGantt();
        });
    }

    public reRenderGantt() {
        var time = new Date().getTime() - this.lastUpdate.getTime();
        if (time > 500) {
            this.gantt.destroy();
            this.renderChart();
        }

        this.lastUpdate = new Date();
    }

}