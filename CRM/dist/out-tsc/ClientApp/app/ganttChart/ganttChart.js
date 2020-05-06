import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { TaskView, ResourceView, UserProfile } from "../models/models";
import { TaskCard } from "../tasks/task.component";
import { Gantt, Selection } from "node_modules/@syncfusion/ej2-gantt";
import { UserListComponent } from '../userList/userList.component';
Gantt.Inject(Selection);
let GantChart = class GantChart {
    constructor(dataService, dialog, userService) {
        this.dataService = dataService;
        this.dialog = dialog;
        this.userService = userService;
        this.tasks = [];
        this.users = [];
        this.processes = [];
        this.types = [];
        this.resources = [];
        this.products = [];
        this.lastUpdate = new Date();
        this.chartData = [];
        this.statuses = [];
        this.selectedUserId = "";
        this.selectedProcessId = 0;
        this.userProfile = new UserProfile();
        this.tasks = dataService.tasks;
    }
    ngOnInit() {
        this.renderChart();
    }
    renderChart() {
        this.dataService.loadProccesses()
            .subscribe(success => {
            if (success) {
                this.processes = this.dataService.processes;
            }
        });
        this.dataService.loadStatuses()
            .subscribe(success => {
            if (success) {
                this.statuses = this.dataService.statuses;
            }
        });
        this.dataService.loadUsers()
            .subscribe(suc => {
            if (suc) {
                this.users = this.dataService.users;
                this.dataService.loadTasks()
                    .subscribe(success => {
                    if (success) {
                        this.userService.getUserProfile().then((data) => {
                            this.userProfile = this.userService.userProfile;
                            if (this.userService.roleMatch(['Head'])) {
                                this.tasks = this.dataService.tasks;
                            }
                            else {
                                this.tasks = [];
                                this.dataService.tasks.forEach((t) => {
                                    if (t.userId == this.userProfile.id) {
                                        this.tasks.push(t);
                                    }
                                });
                            }
                            this.renderGantt(this.tasks);
                        });
                    }
                });
            }
        });
        this.dataService.loadResources()
            .subscribe(success => {
            if (success) {
                this.products = this.dataService.resources;
                this.resources = this.dataService.resources;
            }
        });
        this.dataService.loadTypes()
            .subscribe(success => {
            if (success) {
                this.types = this.dataService.types;
            }
        });
    }
    renderGantt(tasks) {
        var _a;
        let addedIds = [];
        let isUserSelect = ((_a = this.selectedUserId) === null || _a === void 0 ? void 0 : _a.length) > 0;
        let isProcessSelect = this.selectedProcessId > 0;
        let add = true;
        this.chartData = [];
        let resources = [];
        let ids = 0;
        var userSelectedPreviousId = 0;
        if (!this.userService.roleMatch(['Head'])) {
            isUserSelect = true;
            this.selectedUserId = this.userProfile.id;
        }
        tasks = tasks.sort((t1, t2) => t1.criticalDate > t2.criticalDate ? 1 : -1);
        let process = [];
        tasks.forEach((t) => {
            if (!process.includes(t.processId)) {
                process.push(t.processId);
            }
        });
        process.forEach((p) => {
            let resultTasks = [];
            tasks.forEach((t) => {
                if (t.processId == p) {
                    if (!resultTasks.includes(t)) {
                        if (!t.parentId) {
                            resultTasks.push(t);
                        }
                        else if (resultTasks.includes(tasks.find(s => s.id == t.parentId))) {
                            resultTasks.push(t);
                        }
                        else {
                            var e = tasks.find(s => s.id == t.parentId);
                            resultTasks.push(e);
                            resultTasks.push(t);
                        }
                    }
                }
            });
            let previousId = 0;
            if (isUserSelect) {
                previousId = userSelectedPreviousId;
            }
            resultTasks.forEach((t) => {
                add = true;
                if ((isUserSelect && t.userId != this.selectedUserId) || (isProcessSelect && t.processId != this.selectedProcessId)) {
                    add = false;
                }
                if (add) {
                    if (t.parentId == null) {
                        t.parentId = previousId;
                        previousId = t.id;
                    }
                    else {
                        let tt = tasks.find(x => x.id == t.parentId);
                        if ((isUserSelect && tt.userId != this.selectedUserId) || (isProcessSelect && t.processId != this.selectedProcessId)) {
                            t.parentId = previousId;
                        }
                        previousId = t.id;
                    }
                    userSelectedPreviousId = previousId;
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
                        let user = this.users.find((u) => u.id == t.userId);
                        if (user) {
                            let res = new ResourceView();
                            res.id = t.userId;
                            res.name = user.userName;
                            resources.push(res);
                            taskView.resourceIds = [];
                            taskView.resourceIds.push(res.id);
                        }
                    }
                    taskView.id = t.id;
                    taskView.name = t.name;
                    taskView.parent = t.parentId;
                    taskView.product = t.product;
                    taskView.resource = t.resource;
                    taskView.timeEnd = t.timeEnd;
                    taskView.timeStart = t.timeStart;
                    taskView.criticalDate = t.criticalDate;
                    taskView.type = t.type;
                    if (!addedIds.includes(taskView.id)) {
                        addedIds.push(taskView.id);
                        this.chartData.push(taskView);
                    }
                }
            });
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
            this.reRenderGantt();
        });
    }
    reRenderGantt() {
        var time = new Date().getTime() - this.lastUpdate.getTime();
        if (time > 500) {
            this.gantt.destroy();
            this.renderChart();
        }
        this.lastUpdate = new Date();
    }
    eventList() {
        this.gantt.rowSelecting();
    }
    onDelete() {
        this.dataService.deleteTask(this.chartData[this.gantt.selectedRowIndex].id);
        this.reRenderGantt();
    }
    onUpdate() {
        var _a;
        if (((_a = this.gantt) === null || _a === void 0 ? void 0 : _a.selectedRowIndex) > -1) {
            this.dataService.add = false;
            this.dataService.initTaskCardById(this.chartData[this.gantt.selectedRowIndex].id);
            const dialogRef = this.dialog.open(TaskCard, {
                disableClose: true,
                autoFocus: true,
                width: "60%"
            });
            dialogRef.afterClosed().subscribe(result => {
                this.reRenderGantt();
                this.dataService.add = true;
            });
            this.gantt.clearSelection();
        }
    }
    openUsers() {
        const dialogRef = this.dialog.open(UserListComponent, {
            disableClose: true,
            autoFocus: true,
            width: "60%"
        });
        dialogRef.afterClosed().subscribe(result => {
            this.reRenderGantt();
        });
    }
    onLogout() {
        this.userService.onLogout();
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