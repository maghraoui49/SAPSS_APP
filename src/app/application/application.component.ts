import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PeriodicElement} from "../Interfaces/periodic-element";
import {Application} from "../Model/application";
import {ApplicationService} from "../Service/application.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSelectChange} from "@angular/material/select";
import * as _ from "lodash";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'gestionPatrimoine', 'socle', 'etat'];

  dataSource = new MatTableDataSource<Application>();

  @ViewChild('paginator')
  paginator! : MatPaginator
  apiResponse! : any;


  private applicationList!: any[];
  filterSelectObj: any[] = [];
  filterValues: any = {};

  appartenance : string[] =[] ;
  gestionPatrimoine : string[]=[] ;
  exploitation : string[]=[] ;
  socle : string[]=[] ;
  etat : string[]=[] ;
  deco : string[]=[] ;
  responsable : string[]=[] ;
  applicatif : string[]=[] ;




  constructor(public applicationService : ApplicationService , formBuilder: FormBuilder ) {



    // this.dataSource.filterPredicate = ((data, filter: any) => {
    //   const a = !filter.appartenance || data.appartenance === filter.appartenance;
    //   const b = !filter.etat || data.etat.toLowerCase().includes(filter.etat);
    //
    //   return a && b ;
    // }) as (arg0: Application, arg1: string) => boolean;
    //
    // this.formControl = formBuilder.group({
    //   appartenance: '',
    //   etat: '',
    //
    // })
    // this.formControl.valueChanges.subscribe(value => {
    //   const filter = {...value, name: value.name.trim().toLowerCase()} as string;
    //   this.dataSource.filter = filter;
    // });

    this.filterSelectObj = [
      {

        name : 'appartenance',
        columnProp: 'appartenance',
        options: []
      }, {

        name: 'etat',
        columnProp: 'etat',
        options: []
      }
    ]
  }

  ngOnInit(): void {
    this.getApplication();
  }



  public getApplication() :void {
    this.applicationService.getApplications().subscribe(
      (response : Application[]) => {
        this.apiResponse = response;
        this.dataSource.data = response;
        this.applicationList = response;

        this.buildFiledFilter();
        this.dataSource.paginator = this.paginator;
        this.filterSelectObj[0].options=this.appartenance;
        this.filterSelectObj[1].options=this.etat;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
    }
    )
  }


  onChange($event: MatSelectChange) {
    let filtereData = _.filter(this.apiResponse,(item) => {
      return item.appartenance.toLowerCase() ==$event.value.toLowerCase();
    })
    this.dataSource = new MatTableDataSource(filtereData);
    this.dataSource.paginator = this.paginator;

  }






  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      // @ts-ignore
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }



  buildFiledFilter(){
    this.appartenance = this.applicationList.map(t=>t.appartenance).filter((element,i) =>
      i === this.applicationList.map(t=>t.appartenance).indexOf(element) );

    this.gestionPatrimoine = this.applicationList.map(t=>t.gestionPatrimoine).filter((element,i) =>
      i === this.applicationList.map(t=>t.gestionPatrimoine).indexOf(element) );
    this.exploitation = this.applicationList.map(t=>t.exploitation).filter((element,i) =>
      i === this.applicationList.map(t=>t.exploitation).indexOf(element) );

    this.socle = this.applicationList.map(t=>t.socle).filter((element,i) =>
      i === this.applicationList.map(t=>t.socle).indexOf(element) );

    this.etat = this.applicationList.map(t=>t.etat).filter((element,i) =>
      i === this.applicationList.map(t=>t.etat).indexOf(element) );

    this.deco = this.applicationList.map(t=>t.deco).filter((element,i) =>
      i === this.applicationList.map(t=>t.deco).indexOf(element) );

    this.responsable = this.applicationList.map(t=>t.responsable).filter((element,i) =>
      i === this.applicationList.map(t=>t.responsable).indexOf(element) );

    this.applicatif = this.applicationList.map(t=>t.applicatif).filter((element,i) =>
      i === this.applicationList.map(t=>t.applicatif).indexOf(element) );
  }


  searchData($event: any) {
    this.dataSource.filter = $event.target.value;
  }



}









