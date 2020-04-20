import { Component } from "@angular/core";
import { DataService } from "../../shared/dataService";
import { Process, Resource, Product, Type, User, Task } from '../../models/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: "product-card",
    templateUrl: "productCard.component.html",
    styleUrls: []
})

export class ProductCard {
    constructor(public service: DataService, private dialogRef: MatDialogRef<ProductCard>) {

    }

    public onClear() {
        this.service.productCard.reset();
        this.service.initializeProductCard();
        this.dialogRef.close();
    }

    public onSubmit() {
        if (this.service.productCard.valid) {
            this.service.addProductFromProductCard();
        }

        this.onClear();
    }
}