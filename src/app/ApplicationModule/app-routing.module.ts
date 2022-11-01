import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dcc', pathMatch: 'full' },
  {
    path:'dcc',
    loadChildren: () => import('../LayoutModule/layout.module').then(mod => mod.LayoutModule)
  },
  {
    path:'dic',
    loadChildren: () => import('../LayoutModule/layout.module').then(mod => mod.LayoutModule)
  },
  { 
    path: '**',
    redirectTo: 'dcc', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"top"})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
