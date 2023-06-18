import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    ViewsBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
