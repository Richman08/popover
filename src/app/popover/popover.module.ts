import {NgModule} from "@angular/core";
import {PopoverDirective} from "./popover.directive";
import {PopoverService} from "./popover.service";
import {CommonModule} from "@angular/common";
import {Overlay, OverlayModule} from "@angular/cdk/overlay";
import { PopoverContainerComponent } from './popover-container/popover-container.component';

@NgModule({
  imports: [CommonModule, OverlayModule],
  declarations: [PopoverDirective, PopoverContainerComponent],
  exports: [PopoverDirective, PopoverContainerComponent],
  providers: [Overlay, PopoverService]
})

export class PopoverModule {}
