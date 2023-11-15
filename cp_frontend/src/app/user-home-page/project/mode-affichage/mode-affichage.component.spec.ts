import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeAffichageComponent } from './mode-affichage.component';

describe('ModeAffichageComponent', () => {
  let component: ModeAffichageComponent;
  let fixture: ComponentFixture<ModeAffichageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeAffichageComponent]
    });
    fixture = TestBed.createComponent(ModeAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
