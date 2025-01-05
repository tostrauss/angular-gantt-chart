import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-data-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.css']
})
export class DataInputComponent {
  taskName = '';
  startDate = '';
  endDate = '';
  priority = 'Low';
  completion = 0;
  dependencies = '';
  error = '';

  constructor(private taskService: TaskService, private router: Router) {}

  onAddTask(): void {
    this.error = '';
  
    // Parse and validate start and end dates
    const parsedStart = this.parseGermanOrISO(this.startDate.trim());
    const parsedEnd = this.parseGermanOrISO(this.endDate.trim());
    if (!parsedStart || !parsedEnd) {
      this.error = 'Invalid date format.';
      return;
    }
    if (parsedEnd <= parsedStart) {
      this.error = 'End Date must be after Start Date.';
      return;
    }
  
    // Validate task name
    if (!this.taskName.trim()) {
      this.error = 'Task name cannot be empty.';
      return;
    }
  
    // Process dependencies
    const deps = this.dependencies.trim()
      ? this.dependencies.split(',').map(d => d.trim()).filter(d => d.length > 0)
      : [];
    for (const dep of deps) {
      if (dep === this.taskName.trim()) {
        this.error = `Task "${this.taskName.trim()}" cannot depend on itself.`;
        return;
      }
    }
  
    // Prepare task object
    const task = {
      name: this.taskName.trim(),
      startDate: parsedStart.toISOString(),
      endDate: parsedEnd.toISOString(),
      duration: Math.ceil((parsedEnd.getTime() - parsedStart.getTime()) / 86400000),
      priority: this.priority,
      completion: this.completion,
      dependencies: deps
    };
  
    // Add task to service
    try {
      this.taskService.addTask(task);
      alert(`Task "${task.name}" added successfully.`);
      this.router.navigate(['/gantt-chart']);
    } catch (err) {
      this.error = (err as Error).message;
    }
  }
  

  private parseGermanOrISO(val: string): Date | null {
    const pattern = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
    const m = val.match(pattern);
    if (m) {
      const day = parseInt(m[1], 10);
      const mon = parseInt(m[2], 10);
      const yr = parseInt(m[3], 10);
      const d = new Date(yr, mon - 1, day);
      return isNaN(d.getTime()) ? null : d;
    }
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  }
}





