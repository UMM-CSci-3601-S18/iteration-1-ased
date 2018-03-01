import {TestBed, ComponentFixture} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {CustomModule} from '../custom.module';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

describe('Home', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CustomModule],
            declarations: [HomeComponent], // declare the test component
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        });

        fixture = TestBed.createComponent(HomeComponent);

        component = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('#hello-world'));
        el = de.nativeElement;
    });

    // Not sure if this test will be useful to us. Commenting it out for now
    /*
    it('displays a greeting', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(component.text);
    });
    */

    it('Should display the emojis', () => {
        fixture.detectChanges();
        expect(element(by.id('emojis'))).toBeDefined();
    });

    it('Should have all the emojis we put in', () => {
        expect(emojiList.emojis.length).toBe(4);
    });
});
