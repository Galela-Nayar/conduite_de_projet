import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniUserProfilComponent } from './mini-user-profil.component';

describe('MiniUserProfilComponent', () => {
  let component: MiniUserProfilComponent;
  let fixture: ComponentFixture<MiniUserProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniUserProfilComponent]
    });
    fixture = TestBed.createComponent(MiniUserProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
