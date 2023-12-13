import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather-cities',
  templateUrl: './weather-cities.component.html',
  styleUrls: ['./weather-cities.component.css']
})
export class WeatherCitiesComponent {
  protected weatherSearchForm: FormGroup;
  protected coordinates: any;
  protected latitude: any;
  protected longitude: any;
  protected weatherData: any;

  protected city1: string;
  protected city2: string;
  protected city3: string;
  protected city4: string;
  protected city5: string;

  protected cookie: string;

  protected limit: boolean;

  constructor(private formBuilder: FormBuilder, private cookieService: CookieService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.cookieService.get('City1')) {
      this.city1 = this.cookieService.get('City1');
    } else {
      this.city1 = null;
    }
    if (this.cookieService.get('City2')) {
      this.city2 = this.cookieService.get('City2');
    } else {
      this.city2 = null;
    }
    if (this.cookieService.get('City3')) {
      this.city3 = this.cookieService.get('City3');
    } else {
      this.city2 = null;
    }
    if (this.cookieService.get('City4')) {
      this.city4 = this.cookieService.get('City4');
    } else {
      this.city2 = null;
    }
    if (this.cookieService.get('City5')) {
      this.city5 = this.cookieService.get('City5');
    } else {
      this.city2 = null;
    }
  }

  initializeForm() {
    this.weatherSearchForm = this.formBuilder.group({
      location: [""]
    });
  };

  addNewCity() {
    if (!this.cookieService.get('City1')) {
      this.cookieService.set('City1', this.weatherSearchForm?.value?.location);
      this.city1 = this.cookieService.get('City1');
    } else if (this.cookieService.get('City1') && !this.cookieService.get('City2')) {
      this.cookieService.set('City2', this.weatherSearchForm?.value?.location);
      this.city2 = this.cookieService.get('City2');
    } else if (this.cookieService.get('City1') && this.cookieService.get('City2') && !this.cookieService.get('City3')) {
      this.cookieService.set('City3', this.weatherSearchForm?.value?.location);
      this.city3 = this.cookieService.get('City3');
    } else if (this.cookieService.get('City1') && this.cookieService.get('City2') && this.cookieService.get('City3') && !this.cookieService.get('City4')) {
      this.cookieService.set('City4', this.weatherSearchForm?.value?.location);
      this.city4 = this.cookieService.get('City4');
    } else if (this.cookieService.get('City1') && this.cookieService.get('City2') && this.cookieService.get('City3') && this.cookieService.get('City4') && !this.cookieService.get('City5')) {
      this.cookieService.set('City5', this.weatherSearchForm?.value?.location);
      this.city5 = this.cookieService.get('City5');
    } else {
      this.limit = true;
    }
  }

  removeAllLocations() {
    this.cookieService.deleteAll();
  }; 
}
