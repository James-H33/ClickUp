import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    CommonModule,
    FormsModule
  ]
})
export class IconComponent {
  @Input()
  @HostBinding('style.--fill-color')
  public fillColor: string | null = null;

  @Input()
  @HostBinding('style.--hover-color')
  public hoverColor: string | null = null;

  @Input()
  public type: IconType | string = IconType.NoColor;

  @Input()
  public size = 12;

  constructor(
    public element: ElementRef
  ) { }
}
