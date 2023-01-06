import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { HeaderbgComponent } from 'src/app/components/headerbg/headerbg.component';
import { OtpcodeComponent } from 'src/app/components/otpcode/otpcode.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule ,
  ],
  declarations: [
    OtpcodeComponent,
    LoginPage,
    HeaderbgComponent,
  ],


})
export class LoginPageModule {}
