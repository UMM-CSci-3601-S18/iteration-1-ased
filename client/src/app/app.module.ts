import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';


import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';


import {EmojiSelectorService} from './emojis/emoji-selector.service';
import {EmojiSelectorComponent} from './emojis/emoji-selector.component';
import {EmojiSelectorResponseDialog} from './emojis/emoji-selector.component';


import {GoalListComponent} from'./goals/goal-list.component';
import {GoalListService} from './goals/goal-list.service';

import {EmojiDisplayComponent} from './emojis/emoji-display.component';
import {EmojiDisplayService} from './emojis/emoji-display.service';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';


import {AddGoalComponent} from'./goals/add-goal.component';



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
        EmojiSelectorResponseDialog,



        GoalListComponent,
        AddGoalComponent,

        EmojiSelectorResponseDialog,
        EmojiDisplayComponent
    ],
    providers: [

        EmojiDisplayService,
        EmojiSelectorService,

        GoalListService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}


    ],
    entryComponents: [

        EmojiSelectorResponseDialog,
       AddGoalComponent

    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
