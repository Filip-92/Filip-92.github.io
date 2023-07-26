import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SafePipe, WeatherComponent } from './weather/weather.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ApiService } from './_services/api.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { HourlyWeatherComponent } from './hourly-weather/hourly-weather.component';
import { WeeklyForecastComponent } from './weekly-forecast/weekly-forecast.component';
import { ScrollableDirective } from './scrollable.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    CurrentWeatherComponent,
    HourlyWeatherComponent,
    WeeklyForecastComponent,
    ScrollableDirective,
    SafePipe,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
