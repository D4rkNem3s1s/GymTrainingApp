import { TestBed } from '@angular/core/testing';
import { RoutineStorage } from './routine-storage';

describe('RoutineStorage', () => {
  let service: RoutineStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutineStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
