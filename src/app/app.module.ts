import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationComponent } from './application/application.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { EditeListeComponent } from './edite-liste/edite-liste.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DataArchitectureComponent } from './data-architecture/data-architecture.component';
import { AppDecomessioneComponent } from './app-decomessione/app-decomessione.component';
import { ListerApplicationComponent } from './lister-application/lister-application.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { FilterSidenavComponent } from './filter-sidenav/filter-sidenav.component';
import {HttpClientModule} from "@angular/common/http";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SocleComponent } from './data-architecture/socle/socle.component';
import { ServiceComponent } from './data-architecture/service/service.component';
import { TopicFonctionnelComponent } from './data-architecture/topic-fonctionnel/topic-fonctionnel.component';
import { ObjetMetierComponent } from './data-architecture/objet-metier/objet-metier.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {LineChartComponent} from "./dashboard/line-chart/line-chart.component";
import {PieChartComponent} from "./dashboard/pie-chart/pie-chart.component";
import {BarChartComponent} from "./dashboard/bar-chart/bar-chart.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DatePipe} from "@angular/common";
import {ChartsModule} from "ng2-charts";
import { LoginComponent } from './login/login.component';
import {MakeBold} from "./application/bold.pipe";




@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    ApplicationComponent,
    CreateApplicationComponent,
    EditeListeComponent,
    DataArchitectureComponent,
    AppDecomessioneComponent,
    ListerApplicationComponent,
    ToolbarComponent,
    FilterSidenavComponent,
    SocleComponent,
    ServiceComponent,
    TopicFonctionnelComponent,
    ObjetMetierComponent,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
    LoginComponent,
    MakeBold

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatProgressBarModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ChartsModule,
    FlexLayoutModule,




  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
