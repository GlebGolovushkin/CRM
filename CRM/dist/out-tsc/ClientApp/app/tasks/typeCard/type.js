import { __decorate } from "tslib";
import { Component } from "@angular/core";
let TypeCard = class TypeCard {
    constructor(service, dialogRef) {
        this.service = service;
        this.dialogRef = dialogRef;
    }
    onClear() {
        this.service.typeCard.reset();
        this.service.initializeTypeCard();
        this.dialogRef.close();
    }
    onSubmit() {
        if (this.service.typeCard.valid) {
            this.service.addTypeFromTypeCard();
        }
        this.onClear();
    }
};
TypeCard = __decorate([
    Component({
        selector: "type-card",
        templateUrl: "typeCard.component.html",
        styleUrls: []
    })
], TypeCard);
export { TypeCard };
//# sourceMappingURL=type.js.map