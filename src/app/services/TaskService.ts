import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tareas: Task[] = [];
  private tareasSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tareas);
  private localStorageKey = 'mydayapp-angular';

  constructor(private localStorageService: LocalStorageService) {
    this.tareas = this.getTareasFromLocalStorage();
    this.tareasSubject.next(this.tareas);
  }

  getTareas(): BehaviorSubject<Task[]> {
    return this.tareasSubject;
  }

  guardarTarea(nuevaTarea: Task): void {
    this.tareas.push(nuevaTarea);
    this.updateLocalStorage();
  }

  private getTareasFromLocalStorage(): Task[] {
    const storedTareas = this.localStorageService.getData(this.localStorageKey);
    return storedTareas ? storedTareas : [];
  }

  private updateLocalStorage(): void {
    this.localStorageService.setData(this.localStorageKey, this.tareas);
    this.tareasSubject.next(this.tareas);
  }

  toggleCompleted(taskId: string): void {
    const taskToUpdate = this.tareas.find(task => task.id === taskId);

    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed;
      this.updateLocalStorage();
    }
  }

  toggleUpdateTitle(taskId: string, newNameTodo: string): void {
    const taskToUpdate = this.tareas.find(task => task.id === taskId);

    if (taskToUpdate) {
      taskToUpdate.title = newNameTodo;
      this.updateLocalStorage();
    }
  }

  eliminarTarea(taskId: string): void {
    this.tareas = this.tareas.filter(task => task.id !== taskId);
    this.updateLocalStorage();
  }

  borrarTareasCompletadas(): void {
    this.tareas = this.tareas.filter(task => !task.completed);
    this.updateLocalStorage();
  }
}