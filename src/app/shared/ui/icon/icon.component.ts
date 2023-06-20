import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';

export enum IconType {
 Search = 'search',
 DoubleLeftChevron = 'double-left-chevron',
 DoubleRightChevron = 'double-right-chevron',
 Cog = 'cog',
 Home = 'home',
 Bell = 'bell',
 Goal = 'goal',
 ChevronDown = 'chevron-down',
 List = 'list',
 NoColor = 'no-color',
 Board = 'board',
 Menu = 'menu',
}

@Component({
  standalone: true,
  selector: 'cu-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  imports: [
    CommonModule
  ]
})
export class IconComponent {
  @Input()
  public type: IconType | string = IconType.NoColor;

  @Input()
  public size = 12;

  public get hoverColor(): string {
    return this._hoverColor;
  }

  private _hoverColor: string = '';

  constructor(
    private element: ElementRef
  ) { }
}
