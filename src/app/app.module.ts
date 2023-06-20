import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { sharedReducer } from './shared/stores/shared/shared.reducer';
import { SidebarComponent } from './shared/ui/sidebar/sidebar.component';
import { ViewsBarComponent } from './shared/ui/views-bar/views-bar.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Components
    SidebarComponent,
    ViewsBarComponent,

    // Store
    StoreModule.forRoot({
      shared: sharedReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
