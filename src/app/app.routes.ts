import { Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Tu componente principal

export const routes: Routes = [
  // Redirigir todas las rutas internas hacia la página principal
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Redirigir cualquier ruta no definida a la principal
];

