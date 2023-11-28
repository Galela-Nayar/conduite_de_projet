import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateLimiteCalendrierComponent } from './date-limite-calendrier.component';

describe('DateLimiteCalendrierComponent', () => {
  let component: DateLimiteCalendrierComponent;
  let fixture: ComponentFixture<DateLimiteCalendrierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateLimiteCalendrierComponent]
    });
    fixture = TestBed.createComponent(DateLimiteCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
