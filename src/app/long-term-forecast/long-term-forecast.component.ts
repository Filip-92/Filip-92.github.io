import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-long-term-forecast',
  templateUrl: './long-term-forecast.component.html',
  styleUrls: ['./long-term-forecast.component.css']
})
export class LongTermForecastComponent {
  @Input() weatherDataLongTermForecast: any;

  getIcon(icon: any) {
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    return iconurl;
  }

  counter(i: number) {
    return new Array(i);
  }

}
