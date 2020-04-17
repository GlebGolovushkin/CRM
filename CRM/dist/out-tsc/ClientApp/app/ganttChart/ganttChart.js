import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { TaskView, Resource } from "../models/models";
import { Gantt } from "node_modules/@syncfusion/ej2-gantt";
let GantChart = class GantChart {
    constructor(dataService) {
        this.dataService = dataService;
        this.tasks = [];
        this.chartData = [];
        this.tasks = dataService.tasks;
    }
    ngOnInit() {
        this.renderChart();
    }
    renderChart() {
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
            var _a;
            let id = -1;
            resources.forEach((r) => {
                if (r.name == t.user.userName) {
                    id = r.id;
                }
            });
            let taskView = new TaskView();
            if (id !== -1) {
                taskView.resource = [];
                taskView.resource.push(id);
            }
            else {
                let res = new Resource();
                res.id = ++ids;
                res.name = t.user.userName;
                resources.push(res);
                taskView.resource = [];
                taskView.resource.push(ids);
            }
            taskView.id = t.id;
            taskView.name = t.name;
            taskView.parent = (_a = t.parent) === null || _a === void 0 ? void 0 : _a.id;
            taskView.products = t.products;
            taskView.resources = t.resources;
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
                resourceInfo: "resource"
            },
            resources: resources,
            resourceIDMapping: "id",
            resourceNameMapping: "name",
            labelSettings: {
                leftLabel: "resource",
                rightLabel: "name"
            },
            editSettings: {
                allowAdding: true
            },
            allowSelection: true
        });
        this.gantt.appendTo("#piechart");
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