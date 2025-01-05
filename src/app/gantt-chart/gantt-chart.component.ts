import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-gantt-chart',
  standalone: true,
  imports: [CommonModule, GoogleChartsModule],
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit {
  title = 'Gantt Chart';
  type: ChartType = ChartType.Gantt;
  columnNames = [
    'Task ID',
    'Task Name',
    'Start Date',
    'End Date',
    'Duration',
    'Percent Complete',
    'Dependencies'
  ];
  data: any[] = [];
  options = {
    height: 500,
    gantt: {
      trackHeight: 30,
      barCornerRadius: 5,
      percentEnabled: true,
      criticalPathEnabled: false,
      palette: [
        {
        color: '#2a9d8f',
        dark: '#1e7167',
        light: '#d4f1ef'
        }
      ],
      labelStyle: {
        fontName: 'Roboto',
        fontSize: 14,
        color: '#333'
      },
      innerGridTrack: { fill: '#f8f9fa' },
      innerGridDarkTrack: { fill: '#ebedef' }
    }
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.data = []; // Clearing of initial hardcoded task
    this.taskService.tasks$.subscribe(tasks => {
      this.data = tasks.map(t => {
        const startDate = new Date(t.startDate);
        const endDate = new Date(t.endDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error(`Invalid date for task: ${t.name}`);
          return null;
        }
  
        const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / 86400000);
        const dependencies = t.dependencies?.length ? t.dependencies.join(',') : null;
  
        return [t.name, t.name, startDate, endDate, duration, t.completion || 0, dependencies];
      }).filter(row => row); // Remove invalid rows
    });
  }
}  









