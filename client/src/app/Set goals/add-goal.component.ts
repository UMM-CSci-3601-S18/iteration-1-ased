

import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Goal} from './goal';

@Component({
    selector: 'app-add-goal.component',
    templateUrl: 'add-goal.component.html',
})
export class AddUserComponent {
    constructor(
        public dialogRef: MatDialogRef<AddUserComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {goal: Goal}) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}



