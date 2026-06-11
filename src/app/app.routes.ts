import { Routes } from '@angular/router';
import { AtanorComponent }      from './components/atanor/atanor.component';
import { MateriaPrimaComponent } from './components/materia-prima/materia-prima.component';
import { GrimorioComponent }    from './components/grimorio/grimorio.component';
import { PergaminhoComponent }  from './components/pergaminho/pergaminho.component';
import { ArquivosComponent }    from './components/arquivos/arquivos.component';

export const routes: Routes = [
  { path: '',           redirectTo: 'atanor', pathMatch: 'full' },
  { path: 'atanor',          component: AtanorComponent },
  { path: 'materia-prima',   component: MateriaPrimaComponent },
  { path: 'grimorio',        component: GrimorioComponent },
  { path: 'pergaminho/:id',  component: PergaminhoComponent },
  { path: 'arquivos',        component: ArquivosComponent },
];
