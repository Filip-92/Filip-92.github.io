import { Component, ElementRef, HostListener, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LocationService } from '../_services/location.service';
import { CookieService } from 'ngx-cookie-service';
import { WeatherMapComponent } from '../weather-map/weather-map.component';
import {
  trigger,
  state,
  sequence,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { switchMap, catchError } from 'rxjs/operators'

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  protected weatherSearchForm: FormGroup;
  protected weatherData: any;
  protected weatherDataForecast: any;
  protected weatherDataLongTermForecast: any;
  protected precipitation: any;
  protected meme: any;
  protected coordinates: any;
  protected latitude: any;
  protected longitude: any;
  protected currentDate: any;
  protected time: any;
  protected UTC: number = 2;
  protected sign: any;
  protected trustedUrl: string;
  protected moreCities: boolean;
  innerWidth: any;
  fadeIn: boolean = false;
  fadeIn1: boolean;
  hidden: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(event) {
      if (this.innerWidth >= 1080) {
        if (window.pageYOffset >= 270 && window.pageYOffset <= 600) {
          this.fadeIn = true;
        } 
        if (window.pageYOffset >= 800 && window.pageYOffset <= 1200) {
          this.fadeIn1 = true;
        } 
        if (window.pageYOffset >= 50 && window.pageYOffset <= 300) {
          this.fadeIn = false;
        }
        if (window.pageYOffset >= 50 && window.pageYOffset <= 900) {
          this.fadeIn1 = false;
        }
      } else {
        if (window.pageYOffset >= 220 && window.pageYOffset <= 550) {
          this.fadeIn = true;
        } 
        if (window.pageYOffset >= 700 && window.pageYOffset <= 1100) {
          this.fadeIn1 = true;
        } 
        if (window.pageYOffset >= 50 && window.pageYOffset <= 250) {
          this.fadeIn = false;
        }
        if (window.pageYOffset >= 50 && window.pageYOffset <= 750) {
          this.fadeIn1 = false;
        }
      }

  }

  constructor(private apiService: ApiService, private locationService: LocationService,
    private cookieService: CookieService) {
    
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
    console.log(el.scrollHeight)
}

  ngOnInit(): void {
    this.initializeForm();
    this.currentDate = new Date();
    this.time = new Date();
    this.getMeme();
    this.innerWidth = window.innerWidth;
    
    this.locationService.getPosition().then(pos=>
      {
         if (pos.lng !== undefined && pos.lat !== undefined) {
          this.sendToOpenWeather(pos.lat, pos.lng);
          this.sendToOpenWeatherForecast(pos.lat, pos.lng);
          this.sendToOpenWeatherLongTermForecast(pos.lat, pos.lng, 16);
          this.cookieService.set('latitude', pos.lat, 10);
          this.cookieService.set('longitude', pos.lng, 10);
          this.showTime();
          if (this.cookieService.get('latitude')) {
            this.latitude = this.cookieService.get('latitude');
          }
          if (this.cookieService.get('longitude')) {
            this.longitude = this.cookieService.get('longitude');
          }
         } else {
          this.checkCoordinates();
         }
      });
  }
  
  initializeForm() {
    this.weatherSearchForm = new FormGroup({
      location: new FormControl("", [Validators.required, Validators.pattern('[a-zA-ZąęćńłóśźżĄĘĆŃŁÓŚŹŻ][a-zA-ZąęćńłóśźżĄĘĆŃŁÓŚŹŻ ]+')])
    });
  };

  setDate(days: number) {
      return formatDate(this.currentDate.setDate(this.currentDate.getDate() + days), 'dd/MM/yyyy', 'en')
  }

  showTime() {
    this.sign = this.coordinates?.features[0]?.properties?.timezone?.offset_DST[0];
    this.UTC = Number(this.coordinates?.features[0]?.properties?.timezone?.offset_DST?.substring(1, 3));
  }

  setCookie(coordinate: string) {
    this.cookieService.set(coordinate, this.weatherSearchForm?.value?.location, 10);
  }

  checkCoordinates() {
    this.apiService
    .getCoords(this.weatherSearchForm.value.location)
    .subscribe(response => {
      this.coordinates = response;
      this.latitude = this.coordinates?.features[0]?.geometry?.coordinates[1]
      this.cookieService.set('latitude', this.latitude, 10);
      this.longitude = this.coordinates?.features[0]?.geometry?.coordinates[0]
      this.cookieService.set('longitude', this.longitude, 10);
      this.sendToOpenWeather(this.latitude, this.longitude);
      this.sendToOpenWeatherForecast(this.latitude, this.longitude);
      this.sendToOpenWeatherLongTermForecast(this.latitude, this.longitude, 16);
      this.showTime();
      this.latitude = this.cookieService.get('latitude');
      this.longitude = this.cookieService.get('longitude');
    });
  }

  sendToOpenWeather(latitude: any, longitude: any) {
      this.apiService
      .getWeather(latitude, longitude)
      .subscribe(response => {
        this.weatherData = response;
    });
  }

  sendToOpenWeatherForecast(latitude: any, longitude: any) {
    this.apiService
    .getForecast(latitude, longitude)
    .subscribe(response => {
      this.weatherDataForecast = response;
    });
  }

  sendToOpenWeatherLongTermForecast(latitude: any, longitude: any, days: number) {
    console.log(latitude)
    this.apiService
    .getLongTermForecast(latitude, longitude, days)
    .subscribe(response => {
      this.weatherDataLongTermForecast = response;
    });
  }

  checkPrecipitationMap(latitude: any, longitude: any) {
    this.apiService
    .getPrecipitation(latitude, longitude)
    .subscribe(response => {
      this.precipitation = response;
    });
  }

  getMeme() {
    this.apiService
    .getMeme()
    .subscribe(response => {
      this.meme = response;
      if(this.checkURL(this?.meme?.url)) {
        var img = new Image();
        img.src = this?.meme?.url;
        this.meme.url = this.addImageWatermark(this.meme?.url);
      } else {
        this.meme.url = this.addVideoWatermark(this.meme?.url);
      }
      if(this.meme?.url?.includes("youtube") || this.meme?.url?.includes("youtu.be")) {
        this.trustedUrl = this.meme?.url;
      }
  });
}

  getIcon(icon: any) {
    var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    return iconurl;
  }

  range = (start: any, stop: any, step: any) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }

  scrollRight(){
    this.widgetsContent.nativeElement.scrollLeft += 150;
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  checkIfScrolled() {
    if (window.scrollY > 120) {
      return true;
    } else {
      return false;
    }
  }

  refresh() {
    window.setTimeout(function(){location.reload()},100);
  }

  checkURL(url: string) {
    return(url?.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  addImageWatermark(imageUrl: string) {
    if (!imageUrl?.includes(".gif")) {
      var watermarkedUrl = imageUrl?.replace("/upload/", "/upload/w_800/w_0.25,l_Watermark_image_2.0,o_50,c_scale,g_south_east/");
    } else {
      var watermarkedUrl = imageUrl?.replace("/upload/", "/upload/l_Watermark_image_2.0,w_0.20,o_50,c_scale,g_south_east/");
    }
    return watermarkedUrl;
  }

  addVideoWatermark(imageUrl: string) {
    var watermarkedUrl = imageUrl?.replace("/upload/", "/upload/w_0.15,l_Watermark_image_2.0,o_50,c_scale,g_south_east/");
    return watermarkedUrl;
  }

  moreCitiesToggle() {
    this.moreCities = !this.moreCities;
  }

  public validateControl = (controlName: string) => {
    return this.weatherSearchForm.controls[controlName].invalid && this.weatherSearchForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.weatherSearchForm.controls[controlName].hasError(errorName)
  }
}
