import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { sharedReducer } from './shared/stores/shared/shared.reducer';
import { SidebarComponent } from './shared/ui/sidebar/sidebar.component';
import { ViewsBarComponent } from './shared/ui/views-bar/views-bar.component';
import { UserEffects } from './shared/stores/user/user.effects';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './shared/stores/user/user.reducer';
import { BoardEffects } from './shared/stores/board/board.effects';
import { boardReducer } from './shared/stores/board/board.reducer';
import { IAppState } from './shared/stores/app-state';
import { EditTaskComponent } from "./features/views/components/edit-task/edit-task.component";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Components
    SidebarComponent,
    ViewsBarComponent,
    EditTaskComponent,

    // Store
    StoreModule.forRoot<IAppState>({
      shared: sharedReducer,
      user: userReducer,
      board: boardReducer
    }),

    // Effects
    EffectsModule.forRoot(UserEffects, BoardEffects),

    // Devtools
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
  ]
})
export class AppModule { }
