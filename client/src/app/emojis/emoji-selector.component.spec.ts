import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EmojiSelectorComponent} from './emoji-selector.component';
import {EmojiSelectorService} from "./emoji-selector.service";
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CustomModule} from '../custom.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';
import {Observable} from "rxjs/Observable";
import {Emoji} from "./emoji";

describe('Emoji Selection', () => {

    let component: EmojiSelectorComponent;
    let fixture: ComponentFixture<EmojiSelectorComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let emojiSelectorServiceStub: {
        getEmojis: () => Observable<Emoji[]>
    };

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [EmojiSelectorComponent],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
                {provide: EmojiSelectorService, useValue: emojiSelectorServiceStub}],
        });

        fixture = TestBed.createComponent(EmojiSelectorComponent);

        component = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('#emoji-selector-title'));
        el = de.nativeElement;
    });


    it('Should display the title', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain('Emoji Selector');
    });

    it('Should display the emojis', () => {
        expect(fixture.debugElement.query((By.css('#happy')))).toBeDefined();
        expect(fixture.debugElement.query((By.css('#sad')))).toBeDefined();
        expect(fixture.debugElement.query((By.css('#angry')))).toBeDefined();
        expect(fixture.debugElement.query((By.css('#neutral')))).toBeDefined();
    });


});
