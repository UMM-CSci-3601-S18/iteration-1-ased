

import {GoalPage} from "./goals-list.po";

describe('Goal List', () => {
    let page: GoalPage;

    beforeEach(() => {
        page = new GoalPage;
    });

    it('should get and highlight the Goals title attribute', () => {
        page.navigateTo();
        expect(page.getGoalTitle()).toEqual('Trackers');
    });


});
