import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';

import {Goal} from './goal';
import {GoalListService} from './goal-list.service';

describe('Goal list service: ', () => {
    // A small collection of test goals
    const testGoals: Goal[] = [
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
    ];
    const mGoals: Goal[] = testGoals.filter(goal =>
        goal.time.toLowerCase().indexOf('m') !== -1
    );

    // We will need some url information from the goalListService to meaningfully test title filtering;
    // https://stackoverflow.com/questions/35987055/how-to-write-unit-testing-for-angular-2-typescript-for-private-methods-with-ja
    let goalListService: GoalListService;
    let currentlyImpossibleToGenerateSearchGoalUrl: string;

    // These are used to mock the HTTP requests so that we (a) don't have to
    // have the server running and (b) we can check exactly which HTTP
    // requests were made to ensure that we're making the correct requests.
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        // Set up the mock handling of the HTTP requests
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        // Construct an instance of the service with the mock
        // HTTP client.
        goalListService = new GoalListService(httpClient);
    });

    afterEach(() => {
        // After every test, assert that there are no more pending requests.
        httpTestingController.verify();
    });

    it('getGoals() calls api/goals', () => {
        // Assert that the goals we get from this call to getGoals()
        // should be our set of test goals. Because we're subscribing
        // to the result of getGoals(), this won't actually get
        // checked until the mocked HTTP request "returns" a response.
        // This happens when we call req.flush(testGoals) a few lines
        // down.
        goalListService.getGoals().subscribe(
            goals => expect(goals).toBe(testGoals)
        );

        // Specify that (exactly) one request will be made to the specified URL.
        const req = httpTestingController.expectOne(goalListService.baseUrl);
        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');
        // Specify the content of the response to that request. This
        // triggers the subscribe above, which leads to that check
        // actually being performed.
        req.flush(testGoals);
    });

    it('getGoals(goalTitle) adds appropriate param string to called URL', () => {
        goalListService.getGoals('m').subscribe(
            goals => expect(goals).toEqual(mGoals)
        );

        const req = httpTestingController.expectOne(goalListService.baseUrl + '?title=m&');
        expect(req.request.method).toEqual('GET');
        req.flush(mGoals);
    });

    it('filterByTime(goalTime) deals appropriately with a URL that already had a Title', () => {
        currentlyImpossibleToGenerateSearchGoalUrl = goalListService.baseUrl + '?title=f&something=k&';
        goalListService['goalUrl'] = currentlyImpossibleToGenerateSearchGoalUrl;
        goalListService.filterByTitle('m');
        expect(goalListService['goalUrl']).toEqual(goalListService.baseUrl + '?something=k&title=m&');
    });

    it('filterByTitle(goalTitle) deals appropriately with a URL that already had some filtering, but no title', () => {
        currentlyImpossibleToGenerateSearchGoalUrl = goalListService.baseUrl + '?something=k&';
        goalListService['goalUrl'] = currentlyImpossibleToGenerateSearchGoalUrl;
        goalListService.filterByTitle('m');
        expect(goalListService['goalUrl']).toEqual(goalListService.baseUrl + '?something=k&title=m&');
    });

    it('filterByTitle(goalTitle) deals appropriately with a URL has the keyword title, but nothing after the =', () => {
        currentlyImpossibleToGenerateSearchGoalUrl = goalListService.baseUrl + '?title=&';
        goalListService['goalUrl'] = currentlyImpossibleToGenerateSearchGoalUrl;
        goalListService.filterByTitle('');
        expect(goalListService['goalUrl']).toEqual(goalListService.baseUrl + '');
    });

    it('getGoalById() calls api/goals/id', () => {
        const targetGoal: Goal = testGoals[1];
        const targetId: string = targetGoal._id;
        goalListService.getGoalById(targetId).subscribe(
            goal => expect(goal).toBe(targetGoal)
        );

        const expectedUrl: string = goalListService.baseUrl + '/' + targetId;
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toEqual('GET');
        req.flush(targetGoal);
    });

    it('adding a goal calls api/goals/new', () => {
        const aa0505e3064dd6667038f9bbc = { '$oid': 'aa0505e3064dd6667038f9bb' };
        const newGoal: Goal = {
            _id:'aa0505e3064dd6667038f9bbc',
            title: 'Work',
            time: '9 AM',
            description: 'At bookstore'
        };

        goalListService.addNewGoal(newGoal).subscribe(
            id => {
                expect(id).toBe(aa0505e3064dd6667038f9bbc);
            }
        );

        const expectedUrl: string = goalListService.baseUrl + '/new';
        const req = httpTestingController.expectOne(expectedUrl);
        expect(req.request.method).toEqual('POST');
        req.flush(aa0505e3064dd6667038f9bbc);
    });
});


