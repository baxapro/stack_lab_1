import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  addTask(): void {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle.trim(), this.newTaskDescription.trim())
        .subscribe(
          task => {
            this.tasks.push(task);
            this.newTaskTitle = '';
            this.newTaskDescription = '';
          },
          error => {
            console.error('Error adding task:', error);
          }
        );
    }
  }

  markAsCompleted(taskId: string): void {
    this.taskService.markTaskAsCompleted(taskId)
      .subscribe(updatedTask => {
        const taskIndex = this.tasks.findIndex(task => task._id === updatedTask._id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = updatedTask;
        }
      });
  }

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
      });
  }
}
