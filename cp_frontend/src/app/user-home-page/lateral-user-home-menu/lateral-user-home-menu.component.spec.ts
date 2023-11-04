import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralUserHomeMenuComponent } from './lateral-user-home-menu.component';

describe('LateralUserHomeMenuComponent', () => {
  let component: LateralUserHomeMenuComponent;
  let fixture: ComponentFixture<LateralUserHomeMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LateralUserHomeMenuComponent]
    });
    fixture = TestBed.createComponent(LateralUserHomeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
