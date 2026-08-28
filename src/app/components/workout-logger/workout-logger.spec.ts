import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutLoggerComponent } from './workout-logger';

describe('WorkoutLoggerComponent', () => {
  let component: WorkoutLoggerComponent;
  let fixture: ComponentFixture<WorkoutLoggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutLoggerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutLoggerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
