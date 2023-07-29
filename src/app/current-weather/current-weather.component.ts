import { Component, Input } from '@angular/core';
import { HelperService } from '../_services/helper.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent {
  @Input() weatherData: any;
  @Input() target: any;

  constructor(private helper: HelperService) {}

  getIcon(icon: any) {
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    return iconurl;
  }

  scrollToMeme(el: HTMLElement) {
    el.scrollIntoView();
  }
}
