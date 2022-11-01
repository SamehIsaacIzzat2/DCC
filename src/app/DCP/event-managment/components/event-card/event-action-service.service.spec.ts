import { TestBed } from '@angular/core/testing';

import { EventActionServiceService } from './event-action-service.service';

describe('EventActionServiceService', () => {
  let service: EventActionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventActionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
