import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, combineLatest, filter, fromEvent, takeUntil } from 'rxjs';

@Directive({
  selector: '[appHorizontalControl]',
  standalone: true
})
export class HorizontalControlDirective implements OnInit, OnDestroy {
  public mouseMove$ = fromEvent(this.hostElement.nativeElement, 'mousemove');
  public isMouseDown$ = new BehaviorSubject<boolean>(false);
  public startPositions$ = new BehaviorSubject<any>({ left: 0, mouseStart: 0 });
  private destroy$ = new Subject<void>();

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent): void {
    this.startPositions$.next({
      mouseStart: event.pageX - this.hostElement.nativeElement.offsetLeft,
      left: this.hostElement.nativeElement.scrollLeft
    });
    this.isMouseDown$.next(true);
  }

  @HostListener('mouseup', ['$event'])
  public onMouseUp(event: MouseEvent): void {
    this.isMouseDown$.next(false);
  }

  constructor(
    public hostElement: ElementRef
  ) { }

  public ngOnInit(): void {
    combineLatest([
      this.mouseMove$,
      this.startPositions$,
      this.isMouseDown$
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(([mouseEvent, pos, isMouseDown]) => isMouseDown),
      ).subscribe(([mouseEvent, pos, _]: any) => {
        const currentPos = mouseEvent.pageX - this.hostElement.nativeElement.offsetLeft;
        const walk = currentPos - pos.mouseStart;
        this.hostElement.nativeElement.scrollLeft = pos.left - walk;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
