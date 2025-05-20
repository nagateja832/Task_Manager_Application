import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, public router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => (this.tasks = data));
  }

  deleteTask(id: number) {
    if (confirm('Are you sure to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }

  // toggleComplete(task: Task) {
  //   this.taskService
  //     .updateTask(task.id!, { ...task })
  //     .subscribe(() => this.loadTasks());
  // }

  toggleComplete(task: Task) {
    console.log('task in list', task);

    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    this.taskService
      .updateTask(task.id!, { ...task, status: newStatus })
      .subscribe(() => this.loadTasks());
  }
}
