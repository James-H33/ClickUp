import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IconComponent } from "../../../shared/ui/icon/icon.component";
import { TaskComponent } from "./task/task.component";

@Component({
  standalone: true,
  selector: 'cu-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss'],
  imports: [
    CommonModule,
    TaskComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    IconComponent
  ]
})
export class BoardViewComponent {

  public boards = [
    { id: 1, name: 'To Do', tasks: ['test', 'testing'], color: '#d3d3d3' },
    { id: 2, name: 'In Progress', tasks: ['more testing'], color: '#ff7fab' },
    { id: 3, name: 'Ready For Testing', tasks: [], color: '#bf55ec' },
    { id: 4, name: 'Done', tasks: [], color: '#6bc950' }
  ];

  public taskMove(event: CdkDragDrop<any[]>) {
    let previousContainerId = +event.previousContainer.id;
    let containerId = +event.container.id;

    if (previousContainerId === containerId) {
      const board = this.boards[containerId];
      moveItemInArray(board.tasks, event.previousIndex, event.currentIndex);
    } else {
      let [prevBoard]: any = event.previousContainer.data;
      let [task, taskIndex] = event.item.data;
      let insertIndex = event.currentIndex;

      const board = this.boards[containerId];
      const tasks = board.tasks;
      let pre = tasks.slice(0, insertIndex);
      let post = tasks.slice(insertIndex);

      prevBoard.tasks = prevBoard.tasks.filter((t: any, i: number) => i !== taskIndex);

      board.tasks = [...pre, task, ...post];
    }
  }
}
