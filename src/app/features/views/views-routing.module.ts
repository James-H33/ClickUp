import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BoardViewComponent } from "./board-view/board-view.component";
import { GanttViewComponent } from "./gantt-view/gantt-view.component";
import { ListViewComponent } from "./list-view/list-view.component";
import { ViewsComponent } from "./views.component";

const routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      { path: 'list', component: ListViewComponent },
      { path: 'board', component: BoardViewComponent },
      { path: 'gantt', component: GanttViewComponent }
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
