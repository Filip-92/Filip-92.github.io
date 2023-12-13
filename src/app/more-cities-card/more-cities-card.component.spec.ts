import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreCitiesCardComponent } from './more-cities-card.component';

describe('MoreCitiesCardComponent', () => {
  let component: MoreCitiesCardComponent;
  let fixture: ComponentFixture<MoreCitiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreCitiesCardComponent]
    });
    fixture = TestBed.createComponent(MoreCitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
