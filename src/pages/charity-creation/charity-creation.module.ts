import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharityCreationPage } from './charity-creation';

@NgModule({
  declarations: [
    CharityCreationPage,
  ],
  imports: [
    IonicPageModule.forChild(CharityCreationPage),
  ],
})
export class CharityCreationPageModule {}
