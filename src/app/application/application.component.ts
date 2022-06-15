import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {PeriodicElement} from "../Interfaces/periodic-element";
import {Application} from "../Model/application";
import {ApplicationService} from "../Service/application.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSelectChange} from "@angular/material/select";
import * as _ from "lodash";
import {FormBuilder, FormControl} from "@angular/forms";


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


  ngetat= ''
  ngappartenance= ''
  ngapplicatif= ''
  ngsocle= ''
  ngresponsable= ''
  nggestionPatrimoine= ''
  ngdeco= ''
  ngexploitation= ''

  appartenanceFilter = new FormControl();
  etatFilter = new FormControl();
  gestionPatrimoineFilter =new FormControl();
  exploitationFilter =new FormControl();
  socleFilter =new FormControl();
  decoFilter =new FormControl();
  responsableFilter =new FormControl();
  applicatifFilter =  new FormControl()

  globalFilter = '';




  filteredValues = {
    appartenance: '', gestionPatrimoine: '', exploitation: '',
    socle: '', etat: '', deco: '',
    responsable: '', applicatif: ''
  };




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

    // this.filterSelectObj = [
    //   {
    //
    //     name : 'appartenance',
    //     columnProp: 'appartenance',
    //     options: []
    //   }, {
    //
    //     name: 'etat',
    //     columnProp: 'etat',
    //     options: []
    //   }
    // ]
  }

  ngOnInit(): void {
    this.getApplication();

    this.appartenanceFilter.valueChanges.subscribe((appartenanceFilterValue) => {
      this.filteredValues['appartenance'] = appartenanceFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.gestionPatrimoineFilter.valueChanges.subscribe((gestionPatrimoineFilterValue) => {
      this.filteredValues['gestionPatrimoine'] = gestionPatrimoineFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.exploitationFilter.valueChanges.subscribe((exploitationFilterValue) => {
      this.filteredValues['exploitation'] = exploitationFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.socleFilter.valueChanges.subscribe((socleFilterValue) => {
      this.filteredValues['socle'] = socleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.etatFilter.valueChanges.subscribe((etatFilterValue) => {
      this.filteredValues['etat'] = etatFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.decoFilter.valueChanges.subscribe((decoFilterValue) => {
      this.filteredValues['deco'] = decoFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.responsableFilter.valueChanges.subscribe((responsableFilterValue) => {
      this.filteredValues['responsable'] = responsableFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.applicatifFilter.valueChanges.subscribe((applicatifFilterValue) => {
      this.filteredValues['applicatif'] = applicatifFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();


  }

  applyFilter(filter:any) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }


  customFilterPredicate() {
    const myFilterPredicate = (data: Application, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.nom.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.appartenance.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.gestionPatrimoine.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.socle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.deco.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.responsable.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.applicatif.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.exploitation.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.etat.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ;

      }

      if (!globalMatch) {


        // @ts-ignore
        return;
      }

      let searchString = JSON.parse(filter);
      return data.etat.toString().indexOf(searchString.etat) !== -1 &&
        data.appartenance.toString().toLowerCase().indexOf(searchString.appartenance.toLowerCase()) !== -1 &&
        data.gestionPatrimoine.toString().toLowerCase().indexOf(searchString.gestionPatrimoine.toLowerCase()) !== -1 &&
        data.socle.toString().toLowerCase().indexOf(searchString.socle.toLowerCase()) !== -1 &&
        data.deco.toString().toLowerCase().indexOf(searchString.deco.toLowerCase()) !== -1 &&
        data.responsable.toString().toLowerCase().indexOf(searchString.responsable.toLowerCase()) !== -1 &&
        data.applicatif.toString().toLowerCase().indexOf(searchString.applicatif.toLowerCase()) !== -1 &&
        data.exploitation.toString().toLowerCase().indexOf(searchString.exploitation.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }


  public getApplication() :void {
    this.applicationService.getApplications().subscribe(
      (response : Application[]) => {
        this.apiResponse = response;
        this.dataSource.data = response;
        this.applicationList = response;
        this.buildFiledFilter();
        this.dataSource.paginator = this.paginator;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
    }
    )
  }


  // onChange($event: MatSelectChange) {
  //   let filtereData = _.filter(this.apiResponse,(item) => {
  //     return item.appartenance.toLowerCase() ==$event.value.toLowerCase();
  //   })
  //   this.dataSource = new MatTableDataSource(filtereData);
  //   this.dataSource.paginator = this.paginator;
  //
  // }






  resetFilters() {
    this.ngetat= ''
    this.ngappartenance= ''
    this.ngapplicatif= ''
    this.ngsocle= ''
    this.ngresponsable= ''
    this.nggestionPatrimoine= ''
    this.ngdeco= ''
    this.ngexploitation= ''


    this.dataSource.filter = '';

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









