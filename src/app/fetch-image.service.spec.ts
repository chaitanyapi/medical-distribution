import { TestBed, inject } from '@angular/core/testing';

import { FetchImageService } from './fetch-image.service';

describe('FetchImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchImageService]
    });
  });

  it('should be created', inject([FetchImageService], (service: FetchImageService) => {
    expect(service).toBeTruthy();
  }));
});
