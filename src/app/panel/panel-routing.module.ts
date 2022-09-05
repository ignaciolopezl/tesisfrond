import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewComponent } from './components/view/view.component';
import { PanelComponent } from './panel.component';


const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'edit',
        component: EditComponent,
      },
      {
        path: 'view',
        component: ViewComponent,
      },
    ]
  },


];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PanelRoutingModule { }
