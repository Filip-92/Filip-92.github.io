import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.css']
})
export class WeatherMapComponent {
  @Input() latitude: any;
  @Input() longitude: any;
  APIkey: any = '';

  name = 'Angular';
  map:any;

  protected layer: any = 'precipitation_new';
  private secretKey: string = environment.secretKey;
  private geoSecretKey: string = environment.geoSecretKey;

  constructor(private cookieService: CookieService) {
    if (this.cookieService.get('latitude')) {
      this.latitude = this.cookieService.get('latitude');
    }
    if (this.cookieService.get('longitude')) {
      this.longitude = this.cookieService.get('longitude');
    }
  }

  onChange(e) {
    this.layer= e.target.value;
    this.map.remove();
    this.changeLocation(this.latitude, this.longitude);
 }
  ngOnInit() {
    this.changeLocation(this.latitude, this.longitude);
    // antPolyline = L.polyline.antPath(latlngs, options);
    // antPolyline.addTo(map);
  
    // https://github.com/rubenspgcavalcante/leaflet-ant-path
  }

  changeLocation(latitude: any, longitude: any) {
    console.log(this.layer)
    this.map = L.map('map').setView([latitude, longitude], 8);
    L.tileLayer('https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=' + this.geoSecretKey, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.tileLayer('https://tile.openweathermap.org/map/' + this.layer + '/{z}/{x}/{y}.png?appid=' + this.secretKey, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    // Makerを配置
    L.marker([0, 0]).bindPopup('<b>Hello!!</b>').addTo(this.map);
  }

  ngOnChanges() {
    console.log(this.latitude);
    console.log(this.longitude);
    this.map.remove();
    this.changeLocation(this.latitude, this.longitude);
  }
}
