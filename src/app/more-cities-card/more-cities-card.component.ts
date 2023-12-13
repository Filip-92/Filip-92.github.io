import { Component, Input } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { WeatherCitiesComponent } from '../weather-cities/weather-cities.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-more-cities-card',
  templateUrl: './more-cities-card.component.html',
  styleUrls: ['./more-cities-card.component.css']
})
export class MoreCitiesCardComponent {
  @Input() city: string;
  @Input() cookie: string;
  protected coordinates: any;
  protected latitude: any;
  protected longitude: any;
  protected weatherData: any;
  protected deleted: boolean = false;

  ngOnInit(): void {
    this.checkCoordinates();
  }

  constructor(private apiService: ApiService, private cookieService: CookieService, private weatherCities: WeatherCitiesComponent,
    private router: Router) {
    
  }

  checkCoordinates() {
    this.apiService
    .getCoords(this.city)
    .subscribe(response => {
      this.coordinates = response;
      this.latitude = this.coordinates?.features[0]?.geometry?.coordinates[1]
      this.longitude = this.coordinates?.features[0]?.geometry?.coordinates[0]
      this.sendToOpenWeather(this.latitude, this.longitude);
    });
  }

  sendToOpenWeather(latitude: any, longitude: any) {
    this.apiService
    .getWeather(latitude, longitude)
    .subscribe(response => {
      this.weatherData = response;
  });
}

  getIcon(icon: any) {
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    return iconurl;
  }

  removeLocation() {
    this.cookieService.delete(this.cookie.toString());

    this.city = null;
    this.weatherData = null;
    this.deleted = true;
  }; 
}

