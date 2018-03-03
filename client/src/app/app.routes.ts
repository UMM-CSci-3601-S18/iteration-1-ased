// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EmojiSelectorComponent} from './emojis/emoji-selector.component';

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'emoji-selector', component: EmojiSelectorComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
