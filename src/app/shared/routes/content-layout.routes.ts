import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../modules/project/project.module').then(m => m.ProjectModule)
  }
];
