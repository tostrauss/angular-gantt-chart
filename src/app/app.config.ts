// app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { routes } from './app.routes';
import { GoogleChartsModule } from 'angular-google-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserModule,
      GoogleChartsModule.forRoot({
        version: 'current', // or specify a version like '49'
        safeMode: true
        // no 'language' or 'settings' property here
      })
    )
  ]
};




