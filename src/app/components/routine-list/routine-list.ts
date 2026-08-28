import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RoutineStorage } from '../../services/routine-storage';
import { DiaSemana, SemanaEntrenamiento } from '../../models/workout.model';

@Component({
  imports: [RouterLink, FormsModule, DatePipe],
  selector: 'app-routine-list',
  styleUrl: './routine-list.css',
  templateUrl: './routine-list.html',
  standalone: true
})
export class RoutineList {
  storageService = inject(RoutineStorage);

  nombre = '';
  descripcion = '';
  diasDisponibles = Object.values(DiaSemana);
  diasSeleccionados: DiaSemana[] = [
    DiaSemana.LUNES,
    DiaSemana.MARTES,
    DiaSemana.MIERCOLES,
    DiaSemana.JUEVES,
    DiaSemana.VIERNES
  ];

  toggleDia(dia: DiaSemana) {
    if (this.diasSeleccionados.includes(dia)) {
      this.diasSeleccionados = this.diasSeleccionados.filter(d => d !== dia);
    } else {
      this.diasSeleccionados.push(dia);
    }
  }

  crearRutina() {
    if (!this.nombre.trim()) return;

    const diasIniciales = this.diasSeleccionados.map(d => ({
      id: crypto.randomUUID(),
      nombreDia: d,
      ejercicios: []
    }));

    const semanaUno: SemanaEntrenamiento = {
      id: crypto.randomUUID(),
      numeroSemana: 1,
      dias: diasIniciales
    };

    this.storageService.crearRutina({
      nombre: this.nombre,
      descripcion: this.descripcion,
      semanas: [semanaUno]
    });

    this.nombre = '';
    this.descripcion = '';
  }
}