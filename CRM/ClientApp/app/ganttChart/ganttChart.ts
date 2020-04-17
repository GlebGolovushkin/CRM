import { Component, OnInit } from "@angular/core";
import { Task, TaskView, Resource } from "../models/models";
import { TaskCard } from "../tasks/task.component";
import { DataService } from '../shared/dataService';
import { Gantt } from "node_modules/@syncfusion/ej2-gantt";

@Component({
    selector: "gantt-chart",
    templateUrl: "gantChart.component.html",
    styleUrls: []
})
export class GantChart implements OnInit {
    constructor(private dataService: DataService) {
        this.tasks = dataService.tasks;
    }

    ngOnInit(): void {
        this.renderChart()
    }

    public gantt: Gantt;

    public tasks: Task[] = [];
    public chartData: TaskView[] = [];

    public renderChart() {
        this.dataService.loadTasks()
            .subscribe(success => {
                if (success) {
                    this.tasks = this.dataService.tasks;
                    this.renderGantt(this.tasks);
                }
            });
    }

    public renderGantt(tasks: Task[]) {
        this.chartData = [];
        let resources: Resource[] = [];
        let ids: number = 0;
        tasks.forEach((t) => {
            let id: number=-1;
            resources.forEach((r) => {
                if (r.name == t.user.userName) {
                    id = r.id;
                }
            });
            let taskView = new TaskView();

            if (id !== -1) {
                taskView.resource = [];
                taskView.resource.push(id);
            } else {
                let res = new Resource();
                res.id = ++ids;
                res.name = t.user.userName;
                resources.push(res);
                taskView.resource = [];
                taskView.resource.push(ids);
            }

            taskView.id = t.id;
            taskView.name = t.name;
            taskView.parent = t.parent?.id;
            taskView.products = t.products;
            taskView.resources = t.resources;
            taskView.timeEnd = t.timeEnd;
            taskView.timeStart = t.timeStart;
            taskView.timeReserv = t.timeReserv;
            taskView.type = t.type;
            this.chartData.push(taskView)
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
                resourceInfo: "resource"
            },
            resources: resources,
            resourceIDMapping: "id",
            resourceNameMapping: "name",
            labelSettings: {
                leftLabel: "resource",
                rightLabel:"name"
            },
            editSettings: {
                allowAdding: true
            },
            allowSelection: true
        });

        this.gantt.appendTo("#piechart");
    }

}