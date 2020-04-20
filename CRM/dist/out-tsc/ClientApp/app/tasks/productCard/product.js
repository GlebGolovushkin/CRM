import { __decorate } from "tslib";
import { Component } from "@angular/core";
let ProductCard = class ProductCard {
    constructor(service, dialogRef) {
        this.service = service;
        this.dialogRef = dialogRef;
    }
    onClear() {
        this.service.productCard.reset();
        this.service.initializeProductCard();
        this.dialogRef.close();
    }
    onSubmit() {
        if (this.service.productCard.valid) {
            this.service.addProductFromProductCard();
        }
        this.onClear();
    }
};
ProductCard = __decorate([
    Component({
        selector: "product-card",
        templateUrl: "productCard.component.html",
        styleUrls: []
    })
], ProductCard);
export { ProductCard };
//# sourceMappingURL=product.js.map