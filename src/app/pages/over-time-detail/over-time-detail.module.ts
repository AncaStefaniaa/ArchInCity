import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { overTimeDetailPage } from './over-time-detail';
import { overTimeDetailPageRoutingModule } from './over-time-detail-routing.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    overTimeDetailPageRoutingModule
  ],
  declarations: [
    overTimeDetailPage,
  ]
})
export class overTimeDetailModule { }
