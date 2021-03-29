import { TestBed } from '@angular/core/testing';
import { ColumnHeaderService } from './column-header-service.service';

describe('ColumnHeaderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColumnHeaderService = TestBed.get(ColumnHeaderService);
    expect(service).toBeTruthy();
  });
});
