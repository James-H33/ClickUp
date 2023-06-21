import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewsComponent } from './views.component';
import { RouterModule } from '@angular/router';
import { ViewsRoutingModule } from './views-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ViewsRoutingModule
  ],
  declarations: [
    ViewsComponent
  ]
})
export class ViewsModule { }
