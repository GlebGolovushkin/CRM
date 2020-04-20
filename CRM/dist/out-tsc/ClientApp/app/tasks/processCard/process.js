import { __decorate } from "tslib";
import { Component } from "@angular/core";
let ProcessCard = class ProcessCard {
    constructor(service, dialogRef) {
        this.service = service;
        this.dialogRef = dialogRef;
    }
    onClear() {
        this.service.processCard.reset();
        this.service.initializeProcessCard();
        this.dialogRef.close();
    }
    onSubmit() {
        if (this.service.processCard.valid) {
            this.service.addProcessFromProcessCard();
        }
        this.onClear();
    }
};
ProcessCard = __decorate([
    Component({
        selector: "process-card",
        templateUrl: "processCard.component.html",
        styleUrls: []
    })
], ProcessCard);
export { ProcessCard };
//# sourceMappingURL=process.js.map