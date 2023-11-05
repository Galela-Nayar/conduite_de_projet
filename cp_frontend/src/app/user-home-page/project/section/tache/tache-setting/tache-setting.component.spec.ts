import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheSettingComponent } from './tache-setting.component';

describe('TacheSettingComponent', () => {
  let component: TacheSettingComponent;
  let fixture: ComponentFixture<TacheSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacheSettingComponent]
    });
    fixture = TestBed.createComponent(TacheSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
