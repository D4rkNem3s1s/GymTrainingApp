import { Component , inject} from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-workout-logger',
  standalone: true,
  styleUrl: './workout-logger.css',
  templateUrl: './workout-logger.html',
})
export class WorkoutLoggerComponent {
  private fb = inject(FormBuilder);

  loggerForm = this.fb.group({
    series: [3, [Validators.required, Validators.min(1)]],
    repeticionesPorSerie: [10, [Validators.required, Validators.min(1)]],
    pesoKg: [0, [Validators.required, Validators.min(1)]],
    notas: ['']
  });
}
