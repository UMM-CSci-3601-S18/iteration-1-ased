

import {promise} from "selenium-webdriver";
import {browser, by, element} from "protractor";

export class GoalPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('/tracker-list')
    }

    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', previous);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return 'highlighted';
        }
    }

    getGoalTitle() {
        const title = element(by.id('tracker-list-title')).getText();
        this.highlightElement(by.id('tracker-list-title'));

        return title;
    }

}
