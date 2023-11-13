import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySectionComponent } from './modify-section.component';

describe('ModifySectionComponent', () => {
  let component: ModifySectionComponent;
  let fixture: ComponentFixture<ModifySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifySectionComponent]
    });
    fixture = TestBed.createComponent(ModifySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
