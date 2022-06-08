import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ApplicationComponent} from "./application/application.component";
import {EditeListeComponent} from "./edite-liste/edite-liste.component";
import {CreateApplicationComponent} from "./create-application/create-application.component";
import {DataArchitectureComponent} from "./data-architecture/data-architecture.component";
import {AppDecomessioneComponent} from "./app-decomessione/app-decomessione.component";
import {ListerApplicationComponent} from "./lister-application/lister-application.component";
import {SocleComponent} from "./data-architecture/socle/socle.component";
import {ServiceComponent} from "./data-architecture/service/service.component";
import {TopicFonctionnelComponent} from "./data-architecture/topic-fonctionnel/topic-fonctionnel.component";
import {ObjetMetierComponent} from "./data-architecture/objet-metier/objet-metier.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'application', component: ApplicationComponent},
  {path: 'data-architecture', component: DataArchitectureComponent},
  {path: 'app-decomessione', component: AppDecomessioneComponent},
  {path: 'create-application', component: CreateApplicationComponent},
  {path: 'edit-liste', component: EditeListeComponent},
  {path: 'lister-application', component: ListerApplicationComponent},
  {path: 'socle', component: SocleComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'topic-fonctionnel', component: TopicFonctionnelComponent},
  {path: 'objet-metier', component: ObjetMetierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
