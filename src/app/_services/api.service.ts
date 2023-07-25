import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private secretKey: string = environment.secretKey;
  private geoSecretKey: string = environment.geoSecretKey;
  private units: string = 'metric';
  private lang: string = 'pl';

  getCoords(city: string) {
    return this.http.get(
      'https://api.geoapify.com/v1/geocode/autocomplete?text=' + city + '&apiKey=' + this.geoSecretKey
    );
  }

  getWeather(lat: any, long: any) {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&units=' + this.units + '&lang=' + this.lang + '&appid=' + this.secretKey
    );
  }

  getForecast(lat: any, long: any) {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&units=' + this.units + '&lang=' + this.lang + '&appid=' + this.secretKey
    );
  }

  getMeme() {
    return this.http.get(
      'https://ddmemes.com.pl/api/memes/get-random-meme/'
    );
  }
}
