import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermForecastComponent } from './long-term-forecast.component';

describe('LongTermForecastComponent', () => {
  let component: LongTermForecastComponent;
  let fixture: ComponentFixture<LongTermForecastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LongTermForecastComponent]
    });
    fixture = TestBed.createComponent(LongTermForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
