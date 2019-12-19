import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './pages/default/default.component';
import { ImportComponent } from './pages/import/import.component';
import { ReviewComponent } from './pages/review/review.component';
import { ReviewResolver } from './pages/review/review.resolver';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DefaultComponent
      },
      {
        path: 'review/:id',
        component: ReviewComponent,
        resolve: { data: ReviewResolver }
      },
      {
        path: 'import',
        component: ImportComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CircleRoutingModule {
}
