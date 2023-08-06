import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit, ChangeDetectorRef } from '@angular/core';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';

@Component({
  standalone: true,
  selector: 'cu-gantt-view',
  templateUrl: './gantt-view.component.html',
  styleUrls: ['./gantt-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GanttChartComponent
  ],
})
export class GanttViewComponent {
  @HostBinding('style.--ganttChartHeight')
  public chartHeight: number = 400;

  constructor(
    private hostRef: ElementRef,
    private cd: ChangeDetectorRef
  ) { }

  public ngAfterViewChecked(): void {
    let distanceFromElementToTopOfWindow = this.hostRef.nativeElement.getBoundingClientRect().top;
    let windowHeight = window.innerHeight;
    let distanceFromElementToBottomOfWindow = windowHeight - distanceFromElementToTopOfWindow;

    if (this.chartHeight !== distanceFromElementToBottomOfWindow) {
      setTimeout(() => {
        this.chartHeight = distanceFromElementToBottomOfWindow;
        this.cd.markForCheck();
      }, 1)
    }
  }

}
