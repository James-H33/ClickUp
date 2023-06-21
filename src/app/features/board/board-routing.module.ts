import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BoardComponent } from "./board.component";

const routes = [
  { path: '', component: BoardComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BoardRoutingModule { }
