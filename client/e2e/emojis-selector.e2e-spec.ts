

import {browser} from "protractor";
import {EmojiPage} from "./emojis-selector.po";

const origFn = browser.driver.controlFlow().execute;

describe('Emoji Selector', () => {
    let page: EmojiPage;

    beforeEach(() => {
        page = new EmojiPage();
    });

    it('should get and higlight Emojis title attribute', () => {
        page.navigateTo();
        expect(page.getEmojiTitle()).toEqual('Emoji Selector');
    });

    it('should type something in the User box and check it properly displays the name', () => {
        page.navigateTo();
        page.typeAUser('Ethan');
        expect(page.getCurrentInput()).toContain('user: Ethan');
    });

    it('should select an emoji display the correct value', () => {
        page.navigateTo();
        page.selectAnEmoji('happy_emoji');
        expect(page.getCurrentInput()).toContain('value: happy');
    })
});
