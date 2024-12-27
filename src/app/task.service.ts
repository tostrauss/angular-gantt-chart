import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(task: any): void {
    const tasks = this.tasksSubject.getValue();
    if (tasks.some(t => t.name === task.name)) {
      alert(`Task "${task.name}" already exists.`);
      return;
    }
    if (Array.isArray(task.dependencies)) {
      for (const dep of task.dependencies) {
        if (!tasks.some(t => t.name === dep)) {
          alert(`Invalid dependency "${dep}" for "${task.name}".`);
          return;
        }
        if (dep === task.name) {
          alert(`Task "${task.name}" cannot depend on itself.`);
          return;
        }
      }
    }
    task.startDate = this.normalizeDate(task.startDate);
    task.endDate = this.normalizeDate(task.endDate);
    if (!task.startDate || !task.endDate) {
      alert(`"${task.name}" has invalid dates.`);
      return;
    }
    this.tasksSubject.next([...tasks, task]);
  }

  removeTask(name: string): void {
    const tasks = this.tasksSubject.getValue();
    const idx = tasks.findIndex(t => t.name === name);
    if (idx === -1) {
      alert(`Task "${name}" not found.`);
      return;
    }
    tasks.splice(idx, 1);
    this.tasksSubject.next(tasks);
  }

  clearTasks(): void {
    this.tasksSubject.next([]);
  }

  fetchTasksFromAPI(): Observable<any[]> {
    return this.tasks$;
  }

  private normalizeDate(dateVal: string | Date): string | null {
    if (dateVal instanceof Date) {
      return isNaN(dateVal.getTime()) ? null : dateVal.toISOString();
    }
    const d = new Date(dateVal);
    return isNaN(d.getTime()) ? null : d.toISOString();
  }
}


