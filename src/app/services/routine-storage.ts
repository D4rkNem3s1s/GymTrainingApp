import { Injectable, signal } from '@angular/core';
import { Rutina } from '../models/workout.model';

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
      const parsed: Rutina[] = JSON.parse(data);
      const rutinasConFecha = parsed.map(r => ({
        ...r,
        fechaCreacion: r.fechaCreacion || new Date().toISOString()
      }));
      this.rutinas.set(rutinasConFecha);
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