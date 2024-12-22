import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  addTask(task: any) {
    const tasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...tasks, task]);
  }
}
