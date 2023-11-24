import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheScrumComponent } from './tache-scrum.component';

describe('TacheScrumComponent', () => {
  let component: TacheScrumComponent;
  let fixture: ComponentFixture<TacheScrumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TacheScrumComponent]
    });
    fixture = TestBed.createComponent(TacheScrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
