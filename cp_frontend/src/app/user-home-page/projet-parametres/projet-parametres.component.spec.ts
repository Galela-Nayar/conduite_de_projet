import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetParametresComponent } from './projet-parametres.component';

describe('ProjetParametresComponent', () => {
  let component: ProjetParametresComponent;
  let fixture: ComponentFixture<ProjetParametresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetParametresComponent]
    });
    fixture = TestBed.createComponent(ProjetParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
