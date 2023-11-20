import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEtatComponent } from './create-etat.component';

describe('CreateEtatComponent', () => {
  let component: CreateEtatComponent;
  let fixture: ComponentFixture<CreateEtatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEtatComponent]
    });
    fixture = TestBed.createComponent(CreateEtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
