import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAppComponent } from './log-app.component';

describe('LogAppComponent', () => {
  let component: LogAppComponent;
  let fixture: ComponentFixture<LogAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogAppComponent]
    });
    fixture = TestBed.createComponent(LogAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
