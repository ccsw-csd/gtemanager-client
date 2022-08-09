import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AccessManagementListComponent } from './access-management/views/access-management-list.component';

registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent,
    AccessManagementListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
