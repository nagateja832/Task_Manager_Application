import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    // completed: false,
    status: 'pending',
  };
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private taskService: TaskService
  ) {}

  // ngOnInit(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.isEdit = true;
  //     this.taskService.getTask(+id).subscribe((t) => (this.task = t));
  //   }
  // }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log(id, params, 'params');

      if (id) {
        this.isEdit = true;
        this.taskService.getTask(+id).subscribe((t) => (this.task = t));
      } else {
        this.isEdit = false;
        this.task = {
          title: '',
          description: '',
          status: 'pending',
        };
      }
    });
  }

  onSubmit() {
    console.log('this.task', this.task);

    if (this.isEdit) {
      this.taskService
        .updateTask(this.task.id!, this.task)
        .subscribe(() => this.router.navigate(['/task']));
    } else {
      this.taskService
        .createTask(this.task)
        .subscribe(() => this.router.navigate(['/task']));
    }
  }
}
