import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsBodyComponent, TabsComponent, TabsItemComponent, TabsLabelComponent} from './tabs.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TabsLabelComponent,
    TabsBodyComponent,
    TabsItemComponent,
    TabsComponent
  ],
  exports: [

    TabsLabelComponent,
    TabsBodyComponent,
    TabsItemComponent,
    TabsComponent
  ]
})
export class TabsModule {}
