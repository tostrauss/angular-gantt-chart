import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-gantt-chart',
  standalone: true,
  imports: [CommonModule, GoogleChartsModule],
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent {
  title = 'Gantt Chart';
  type: ChartType = ChartType.Gantt;
  data: any[] = [];
  columnNames = [
    'Task ID',
    'Task Name',
    'Start Date',
    'End Date',
    'Duration',
    'Percent Complete',
    'Dependencies'
  ];
  options = {
    height: 400,
    gantt: {
      trackHeight: 30,
      criticalPathEnabled: true, 
      innerGridTrack: { fill: '#e3f2fd' },
      innerGridDarkTrack: { fill: '#c5cae9' },
    }
  };

  constructor(private taskService: TaskService) {
    // Subscribe to task updates from the TaskService
    this.taskService.tasks$.subscribe(tasks => {
      console.log('Tasks received in GanttChartComponent:', tasks); // Debugging log

      // Map tasks to the data structure required by Google Charts
      this.data = tasks.map((task, index) => {
        const startDate = new Date(task.startDate);
        const endDate = new Date(task.endDate);

        // Validate dates
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error('Invalid date detected:', task);
          return null; // Skip invalid tasks
        }

        return [
          `Task ${index + 1}`,
          task.name,
          startDate,
          endDate,
          task.duration || null, // Use duration, null if not provided
          task.completion || 0,  // Default completion to 0
          null // Dependencies, can be extended later if needed
        ];
      }).filter(task => task !== null); // Filter out invalid tasks

      console.log('Data being passed to Google Chart:', this.data); // Debugging log
    });
  }
}
