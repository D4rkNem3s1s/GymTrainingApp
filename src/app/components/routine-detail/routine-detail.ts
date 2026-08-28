import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RoutineStorage } from '../../services/routine-storage';
import { SemanaEntrenamiento, RegistroEjercicio } from '../../models/workout.model';

@Component({
  selector: 'app-routine-detail',
  standalone: true,
  imports: [RouterLink, FormsModule, DatePipe],
  templateUrl: './routine-detail.html',
  styleUrl: './routine-detail.css'
})
export class RoutineDetail {
  private route = inject(ActivatedRoute);
  storageService = inject(RoutineStorage);

  routineId = this.route.snapshot.paramMap.get('id') || '';

  // Estado reactivo de la rutina actual
  rutina = computed(() => this.storageService.rutinas().find(r => r.id === this.routineId));

  // ID de la semana seleccionada
  semanaSeleccionadaId = signal<string | null>(null);

  // Mapeo para el input de agregar nuevo ejercicio por día { [diaId]: string }
  nuevoEjercicioNombre: Record<string, string> = {};

  // Semana activa actual (calculada o la primera si no se seleccionó ninguna)
  get semanaActual(): SemanaEntrenamiento | undefined {
    const r = this.rutina();
    if (!r || !r.semanas || r.semanas.length === 0) return undefined;

    if (this.semanaSeleccionadaId()) {
      return r.semanas.find(s => s.id === this.semanaSeleccionadaId());
    }
    return r.semanas[0];
  }

  seleccionarSemana(semanaId: string) {
    this.semanaSeleccionadaId.set(semanaId);
  }

  agregarSemana() {
    const r = this.rutina();
    if (!r || r.semanas.length === 0) return;

    const ultimaSemana = r.semanas[r.semanas.length - 1];
    const nuevaSemanaNumero = r.semanas.length + 1;

    // Mantenemos los ejercicios de la semana anterior pero reseteando sus campos
    const nuevosDias = ultimaSemana.dias.map(diaAnterior => ({
      id: crypto.randomUUID(),
      nombreDia: diaAnterior.nombreDia,
      ejercicios: diaAnterior.ejercicios.map(ej => ({
        id: crypto.randomUUID(),
        nombre: ej.nombre,
        fecha: new Date().toISOString(),
        series: ej.series,
        repeticiones: 0,
        pesoKg: '',
        notas: ''
      }))
    }));

    const nuevaSemana: SemanaEntrenamiento = {
      id: crypto.randomUUID(),
      numeroSemana: nuevaSemanaNumero,
      dias: nuevosDias
    };

    this.storageService.actualizarRutina({
      ...r,
      semanas: [...r.semanas, nuevaSemana]
    });

    this.semanaSeleccionadaId.set(nuevaSemana.id);
  }

  agregarEjercicio(diaId: string) {
    const nombre = this.nuevoEjercicioNombre[diaId]?.trim();
    if (!nombre) return;

    const r = this.rutina();
    const sem = this.semanaActual;
    if (!r || !sem) return;

    const nuevoEjercicio: RegistroEjercicio = {
      id: crypto.randomUUID(),
      nombre: nombre,
      fecha: new Date().toISOString(),
      series: 4,
      repeticiones: 10,
      pesoKg: '0',
      notas: ''
    };

    const semanasActualizadas = r.semanas.map(s => {
      if (s.id !== sem.id) return s;
      return {
        ...s,
        dias: s.dias.map(d => {
          if (d.id !== diaId) return d;
          return { ...d, ejercicios: [...d.ejercicios, nuevoEjercicio] };
        })
      };
    });

    this.storageService.actualizarRutina({ ...r, semanas: semanasActualizadas });
    this.nuevoEjercicioNombre[diaId] = '';
  }

  onCampoChange(diaId: string, ejercicioId: string, campo: keyof RegistroEjercicio, valor: any) {
    const r = this.rutina();
    const sem = this.semanaActual;
    if (!r || !sem) return;

    const semanasActualizadas = r.semanas.map(s => {
      if (s.id !== sem.id) return s;
      return {
        ...s,
        dias: s.dias.map(d => {
          if (d.id !== diaId) return d;
          return {
            ...d,
            ejercicios: d.ejercicios.map(ej => {
              if (ej.id !== ejercicioId) return ej;
              return { ...ej, [campo]: valor, fecha: new Date().toISOString() };
            })
          };
        })
      };
    });

    this.storageService.actualizarRutina({ ...r, semanas: semanasActualizadas });
  }

  eliminarEjercicio(diaId: string, ejercicioId: string) {
    const r = this.rutina();
    const sem = this.semanaActual;
    if (!r || !sem) return;

    const semanasActualizadas = r.semanas.map(s => {
      if (s.id !== sem.id) return s;
      return {
        ...s,
        dias: s.dias.map(d => {
          if (d.id !== diaId) return d;
          return {
            ...d,
            ejercicios: d.ejercicios.filter(ej => ej.id !== ejercicioId)
          };
        })
      };
    });

    this.storageService.actualizarRutina({ ...r, semanas: semanasActualizadas });
  }

  autoAjustarAltura(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}