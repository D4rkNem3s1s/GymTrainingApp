export enum DiaSemana {
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIERCOLES = 'Miércoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SABADO = 'Sábado',
  DOMINGO = 'Domingo'
}

export interface RegistroEjercicio {
  id: string;
  nombre?: string;
  fecha?: string | Date; 
  series: number;
  repeticiones: number;
  pesoKg: string;
  notas?: string;
}

export type RegistroSesion = RegistroEjercicio;

export interface DiaEntrenamiento {
  id: string;
  nombreDia: string; // ej: "Lunes"
  ejercicios: RegistroEjercicio[];
}

export interface SemanaEntrenamiento {
  id: string;
  numeroSemana: number; // ej: 1, 2, 3...
  dias: DiaEntrenamiento[];
}

export interface Rutina {
  id: string;
  nombre: string;
  descripcion?: string;
  fechaCreacion: string;
  semanas: SemanaEntrenamiento[];
}