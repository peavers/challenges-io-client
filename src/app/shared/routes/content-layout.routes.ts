import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../../modules/project/project.module').then(m => m.ProjectModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('../../modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('../../modules/admin/admin.module').then(m => m.AdminModule)
  }
];
