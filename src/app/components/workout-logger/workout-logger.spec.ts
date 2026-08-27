import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutLogger } from './workout-logger';

describe('WorkoutLogger', () => {
  let component: WorkoutLogger;
  let fixture: ComponentFixture<WorkoutLogger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutLogger],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutLogger);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
