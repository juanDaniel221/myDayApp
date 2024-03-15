import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/models/task.model'; 
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { v4 as uuidv4 } from 'uuid';
import { TaskService } from 'src/app/services/TaskService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {

  nuevaTarea: string = '';


  tareas : Task[]= [];
  tareas1 : Task[]= [];
  taskSubscription: Subscription | undefined;

  constructor(
    private taskService: TaskService
    ) {
  }

  ngOnInit(): void {
    this.taskSubscription = this.taskService.getTareas().subscribe(tareas => {
      this.tareas = tareas;
    });
    this.taskSubscription = this.taskService.getTareas().subscribe(tareas => {
      this.tareas1 = tareas.filter(todo => todo.completed === true);
    });
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
  guardarTarea(): void {
    const tituloLimpiado = this.nuevaTarea.trim();

    if(tituloLimpiado !== ''){

      const nuevaTareaId = uuidv4();
      // Agregar la nueva tarea al arreglo
      //this.tareas.push({ id: nuevaTareaId, title: tituloLimpiado, completed: false});
      
      // Guardar el arreglo actualizado en el Local Storage
      //this.localStorageService.setData('mydayapp-angular', this.tareas);
      this.taskService.guardarTarea({ id: nuevaTareaId, title: tituloLimpiado, completed: false})
  
      // Limpiar el campo después de guardar la tarea
      this.nuevaTarea = '';
    }else{
      
          // Imprimir en la consola la tarea guardada
          console.log('El título de la tarea está vacío. Por favor, ingresa un título válido.');

    }
  }
  onClearTaskStatus(): void {
    this.taskService.borrarTareasCompletadas();
  }


}
