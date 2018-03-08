// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EmojiSelectorComponent} from './emojis/emoji-selector.component';
import {EmojiDisplayComponent} from "./emojis/emoji-display.component";

import {GoalListComponent} from "./goals/goal-list.component";

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'emoji-selector', component: EmojiSelectorComponent},


    {path: 'goals', component: GoalListComponent},
    {path: 'emoji-selector', component: EmojiSelectorComponent},
    {path: 'emoji-display', component: EmojiDisplayComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
