import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostitListComponent } from './postit-list/postit-list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './postit-list/create/create.component';
import { PrivateComponent } from './private/private.component';

import { PrivateGuard } from './private.guard';

import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'home',
    children: [
      { path: '', component: PostitListComponent },
      { path: 'detail/:id', component: DetailComponent },
      {
        path: 'private',
        component: PrivateComponent,
        canActivate: [PrivateGuard],
        canDeactivate: [PrivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
  declarations: [
    PostitListComponent,
    CreateComponent,
    DetailComponent,
    PrivateComponent,
  ],
})
export class PostitModule {}
