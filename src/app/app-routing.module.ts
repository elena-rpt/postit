import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VersionComponent } from './version/version.component';
import { GithubComponent } from './github/github.component';
import { LoginComponent } from './login/login.component';

let routes = [
  { path: '', component: LoginComponent },
  { path: 'prova', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundModule),
    data: { preload: true },
  },
  {
    path: 'version',
    component: VersionComponent,
    outlet: 'info',
  },
  {
    path: 'link',
    component: GithubComponent,
    outlet: 'info',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
