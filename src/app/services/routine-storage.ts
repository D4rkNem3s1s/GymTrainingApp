import { Injectable, signal } from '@angular/core';
import { Rutina, RegistroEjercicio, SemanaEntrenamiento } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class RoutineStorage {
  private readonly STORAGE_KEY = 'gym_training_rutinas';
  rutinas = signal<Rutina[]>([]);

  constructor() {
    this.cargarRutinas();
  }

  private cargarRutinas(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.rutinas.set(JSON.parse(data));
    }
  }

  private guardarEnStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.rutinas()));
  }

  crearRutina(nuevaRutina: Omit<Rutina, 'fechaCreacion' | 'id'>): void {
    const rutina: Rutina = {
      ...nuevaRutina,
      id: crypto.randomUUID(),
      fechaCreacion: new Date().toISOString()
    };
    this.rutinas.update(list => [...list, rutina]);
    this.guardarEnStorage();
  }

  eliminarRutina(id: string): void {
    this.rutinas.update(list => list.filter(r => r.id !== id));
    this.guardarEnStorage();
  }

  actualizarRutina(rutinaActualizada: Rutina): void {
  this.rutinas.update(list => list.map(r => r.id === rutinaActualizada.id ? rutinaActualizada : r));
  this.guardarEnStorage();
}
}