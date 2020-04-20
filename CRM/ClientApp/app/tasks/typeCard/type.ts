import { Component } from "@angular/core";
import { DataService } from "../../shared/dataService";
import { Process, Resource, Product, Type, User, Task } from '../../models/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: "type-card",
    templateUrl: "typeCard.component.html",
    styleUrls: []
})

export class TypeCard {
    constructor(public service: DataService, private dialogRef: MatDialogRef<TypeCard>) {

    }

    public onClear() {
        this.service.typeCard.reset();
        this.service.initializeTypeCard();
        this.dialogRef.close();
    }

    public onSubmit() {
        if (this.service.typeCard.valid) {
            this.service.addTypeFromTypeCard();
        }

        this.onClear();
    }
}