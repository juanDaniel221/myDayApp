import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { TaskService } from 'src/app/services/TaskService';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit, OnDestroy {

  editingIndex: number | null = null; // Índice de la tarea en edición // Índice de la tarea en modo de edición
  nuevaTarea: string = '';
  tareas: Task[] = [];
  taskSubscription: Subscription | undefined;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskSubscription = this.taskService.getTareas().subscribe(tareas => {
      this.tareas = tareas.filter(todo => todo.completed === false);
    });
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
  onChangeTaskStatus(taskId: string): void {
    this.taskService.toggleCompleted(taskId);
  }
  onDeleteTaskStatus(taskId: string): void {
    this.taskService.eliminarTarea(taskId);
  }

  updateTarea(taskId: string): void {
    this.editingIndex = null;
    const tituloLimpiado = this.nuevaTarea.trim();

    if(tituloLimpiado !== ''){
      this.taskService.toggleUpdateTitle(taskId, tituloLimpiado);
    }else{
      
          // Imprimir en la consola la tarea guardada
          console.log('El título de la tarea está vacío. Por favor, ingresa un título válido.');

    }
  }

  onLabelDoubleClick(index: number, name : string): void {
    this.nuevaTarea= name
    this.editingIndex = index; // Establecer el índice de la tarea en edición
  }

  onKeyUp(event: Event): void {
    if (event instanceof KeyboardEvent && event.key === 'Escape') {
      this.editingIndex = null; // Si se presiona la tecla Esc, salir del modo edición
      this.nuevaTarea = ''; // Limpiar el valor del input
    }
  }
}
