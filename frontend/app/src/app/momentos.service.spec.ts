import { TestBed } from '@angular/core/testing';

import { MomentosService } from './momentos.service';

describe('MomentosService', () => {
  let service: MomentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
