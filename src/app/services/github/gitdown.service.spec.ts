import { TestBed } from '@angular/core/testing';

import { GitdownService } from './gitdown.service';

describe('GitdownService', () => {
  let service: GitdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
