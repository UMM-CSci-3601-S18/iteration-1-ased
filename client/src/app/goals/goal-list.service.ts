

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {Goal} from './goal';
import {environment} from '../../environments/environment';


@Injectable()
export class GoalListService {
    readonly baseUrl: string = environment.API_URL + 'goals';
    private goalUrl: string = this.baseUrl;

    constructor(private http: HttpClient) {
    }

    getGoals(goaltitle?: string): Observable<Goal[]> {
        this.filterByDescription(goaltitle);
        return this.http.get<Goal[]>(this.goalUrl);
    }

    getGoalById(id: string): Observable<Goal> {
        return this.http.get<Goal>(this.goalUrl + '/' + id);
    }





    //This method looks lovely and is more compact, but it does not clear previous searches appropriately.
    //It might be worth updating it, but it is currently commented out since it is not used (to make that clear)
    getGoalsByDescription(goalDescription?: string): Observable<Goal> {
        this.goalUrl = this.goalUrl + (!(goalDescription == null || goalDescription == "") ? "?title=" + goalDescription : "");
        console.log("The url is: " + this.goalUrl);
        return this.http.request(this.goalUrl).map(res => res.json());
    }







    filterByDescription(goalDescription?: string): void {
        if (!(goalDescription == null || goalDescription === '')) {
            if (this.parameterPresent('title=') ) {
                // there was a previous search by title that we need to clear
                this.removeParameter('title=');
            }
            if (this.goalUrl.indexOf('?') !== -1) {
                // there was already some information passed in this url
                this.goalUrl += 'title=' + goalDescription + '&';
            } else {
                // this was the first bit of information to pass in the url
                this.goalUrl += '?title=' + goalDescription + '&';
            }
        } else {
            // there was nothing in the box to put onto the URL... reset
            if (this.parameterPresent('title=')) {
                let start = this.goalUrl.indexOf('title=');
                const end = this.goalUrl.indexOf('&', start);
                if (this.goalUrl.substring(start - 1, start) === '?') {
                    start = start - 1;
                }
                this.goalUrl = this.goalUrl.substring(0, start) + this.goalUrl.substring(end + 1);
            }
        }
    }

    private parameterPresent(searchParam: string) {
        return this.goalUrl.indexOf(searchParam) !== -1;
    }

    // remove the parameter and, if present, the &
    private removeParameter(searchParam: string) {
        const start = this.goalUrl.indexOf(searchParam);
        let end = 0;
        if (this.goalUrl.indexOf('&') !== -1) {
            end = this.goalUrl.indexOf('&', start) + 1;
        } else {
            end = this.goalUrl.indexOf('&', start);
        }
        this.goalUrl = this.goalUrl.substring(0, start) + this.goalUrl.substring(end);
    }

    addNewGoal(newGoal: Goal): Observable<{'$oid': string}> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
        };

        // Send post request to add a new goal with the goal data as the body with specified headers.
        return this.http.post<{'$oid': string}>(this.goalUrl + '/new', newGoal, httpOptions);
    }
}



