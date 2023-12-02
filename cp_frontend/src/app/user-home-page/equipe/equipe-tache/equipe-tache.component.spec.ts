import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeTacheComponent } from './equipe-tache.component';

describe('EquipeTacheComponent', () => {
  let component: EquipeTacheComponent;
  let fixture: ComponentFixture<EquipeTacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquipeTacheComponent]
    });
    fixture = TestBed.createComponent(EquipeTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
