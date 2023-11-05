import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSettingComponent } from './section-setting.component';

describe('SectionSettingComponent', () => {
  let component: SectionSettingComponent;
  let fixture: ComponentFixture<SectionSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionSettingComponent]
    });
    fixture = TestBed.createComponent(SectionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
