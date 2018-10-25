import { TestBed } from '@angular/core/testing';

import { MarsipularmiCService } from './marsipularmi-c.service';

describe('MarsipularmiCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarsipularmiCService = TestBed.get(MarsipularmiCService);
    expect(service).toBeTruthy();
  });
});
