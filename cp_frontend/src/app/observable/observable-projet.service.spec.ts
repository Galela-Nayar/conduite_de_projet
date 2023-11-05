import { TestBed } from '@angular/core/testing';

import { ObservableProjetService } from './observable-projet.service';

describe('ObservableProjetService', () => {
  let service: ObservableProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObservableProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
