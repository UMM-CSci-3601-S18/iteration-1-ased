

import {browser, by, element} from "protractor";
import {EmojiHistoryPage} from "./emoji-display.po";

const origFn = browser.driver.controlFlow().execute;

describe('Emoji History', () => {
    let page: EmojiHistoryPage;

    beforeEach(() => {
        page = new EmojiHistoryPage;
    });

    it('should get and highlight the Emoji History Title', () => {
        page.navigateTo();
        expect(page.getEmojiHistoryTitle()).toEqual('Emoji History');
    });

    it('should contain the emojis that have been selected', () => {
        page.navigateTo();
        expect(element.all(by.className('emojis')).first().getText()).toContain('Rosalynd')
    })

});
