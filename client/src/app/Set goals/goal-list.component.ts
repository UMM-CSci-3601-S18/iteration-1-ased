
/*

import {Component, OnInit} from '@angular/core';
import {GoalListService} from './goal-list.service';
import {Goal} from './goal';
import {Observable} from 'rxjs/Observable';
import {MatDialog} from '@angular/material';
import {AddGoalComponent} from './add-goal.component';

@Component({
    selector: 'app-goal-list-component',
    templateUrl: 'goal-list.component.html',
    styleUrls: ['./goal-list.component.css'],
})

export class GoalListComponent implements OnInit {
    // These are public so that tests can reference them (.spec.ts)
    public goals: Goal[];
    public filteredGoals: Goal[];

    // These are the target values used in searching.
    // We should rename them to make that clearer.
    public goalName: string;
    public goalAge: number;
    public goalCompany: string;

    // The ID of the
    private highlightedID: {'$oid': string} = { '$oid': '' };

    // Inject the GoalListService into this component.
    constructor(public goalListService: GoalListService, public dialog: MatDialog) {

    }

    isHighlighted(goal: Goal): boolean {
        return goal._id['$oid'] === this.highlightedID['$oid'];
    }

    openDialog(): void {
        const newGoal: Goal = {_id: '', name: '', age: -1, company: '', email: ''};
        const dialogRef = this.dialog.open(AddGoalComponent, {
            width: '500px',
            data: { goal: newGoal }
        });

        dialogRef.afterClosed().subscribe(result => {
            this.goalListService.addNewGoal(result).subscribe(
                addGoalResult => {
                    this.highlightedID = addGoalResult;
                    this.refreshGoals();
                },
                err => {
                    // This should probably be turned into some sort of meaningful response.
                    console.log('There was an error adding the goal.');
                    console.log('The error was ' + JSON.stringify(err));
                });
        });
    }

    public filterGoals(searchName: string, searchAge: number): Goal[] {

        this.filteredGoals = this.goals;

        // Filter by name
        if (searchName != null) {
            searchName = searchName.toLocaleLowerCase();

            this.filteredGoals = this.filteredGoals.filter(goal => {
                return !searchName || goal.name.toLowerCase().indexOf(searchName) !== -1;
            });
        }

        // Filter by age
        if (searchAge != null) {
            this.filteredGoals = this.filteredGoals.filter(goal => {
                return !searchAge || goal.age == searchAge;
            });
        }

        return this.filteredGoals;
    }


*/


    /**
     * Starts an asynchronous operation to update the goals list
     *
     */

/*


    refreshGoals(): Observable<Goal[]> {
        // Get Goals returns an Observable, basically a "promise" that
        // we will get the data from the server.
        //
        // Subscribe waits until the data is fully downloaded, then
        // performs an action on it (the first lambda)

        const goalListObservable: Observable<Goal[]> = this.goalListService.getGoals();
        goalListObservable.subscribe(
            goals => {
                this.goals = goals;
                this.filterGoals(this.goalName, this.goalAge);
            },
            err => {
                console.log(err);
            });
        return goalListObservable;
    }


    loadService(): void {
        this.goalListService.getGoals(this.goalCompany).subscribe(
            goals => {
                this.goals = goals;
                this.filteredGoals = this.goals;
            },
            err => {
                console.log(err);
            }
        );
    }


    ngOnInit(): void {
        this.refreshGoals();
        this.loadService();
    }
}


*/
