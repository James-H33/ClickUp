import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, NgZone, OnInit, ViewChild } from '@angular/core';
import { gantt } from 'src/assets/js/gantt/dhtmlxgantt';
import { MockTasks } from '../../board-view/mock-board-data';

@Component({
  standalone: true,
  selector: 'cu-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GanttChartComponent implements OnInit {
  @ViewChild('ganttChart')
  public ganttChart: ElementRef;

  @HostBinding('--ganttChartHeight')
  public chartHeight: 100;

  public tasks = MockTasks;

  constructor(
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        gantt.init(this.ganttChart.nativeElement);

        const dataForChart = this.tasks.map((task) => {
          return {
            id: task.id,
            text: task.name,
            start_date: this.dateToGanttFormat(new Date(task.startDate)),
            duration: task.duration,
            progress: 0,
            open: false
          }
        });

         gantt.parse({
          data: [
            ...dataForChart
          ],
          links: []
        });

        gantt.attachEvent("onTaskClick", function (id, e) {
          console.log(id);
        })
      }, 500)
    })
  }

  private dateToGanttFormat(date: Date): string {
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let year = date.getFullYear();

    let result = `${day}-${month}-${year}`;

    return result;
  }
}
