import { Component, OnInit } from "@angular/core"
import { DataService } from '../shared/dataService';
import { Process } from '../models/models'

@Component({
    selector: "process-list",
    templateUrl: "processList.component.html",
    styleUrls: []
})

export class ProcessList implements OnInit {
    constructor(private data: DataService) {
        this.processes = data.processes;
    }

    ngOnInit(): void {
        this.data.loadProccesses()
            .subscribe(success => {
                if (success) {
                    this.processes = this.data.processes;
                }
            });
    }

    public processes: Process[] = [];
}