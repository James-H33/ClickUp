import { Directive, HostListener, Input } from '@angular/core';
import { MenuControlService } from './menu-control.service';

@Directive({
  selector: '[appMenuControl]',
  standalone: true
})
export class MenuControlDirective {
  @Input() delay: number = 500;

  constructor(
    private controlService: MenuControlService
  ) { }

  @HostListener('mouseenter')
  public onMouseEnter() {
    this.controlService.toggleSideMenu(true);
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.controlService.toggleSideMenu(false);
  }
}
