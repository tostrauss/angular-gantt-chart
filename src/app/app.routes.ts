import { Routes } from '@angular/router';
import { DataInputComponent } from './data-input/data-input.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'data-input', pathMatch: 'full' },
  { path: 'data-input', component: DataInputComponent },
  { path: 'gantt-chart', component: GanttChartComponent }
];

