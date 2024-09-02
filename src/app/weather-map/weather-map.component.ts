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
  currentDate: any;
  zoom: number;

  protected map: any;
  protected weatherMap: any;

  protected layer: any = 'clouds';
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
    //this.map?.remove();
    this.map.on('zoom', ({ target }) => {
      this.zoom = target.getZoom();
    });
    this.changeLocation(this.latitude, this.longitude, this.zoom);
 }
  ngOnInit() {
    this.zoom = 8;
    this.changeLocation(this.latitude, this.longitude, this.zoom);
    // antPolyline = L.polyline.antPath(latlngs, options);
    // antPolyline.addTo(map);
  
    // https://github.com/rubenspgcavalcante/leaflet-ant-path
  }

  changeLocation(latitude: any, longitude: any, zoom: any) {
    this.map?.remove();
    this.map = L.map('map').setView([latitude, longitude], zoom);
    L.tileLayer('https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=' + this.geoSecretKey, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.tileLayer('https://tile.openweathermap.org/map/' + this.layer + '/{z}/{x}/{y}.png?appid=' + this.secretKey, {
      attribution: 'Weather from <a href="http://openweathermap.org/" alt="World Map and worldwide Weather Forecast online">OpenWeatherMap</a>'
    }).addTo(this.map);
    this.map.on('zoom', ({ target }) => {
      this.zoom = target.getZoom();
    });
    this.map.on('zoomend', ({ target }) => {
      this.zoom = target.getZoom()
    });
    // L.tileLayer('https://maps.openweathermap.org/maps/2.0/radar/{z}/{x}/{y}?&appid=' + this.secretKey + '&tm=1600781400', {
    //   attribution: 'Weather from <a href="http://openweathermap.org/" alt="World Map and worldwide Weather Forecast online">OpenWeatherMap</a>'
    // }).addTo(this.map);
    
    // Makerを配置
    L.marker([latitude, longitude]).bindPopup('<b>You are here!!</b>').addTo(this.map);
  }

  ngOnChanges() {
    this.map?.remove();
    this.changeLocation(this.latitude, this.longitude, this.zoom);
  }
}
