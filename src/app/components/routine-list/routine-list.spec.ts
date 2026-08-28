import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RoutineList } from './routine-list';

describe('RoutineList', () => {
  let component: RoutineList;
  let fixture: ComponentFixture<RoutineList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutineList],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutineList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
