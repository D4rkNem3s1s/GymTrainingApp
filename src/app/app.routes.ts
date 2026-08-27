import { Routes } from '@angular/router';
import { RoutineList } from './components/routine-list/routine-list';
import { RoutineDetail } from './components/routine-detail/routine-detail';


export const routes: Routes = [
  { path: '', component: RoutineList },
  { path: 'rutina/:id', component: RoutineDetail },
  { path: '**', redirectTo: '' }
];
