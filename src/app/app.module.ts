import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { EvidencesModule } from './evidences/evidences.module';

registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
    EvidencesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
