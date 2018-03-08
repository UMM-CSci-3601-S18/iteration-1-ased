

import {promise} from "selenium-webdriver";
import {browser, by, element} from "protractor";

export class EmojiPage {
    navigateTo(): promise.Promise<any> {
        return browser.get('/emoji-selector');
    }

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

    getEmojiTitle() {
        const title = element(by.id('emoji-selector-title')).getText();
        this.highlightElement(by.id('emoji-selector-title'));

        return title;
    }

    typeAUser(user: string) {
        const input = element(by.id('emojiUserField'));
        input.click();
        input.sendKeys(user);
    }

    getCurrentInput() {
        const elem = element(by.id('userInputDisplay'));
        return elem.getText();
    }

    selectAnEmoji(emoji: string) {
        const input = element(by.id(emoji));
        input.click();
    }


}
