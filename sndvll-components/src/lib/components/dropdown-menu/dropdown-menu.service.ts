import {Injectable, TemplateRef} from '@angular/core';
import {ConnectedOverlayConfigBuilder, OverlayConnectedPosition, OverlayService} from '@sndvll/core';
import {DropdownMenuComponent} from './dropdown-menu.component';

@Injectable({providedIn: 'root'})
export class DropdownMenuService {

  constructor(private overlay: OverlayService) {}

  public open(origin: HTMLElement, templateRef: TemplateRef<any>) {
    const overlayConfig = DropdownMenuService.getOverlayConfig(origin, templateRef);
    return this.overlay.open(overlayConfig);
  }

  private static getOverlayConfig(origin: HTMLElement, templateRef: TemplateRef<any>) {
    return new ConnectedOverlayConfigBuilder<DropdownMenuComponent, TemplateRef<any>>()
      .origin(origin)
      .data(templateRef)
      .component(DropdownMenuComponent)
      .preferredConnectedPosition(OverlayConnectedPosition.BottomRight)
      .config;
  }

}
