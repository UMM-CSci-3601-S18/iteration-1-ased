import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {Goal} from './goal';
import {GoalListComponent} from './goal-list.component';
import {GoalListService} from './goal-list.service';
import {Observable} from 'rxjs/Observable';
import {FormsModule} from '@angular/forms';
import {CustomModule} from '../custom.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
import {MatDialog} from '@angular/material';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

describe('Goal list', () => {

    let goalList: GoalListComponent;
    let fixture: ComponentFixture<GoalListComponent>;

    let goalListServiceStub: {
        getGoals: () => Observable<Goal[]>
    };

    beforeEach(() => {
        // stub GoalService for test purposes
        goalListServiceStub = {
            getGoals: () => Observable.of([
                {

                    _id:'5aa0505e3064dd6667038f9bb',
                    title: 'Reading assig.',
                    time: '2 PM',
                    description: 'History'
                },
                {
                    _id:'5aa051053064dd6667038f9cc',
                    title: 'laundry',
                    time: '2 PM',
                    description: 'gym clothes'

                },
                {
                    _id: '5aa05f683064dd0fc2e576099',
                    title: 'do the dishes',
                    time: '3 PM',
                    description: 'minutes'
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [GoalListComponent],
            // providers:    [ GoalListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: GoalListService, useValue: goalListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(GoalListComponent);
            goalList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('contains all the goals', () => {
        expect(goalList.goals.length).toBe(3);
    });

    it('contains a goal named \'Reading assig.\'', () => {
        expect(goalList.goals.some((goal: Goal) => goal.title === 'Reading assig.')).toBe(true);
    });

    it('contain a goal named \'laundry\'', () => {
        expect(goalList.goals.some((goal: Goal) => goal.title === 'laundry')).toBe(true);
    });

    it('doesn\'t contain a goal named \'homework\'', () => {
        expect(goalList.goals.some((goal: Goal) => goal.title === 'homework')).toBe(false);
    });

   /* it('has two goals that are 37 years old', () => {
        expect(goalList.goals.filter((goal: Goal) => goal.age === 37).length).toBe(2);
    });
*/
    it('goal list filters by title', () => {
        expect(goalList.filteredGoals.length).toBe(3);
        goalList.goalTitle = 'a';
        goalList.refreshGoals().subscribe(() => {
            expect(goalList.filteredGoals.length).toBe(2);
        });
    });

 /*   it('goal list filters by age', () => {
        expect(goalList.filteredGoals.length).toBe(3);
        goalList.goalAge = 37;
        goalList.refreshGoals().subscribe(() => {
            expect(goalList.filteredGoals.length).toBe(2);
        });
    });

    it('goal list filters by name and age', () => {
        expect(goalList.filteredGoals.length).toBe(3);
        goalList.goalAge = 37;
        goalList.goalName = 'i';
        goalList.refreshGoals().subscribe(() => {
            expect(goalList.filteredGoals.length).toBe(1);
        });
    });   */

});

describe('Misbehaving Goal List', () => {
    let goalList: GoalListComponent;
    let fixture: ComponentFixture<GoalListComponent>;

    let goalListServiceStub: {
        getGoals: () => Observable<Goal[]>
    };

    beforeEach(() => {
        // stub GoalService for test purposes
        goalListServiceStub = {
            getGoals: () => Observable.create(observer => {
                observer.error('Error-prone observable');
            })
        };

        TestBed.configureTestingModule({
            imports: [FormsModule, CustomModule],
            declarations: [GoalListComponent],
            providers: [{provide: GoalListService, useValue: goalListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(GoalListComponent);
            goalList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('generates an error if we don\'t set up a GoalListService', () => {
        // Since the observer throws an error, we don't expect goals to be defined.
        expect(goalList.goals).toBeUndefined();
    });
});


describe('Adding a goal', () => {
    let goalList: GoalListComponent;
    let fixture: ComponentFixture<GoalListComponent>;
    const newGoal: Goal = {
        _id: '',
        title: 'gym',
        time: '6 AM',
        description: 'Things and stuff',
    };
    const newId = 'gym_id';

    let calledGoal: Goal;

    let goalListServiceStub: {
        getGoals: () => Observable<Goal[]>,
        addNewGoal: (newGoal: Goal) => Observable<{'$oid': string}>
    };
    let mockMatDialog: {
        open: (AddGoalComponent, any) => {
            afterClosed: () => Observable<Goal>
        };
    };

    beforeEach(() => {
        calledGoal = null;
        // stub GoalService for test purposes
        goalListServiceStub = {
            getGoals: () => Observable.of([]),
            addNewGoal: (goalToAdd: Goal) => {
                calledGoal = goalToAdd;
                return Observable.of({
                    '$oid': newId
                });
            }
        };
        mockMatDialog = {
            open: () => {
                return {
                    afterClosed: () => {
                        return Observable.of(newGoal);
                    }
                };
            }
        };

        TestBed.configureTestingModule({
            imports: [FormsModule, CustomModule],
            declarations: [GoalListComponent],
            providers: [
                {provide: GoalListService, useValue: goalListServiceStub},
                {provide: MatDialog, useValue: mockMatDialog},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(GoalListComponent);
            goalList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it('calls GoalListService.addGoal', () => {
        expect(calledGoal).toBeNull();
        goalList.openDialog();
        expect(calledGoal).toEqual(newGoal);
    });
});


