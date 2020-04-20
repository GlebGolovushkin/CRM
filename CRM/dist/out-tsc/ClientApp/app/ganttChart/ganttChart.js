import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { TaskView, ResourceView } from "../models/models";
import { TaskCard } from "../tasks/task.component";
import { Gantt } from "node_modules/@syncfusion/ej2-gantt";
let GantChart = class GantChart {
    constructor(dataService, dialog) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.tasks = [];
        this.users = [];
        this.chartData = [];
        this.tasks = dataService.tasks;
    }
    ngOnInit() {
        this.renderChart();
    }
    renderChart() {
        this.dataService.loadUsers()
            .subscribe(success => {
            if (success) {
                this.users = this.dataService.users;
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
    renderGantt(tasks) {
        this.chartData = [];
        let resources = [];
        let ids = 0;
        tasks.forEach((t) => {
            let id = "";
            resources.forEach((r) => {
                if (r.id == t.userId) {
                    id = r.id;
                }
            });
            let taskView = new TaskView();
            if (id !== "") {
                taskView.resourceIds = [];
                taskView.resourceIds.push(id);
            }
            else {
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
                rightLabel: "name"
            },
            editSettings: {
                allowAdding: true
            },
            allowSelection: true
        });
        this.gantt.appendTo("#piechart");
    }
    onCreate() {
        this.dataService.initializeTaskCard();
        const dialogRef = this.dialog.open(TaskCard, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.gantt.destroy();
            this.renderChart();
        });
    }
};
GantChart = __decorate([
    Component({
        selector: "gantt-chart",
        templateUrl: "gantChart.component.html",
        styleUrls: []
    })
], GantChart);
export { GantChart };
//# sourceMappingURL=ganttChart.js.map