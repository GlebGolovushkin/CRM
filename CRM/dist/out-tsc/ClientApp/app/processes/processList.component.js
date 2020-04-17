import { __decorate } from "tslib";
import { Component } from "@angular/core";
let ProcessList = class ProcessList {
    constructor(data) {
        this.data = data;
        this.processes = [];
        this.processes = data.processes;
    }
    ngOnInit() {
        this.data.loadProccesses()
            .subscribe(success => {
            if (success) {
                this.processes = this.data.processes;
            }
        });
    }
};
ProcessList = __decorate([
    Component({
        selector: "process-list",
        templateUrl: "processList.component.html",
        styleUrls: []
    })
], ProcessList);
export { ProcessList };
//# sourceMappingURL=processList.component.js.map