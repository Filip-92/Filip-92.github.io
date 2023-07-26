import { Component, Input, Pipe } from '@angular/core';

@Component({
  selector: 'app-hourly-weather',
  templateUrl: './hourly-weather.component.html',
  styleUrls: ['./hourly-weather.component.css']
})

export class HourlyWeatherComponent {
  @Input() weatherDataForecast: any;

  getIcon(icon: any) {
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    return iconurl;
  }

  counter(i: number) {
    return new Array(i);
  }

}
