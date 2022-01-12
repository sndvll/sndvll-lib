import {Component, HostBinding, Inject, TemplateRef} from '@angular/core';
import {OVERLAY_REF, OverlayRef} from '@sndvll/core';

export interface SearchbarResultConfig<T = any> {
  templateRef: TemplateRef<any>;
  width?: string;
  data?: T;
}

@Component({
  template: `<ng-container *ngTemplateOutlet="templateRef"></ng-container>`
})
export class SearchbarResultComponent {

  public templateRef: TemplateRef<any>;

  @HostBinding('class') classList = 'dropdown-menu bg-white dark:bg-black dark:text-white flex flex-col max-h-96'
  @HostBinding('style.width') width = '';

  constructor(@Inject(OVERLAY_REF) overlayRef: OverlayRef<SearchbarResultComponent, SearchbarResultConfig>) {
    const { templateRef, width } = overlayRef.config.data!;
    this.templateRef = templateRef;
    this.width = width!;
  }
}

@Component({
  selector: 'searchbar-result-item',
  template: '<ng-content></ng-content>'
})
export class SearchbarResultItemComponent {
  @HostBinding('class') classList = 'flex flex-row items-center py-1 px-2';
}
