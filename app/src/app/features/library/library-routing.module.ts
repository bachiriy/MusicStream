import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './pages/library/library.component';
import { LibraryResolver } from '../../core/resolvers/library.resolver';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    resolve: {
      auth: LibraryResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { } 