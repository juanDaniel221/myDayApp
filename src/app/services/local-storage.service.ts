import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  
  // Método para guardar datos en el local storage
  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Método para obtener datos del local storage
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Método para eliminar datos del local storage
  removeData(key: string): void {
    localStorage.removeItem(key);
  }
  
}
