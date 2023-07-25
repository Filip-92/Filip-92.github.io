import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import {formatDate} from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, Meta, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  protected weatherSearchForm: FormGroup;
  protected weatherData: any;
  protected weatherDataForecast: any;
  protected meme: any;
  protected coordinates: any;
  protected latitude: any;
  protected longitude: any;
  protected currentDate: any;
  protected time: any;
  protected UTC: number = 2;
  protected sign: any;
  protected trustedUrl: string;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.initializeForm();
    this.checkCoordinates();
    this.currentDate = new Date();
    this.time = new Date();
    this.getMeme();
  }

  initializeForm() {
    this.weatherSearchForm = this.formBuilder.group({
      location: ["Puławy"]
    });
  };

  setDate(days: number) {
      return formatDate(this.currentDate.setDate(this.currentDate.getDate() + days), 'dd/MM/yyyy', 'en')
  }

  showTime() {
    this.sign = this.coordinates.features[0].properties.timezone.offset_DST[0];
    this.UTC = Number(this.coordinates.features[0].properties.timezone.offset_DST.substring(1, 3));
  }

  checkCoordinates() {
    this.apiService
    .getCoords(this.weatherSearchForm.value.location)
    .subscribe(response => {
      this.coordinates = response;
      this.latitude = this.coordinates.features[0].geometry.coordinates[1]
      this.longitude = this.coordinates.features[0].geometry.coordinates[0]
      this.sendToOpenWeather(this.latitude, this.longitude);
      this.sendToOpenWeatherForecast(this.latitude, this.longitude);
      this.showTime()
    });
  }

  sendToOpenWeather(latitude: any, longitude: any) {
      this.apiService
      .getWeather(latitude, longitude)
      .subscribe(response => {
        this.weatherData = response;
        console.log(this.weatherData)
    });
  }

  sendToOpenWeatherForecast(latitude: any, longitude: any) {
    this.apiService
    .getForecast(latitude, longitude)
    .subscribe(response => {
      this.weatherDataForecast = response;
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
      }
      console.log(this.meme)
  });
  if(this.meme?.url?.includes("youtube") || this.meme?.url?.includes("youtu.be")) {
    this.trustedUrl = this.meme?.url;
  }

}

  scrollToMeme(el: HTMLElement) {
    el.scrollIntoView();
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
    if (window.scrollY > 100) {
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
      var watermarkedUrl = imageUrl?.replace("/upload/", "/upload/w_800/w_0.3,l_Watermark_image,o_50,c_scale,g_south_east/");
    } else {
      var watermarkedUrl = imageUrl?.replace("/upload/", "/upload/l_Watermark_image,w_0.2,o_50,c_scale,g_south_east/");
    }
    return watermarkedUrl;
  }
}
