import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Directive({
  selector: '[appNoPropagation]',
  standalone: true
})
export class NoPropagationDirective implements OnDestroy {
  public destroy$ = new Subject<void>();

  @Input()
  public set stopEvent(eventName: string) {
    fromEvent(this.hostElement.nativeElement, eventName)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((event: any) => {
        event.stopPropagation();
      });
  }

  constructor(
    private hostElement: ElementRef
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
