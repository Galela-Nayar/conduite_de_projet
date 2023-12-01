import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetteTachesComponent } from './etiquette-taches.component';

describe('EtiquetteTachesComponent', () => {
  let component: EtiquetteTachesComponent;
  let fixture: ComponentFixture<EtiquetteTachesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtiquetteTachesComponent]
    });
    fixture = TestBed.createComponent(EtiquetteTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
