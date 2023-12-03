import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetteSettingsComponent } from './etiquette-settings.component';

describe('LabelSettingsComponent', () => {
  let component: EtiquetteSettingsComponent;
  let fixture: ComponentFixture<EtiquetteSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtiquetteSettingsComponent]
    });
    fixture = TestBed.createComponent(EtiquetteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
