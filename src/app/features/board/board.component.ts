import { Component, OnInit } from '@angular/core';
import { BoardViewComponent } from './board-view/board-view.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'cu-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  imports: [
    CommonModule,
    BoardViewComponent
  ]
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
