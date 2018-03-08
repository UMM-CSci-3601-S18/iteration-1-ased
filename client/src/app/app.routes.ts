// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';

import {ResourcesComponent} from './resources/resources.component';

import {EmojiSelectorComponent} from './emojis/emoji-selector.component';
import {EmojiDisplayComponent} from "./emojis/emoji-display.component";

import {GoalListComponent} from "./goals/goal-list.component";

import {TrackerListComponent} from "./trackers/tracker-list.component";

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'emoji-selector', component: EmojiSelectorComponent},

    {path: 'resources', component: ResourcesComponent},
    {path: 'goals', component: GoalListComponent},
    {path: 'emoji-selector', component: EmojiSelectorComponent},
    {path: 'emoji-display', component: EmojiDisplayComponent},
    {path: 'tracker-list', component: TrackerListComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
