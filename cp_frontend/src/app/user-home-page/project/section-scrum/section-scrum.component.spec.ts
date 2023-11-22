import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionScrumComponent } from './section-scrum.component';

describe('SectionScrumComponent', () => {
  let component: SectionScrumComponent;
  let fixture: ComponentFixture<SectionScrumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SectionScrumComponent]
    });
    fixture = TestBed.createComponent(SectionScrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
