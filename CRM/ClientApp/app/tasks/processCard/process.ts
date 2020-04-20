import { Component } from "@angular/core";
import { DataService } from "../../shared/dataService";
import { Process, Resource, Product, Type, User, Task } from '../../models/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: "process-card",
    templateUrl: "processCard.component.html",
    styleUrls: []
})

export class ProcessCard {
    constructor(public service: DataService, private dialogRef: MatDialogRef<ProcessCard>) {

    }

    public onClear() {
        this.service.processCard.reset();
        this.service.initializeProcessCard();
        this.dialogRef.close();
    }

    public onSubmit() {
        if (this.service.processCard.valid) {
            this.service.addProcessFromProcessCard();
        }

        this.onClear();
    }
}