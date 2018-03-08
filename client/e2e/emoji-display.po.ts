

import {promise} from "selenium-webdriver";
import {browser, by, element} from "protractor";

export class EmojiHistoryPage {
    navigateTo(): promise.Promise<any> {
        return browser.get('/emoji-display');
    };

    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return 'highlighted';
        }
        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getEmojiHistoryTitle() {
        const title = element(by.id('emoji-display-title')).getText();
        this.highlightElement(by.id('emoji-display-title'));

        return title;
    }
}
