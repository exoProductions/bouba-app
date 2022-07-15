import { TestBed } from '@angular/core/testing';

import { PeerMenteeService } from './peer-mentee.service';

describe('PeerMenteeService', () => {
  let service: PeerMenteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeerMenteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
