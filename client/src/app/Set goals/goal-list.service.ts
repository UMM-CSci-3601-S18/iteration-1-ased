/*

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

    getGoals(goalCompany?: string): Observable<Goal[]> {
        this.filterByCompany(goalCompany);
        return this.http.get<Goal[]>(this.goalUrl);
    }

    getGoalById(id: string): Observable<Goal> {
        return this.http.get<Goal>(this.goalUrl + '/' + id);
    }





    //This method looks lovely and is more compact, but it does not clear previous searches appropriately.
    //It might be worth updating it, but it is currently commented out since it is not used (to make that clear)
    getGoalsByCompany(goalCompany?: string): Observable<Goal> {
        this.goalUrl = this.goalUrl + (!(goalCompany == null || goalCompany == "") ? "?company=" + goalCompany : "");
        console.log("The url is: " + this.goalUrl);
        return this.http.request(this.goalUrl).map(res => res.json());
    }







    filterByCompany(goalCompany?: string): void {
        if (!(goalCompany == null || goalCompany === '')) {
            if (this.parameterPresent('company=') ) {
                // there was a previous search by company that we need to clear
                this.removeParameter('company=');
            }
            if (this.goalUrl.indexOf('?') !== -1) {
                // there was already some information passed in this url
                this.goalUrl += 'company=' + goalCompany + '&';
            } else {
                // this was the first bit of information to pass in the url
                this.goalUrl += '?company=' + goalCompany + '&';
            }
        } else {
            // there was nothing in the box to put onto the URL... reset
            if (this.parameterPresent('company=')) {
                let start = this.goalUrl.indexOf('company=');
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


*/
