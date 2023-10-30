import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalUserHomeMenuComponent } from './horizontal-user-home-menu.component';

describe('HorizontalUserHomeMenuComponent', () => {
  let component: HorizontalUserHomeMenuComponent;
  let fixture: ComponentFixture<HorizontalUserHomeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalUserHomeMenuComponent]
    });
    fixture = TestBed.createComponent(HorizontalUserHomeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
