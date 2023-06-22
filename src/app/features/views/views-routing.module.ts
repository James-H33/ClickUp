import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ViewsComponent } from "./views.component";
import { BoardViewComponent } from "./board-view/board-view.component";
import { ListViewComponent } from "./list-view/list-view.component";

const routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      { path: 'list', component: ListViewComponent },
      { path: 'board', component: BoardViewComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ViewsRoutingModule { }
