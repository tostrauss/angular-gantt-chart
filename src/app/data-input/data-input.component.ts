import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { TaskService } from '../task.service';



@Component({
  selector: 'app-data-input',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.css']
})
export class DataInputComponent {
  taskName = '';
  startDate = '';
  endDate = '';
  duration = 0;
  priority = 0;
  completion = false;

  constructor(private taskService: TaskService, private router: Router) {}

  onAddTask() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert('Invalid date format. Please ensure both Start Date and End Date are valid.');
        return;
    }

    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    const task = {
        name: this.taskName,
        startDate,
        endDate,
        duration,
        priority: this.priority,
        completion: this.completion,
    };

    console.log('Task being added:', task); // Log task data for debugging

    this.taskService.addTask(task);
    alert(`Task "${task.name}" added successfully.`);
    this.router.navigate(['/gantt-chart']); // Navigate to the Gantt Chart page
}



}


