import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StatusPipe} from './pipes/status.pipe';

import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {StatusIconPipe} from './pipes/status-icon.pipe';
import {FilterPipe} from './pipes/filter.pipe';
import {FormsModule} from '@angular/forms';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StatusPipe,
    StatusIconPipe,
    FilterPipe,
    FormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
