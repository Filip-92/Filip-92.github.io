import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
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
import { ServiceWorkerModule } from '@angular/service-worker';
import { LongTermForecastComponent } from './long-term-forecast/long-term-forecast.component';
import { IconsComponent } from './icons/icons.component';
import { WeatherCitiesComponent } from './weather-cities/weather-cities.component';
import { MoreCitiesCardComponent } from './more-cities-card/more-cities-card.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeatherMapComponent } from './weather-map/weather-map.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    CurrentWeatherComponent,
    HourlyWeatherComponent,
    WeeklyForecastComponent,
    ScrollableDirective,
    SafePipe,
    SpinnerComponent,
    LongTermForecastComponent,
    IconsComponent,
    WeatherCitiesComponent,
    MoreCitiesCardComponent,
    WeatherMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
