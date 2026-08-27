import { Component, Input } from '@angular/core';
import {DatePipe} from '@angular/common';
import { RegistroSesion } from '../../models/workout.model';

@Component({
  imports: [DatePipe],
  selector: 'app-exercise-history',
  styleUrl: './exercise-history.css',
  templateUrl: './exercise-history.html',
})
export class ExerciseHistory {
  @Input({required:true}) historial: RegistroSesion[] = [];
}
