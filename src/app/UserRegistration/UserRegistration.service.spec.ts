/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserRegistrationService } from './UserRegistration.service';

describe('Service: UserRegistration', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRegistrationService]
    });
  });

  it('should ...', inject([UserRegistrationService], (service: UserRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
