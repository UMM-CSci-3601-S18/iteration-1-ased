import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';


import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';

import {EmojiSelectorService} from "./emojis/emoji-selector.service";
import {EmojiSelectorComponent} from './emojis/emoji-selector.component';
import {EmojiSelectorResponseDialog} from './emojis/emoji-selector.component';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';



@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        Routing,
        CustomModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,

        EmojiSelectorComponent,
        EmojiSelectorResponseDialog
    ],
    providers: [

        EmojiSelectorService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
    ],
    entryComponents: [

        EmojiSelectorResponseDialog,
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
