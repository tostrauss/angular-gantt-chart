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
      trackHeight: 40,
      barCornerRadius: 4,
      percentEnabled: true,
      criticalPathEnabled: false,
      palette: [
        {
          color: '#4682B4',
          dark: '#315f7c',
          light: '#e5ecf6'
        }
      ],
      labelStyle: {
        fontName: 'Arial',
        fontSize: 14,
        color: '#000'
      },
      innerGridTrack: { fill: '#f8f9fa' },
      innerGridDarkTrack: { fill: '#ebedef' }
    }
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.data = [
      ['HardcodedID', 'Hardcoded Task', new Date(2024, 11, 27), new Date(2025, 0, 14), 18, 30, null]
    ];
    this.taskService.tasks$.subscribe(tasks => {
      const rows = tasks.map(t => {
        const s = new Date(t.startDate);
        const e = new Date(t.endDate);
        if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
        const dur = t.duration || Math.ceil((e.getTime() - s.getTime()) / 86400000);
        const deps = Array.isArray(t.dependencies) && t.dependencies.length
          ? t.dependencies.join(',')
          : null;
        return [t.name, t.name, s, e, dur, t.completion || 0, deps];
      }).filter(r => r);
      this.data.push(...rows);
    });
  }
}









