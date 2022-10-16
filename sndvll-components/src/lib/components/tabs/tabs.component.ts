import {
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren, EventEmitter,
  Input, Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {delay, Observable, startWith} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'sndvll-tabs-label',
  template: '<ng-template><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsLabelComponent {
  @ViewChild(TemplateRef) labelContent!: TemplateRef<any>;
}

@Component({
  selector: 'sndvll-tabs-body',
  template: '<ng-template><ng-content></ng-content></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsBodyComponent {
  @ViewChild(TemplateRef) bodyContent!: TemplateRef<any>;
}


@Component({
  selector: 'sndvll-tabs-item',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsItemComponent {

  @Input() label!: string;
  @Input() isActive!: boolean;
  @ContentChild(TabsBodyComponent) bodyComponent!: TabsBodyComponent;
  @ContentChild(TabsLabelComponent) labelComponent!: TabsLabelComponent;

}

@Component({
  selector: 'sndvll-tabs',
  template: `
    <div class="flex flex-row rounded-lg mb-8 mx-2 bg-gray-700 drop-shadow-md mt-1.5">
      <div class="w-full flex content-center justify-center items-center py-1"
           *ngFor="let item of tabItems$ | async"
           [class.active]="item === activeTab"
           [class.left]="isFirst(item)"
           [class.right]="isLast(item)"
           (click)="selectTab(item)">
        <ng-container *ngIf="item.labelComponent">
          <ng-container *ngTemplateOutlet="item.labelComponent.labelContent"></ng-container>
        </ng-container>
        <ng-container *ngIf="!item.labelComponent">{{item.label}}</ng-container>
      </div>
    </div>
    <ng-container *ngIf="activeTab && activeTab.bodyComponent">
      <ng-container *ngTemplateOutlet="activeTab.bodyComponent.bodyContent"></ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit, AfterViewChecked {

  @ContentChildren(TabsItemComponent) tabs!: QueryList<TabsItemComponent>;

  @Output()
  public activeTabChanges: EventEmitter<string> = new EventEmitter<string>();

  public tabItems$!: Observable<TabsItemComponent[]>;
  public activeTab!: TabsItemComponent;
  @Input() activate!: string;

  ngAfterContentInit(): void {
    this.tabItems$ = this.tabs.changes.pipe(
      startWith(""), //todo why?
      delay(0),//todo why?
      map(() => this.tabs.toArray())
    )
  }

  public isLast(item: TabsItemComponent): boolean {
    return this.tabs.last === item;
  }

  public isFirst(item: TabsItemComponent): boolean {
    return this.tabs.first === item;
  }

  ngAfterViewChecked(): void {
    this.activeTab = this.activate ? this.tabs.find(tab => tab.label === this.activate)! : this.tabs.first;
  }

  selectTab(item: TabsItemComponent) {
    if (this.activeTab === item) {
      return;
    }

    if (this.activeTab) {
      this.activeTab.isActive = false;
    }

    this.activeTab = item;
    this.activate = item.label;
    item.isActive = true;
    this.activeTabChanges.emit(this.activeTab.label);
  }
}
