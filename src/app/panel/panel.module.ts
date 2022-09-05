import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelRoutingModule } from './panel-routing.module';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewComponent } from './components/view/view.component';


@NgModule({
  declarations: [
    CreateComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    PanelRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class PanelModule { }
