import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  protected deleted: boolean;
  protected innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  constructor(private cookieService: CookieService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.innerWidth = window.innerWidth;
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
    this.weatherSearchForm = new FormGroup({
      location: new FormControl("", [Validators.required, Validators.pattern('[a-zA-ZąęćńłóśźżĄĘĆŃŁÓŚŹŻ][a-zA-ZąęćńłóśźżĄĘĆŃŁÓŚŹŻ ]+')])
    });
  };

  addNewCity() {
    if (!this.cookieService.get('City1')) {
      this.setCookie('City1')
      this.city1 = this.cookieService.get('City1');
    } else if (this.cookieService.get('City1') && !this.cookieService.get('City2')) {
      this.setCookie('City2')
      this.city2 = this.cookieService.get('City2');
    } else if (this.cookieService.get('City1') && this.cookieService.get('City2') && !this.cookieService.get('City3')) {
      this.setCookie('City3')
      this.city3 = this.cookieService.get('City3');
    } else if (this.cookieService.get('City1') && this.cookieService.get('City2') && this.cookieService.get('City3') && !this.cookieService.get('City4')) {
      this.setCookie('City4')
      this.city4 = this.cookieService.get('City4');
    } else if (this.cookieService.get('City1') && this.cookieService.get('City2') && this.cookieService.get('City3') && this.cookieService.get('City4') && !this.cookieService.get('City5')) {
      this.setCookie('City5')
      this.city5 = this.cookieService.get('City5');
    } else {
      this.limit = true;
    }
    this.deleted = false;
  }

  setCookie(city: string) {
    this.cookieService.set(city, this.weatherSearchForm?.value?.location, 10);
  }

  removeAllLocations() {
    this.cookieService.deleteAll();
    this.deleted = true;
  }; 

  public validateControl = (controlName: string) => {
    return this.weatherSearchForm.controls[controlName].invalid && this.weatherSearchForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.weatherSearchForm.controls[controlName].hasError(errorName)
  }
}
