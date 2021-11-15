import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import {Subject} from "rxjs";
import {ConnectionPositionPair, Overlay, OverlayRef} from "@angular/cdk/overlay";
import {PopoverService} from "./popover.service";
import {takeUntil} from "rxjs/operators";
import {TemplatePortal} from "@angular/cdk/portal";

@Directive({
  selector: '[popoverTrigger]',
})

export class PopoverDirective implements OnInit, OnDestroy {
  @Input() popoverTrigger!: TemplateRef<object>;

  private unsubscribe: Subject<any> = new Subject();
  private  overlayRef!: OverlayRef;

  constructor(private elementRef: ElementRef,
              private overlay: Overlay,
              private vcr: ViewContainerRef,
              private popoverService: PopoverService) {}

  ngOnInit(): void {
    this.createOverlay();
    // this.getState();
  }

  // FOR ONCLICK EVENT
  // getState(): void {
  //   this.popoverService.getState().subscribe(resp => {
  //     console.log(resp)
  //     if (resp) {
  //       this.detachOverlay();
  //     }
  //   });
  // }

  @HostListener("mouseenter") onMouseEnter() {
    this.attachOverlay();
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.detachOverlay();
  }

  private createOverlay(): void {
    // const scrollStrategy = this.overlay.scrollStrategies.block();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: - 8,
        }
      ])

    this.overlayRef = this.overlay.create({
      positionStrategy,
      // scrollStrategy,
      // hasBackdrop: false,
      // backdropClass: ""
    });

    // FOR CLOSING POPOVER BY CLICK OUT OF POPOVER
    // this.overlayRef
    //   .backdropClick()
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe(() => {
    //     this.detachOverlay();
    //   });
  }

  private attachOverlay(): void {
    if (!this.overlayRef.hasAttached()) {
      const periodSelectorPortal = new TemplatePortal(
        this.popoverTrigger,
        this.vcr
      );

      this.overlayRef.attach(periodSelectorPortal);
    }
  }

  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  ngOnDestroy(): void {
    this.detachOverlay();
    // this.unsubscribe.next();
    // this.unsubscribe.complete();
  }
}
