import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './pages/library/library.component';
import { AlbumService } from '../../core/services/album.service';

@NgModule({
  declarations: [
    LibraryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    LibraryRoutingModule,
  ],
  providers: [AlbumService]
})
export class LibraryModule { } 