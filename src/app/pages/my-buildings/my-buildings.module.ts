import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { myBuildings } from './my-buildings';
import { myBuildingsRoutingModule } from './my-buildings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    myBuildingsRoutingModule
  ],
  declarations: [
    myBuildings,
  ],
})
export class myBuildingsModule { }
