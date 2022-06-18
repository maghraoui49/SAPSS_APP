import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Application} from "../Model/application";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationService} from "../Service/application.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup} from "@angular/forms";
import {TableUtil} from "../application/tableUtil";
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-app-decomessione',
  templateUrl: './app-decomessione.component.html',
  styleUrls: ['./app-decomessione.component.css']
})
export class AppDecomessioneComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'gestionPatrimoine', 'socle', 'dateDecommission'];
  dataSource = new MatTableDataSource<Application>();

  @ViewChild('paginator')
  paginator! : MatPaginator
  apiResponse! : any;

  private applicationList!: any[];
  filterSelectObj: any[] = [];
  filterValues: any = {};

  socle : string[]=[] ;
  responsable : string[]=[] ;
  domaine : string[] =[] ;
  gestionPatrimoine : string[]=[] ;
  categorie : string[]=[] ;


  ngsocle= ''
  ngresponsable= ''
  ngdomaine= ''
  nggestionPatrimoine= ''
  ngcategorie= ''


  socleFilter = new FormControl();
  responsableFilter = new FormControl();
  domaineFilter =new FormControl();
  gestionPatrimoineFilter =new FormControl();
  categorieFilter =new FormControl();


  globalFilter = '';

  filteredValues = {
    socle: '', responsable: '', domaine: '',
    gestionPatrimoine: '', categorie: '',
  };




  range = new FormGroup({
    // @ts-ignore
    start: new FormControl<Date | null>(null),
    // @ts-ignore
    end: new FormControl<Date | null>(null),
  });




  constructor(public applicationService : ApplicationService) { }

  ngOnInit(): void {
    this.getApplication();

    this.socleFilter.valueChanges.subscribe((socleFilterValue) => {
      this.filteredValues['socle'] = socleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    // this.range.value.start.subscribe((startFilterValue:any) => {
    //   this.start = startFilterValue;
    //   this.dataSource.filter = JSON.stringify(this.filteredValues);
    // });
    // this.range.value.end.subscribe((endFilterValue:any) => {
    //   this.filteredValues['end'] = endFilterValue;
    //   this.dataSource.filter = JSON.stringify(this.filteredValues);
    // });

    this.responsableFilter.valueChanges.subscribe((responsableFilterValue) => {
      this.filteredValues['responsable'] = responsableFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.domaineFilter.valueChanges.subscribe((domaineFilterValue) => {
      this.filteredValues['domaine'] = domaineFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.gestionPatrimoineFilter.valueChanges.subscribe((gestionPatrimoineFilterValue) => {
      this.filteredValues['gestionPatrimoine'] = gestionPatrimoineFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.categorieFilter.valueChanges.subscribe((categorieFilterValue) => {
      this.filteredValues['categorie'] = categorieFilterValue;
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
          data.id.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.gestionPatrimoine.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.socle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.responsable.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.domaine.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ;

      }

      if (!globalMatch) {


        // @ts-ignore
        return;
      }

      let searchString = JSON.parse(filter);

      return data.categorie.toString().indexOf(searchString.categorie) !== -1 &&
        data.gestionPatrimoine.toString().toLowerCase().indexOf(searchString.gestionPatrimoine.toLowerCase()) !== -1 &&
        // data.dateDecommission.toString().toLowerCase().indexOf(searchString.end.toLowerCase()) !== -1 &&
        //data.dateMiseEnService.toLowerCase().indexOf(searchString.start.toLowerCase()) !== -1 &&
         data.socle.toString().toLowerCase().indexOf(searchString.socle.toLowerCase()) !== -1 &&
        data.responsable.toString().toLowerCase().indexOf(searchString.responsable.toLowerCase()) !== -1 &&
        data.domaine.toString().toLowerCase().indexOf(searchString.domaine.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }

  public getApplication() :void {
    this.applicationService.getApplicationsDeco().subscribe(
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

  exportTable() {
    TableUtil.exportTableToExcel("ExampleMaterialTable");
  }

  resetFilters() {

    this.ngsocle= ''
    this.ngresponsable= ''
    this.nggestionPatrimoine= ''
    this.ngdomaine= ''
    this.ngcategorie= ''

    console.log(this.range)


    this.dataSource.filter = '';

  }


  buildFiledFilter(){
    this.categorie = this.applicationList.map(t=>t.categorie).filter((element,i) =>
      i === this.applicationList.map(t=>t.categorie).indexOf(element) );
    this.gestionPatrimoine = this.applicationList.map(t=>t.gestionPatrimoine).filter((element,i) =>
      i === this.applicationList.map(t=>t.gestionPatrimoine).indexOf(element) );
    this.domaine = this.applicationList.map(t=>t.domaine).filter((element,i) =>
      i === this.applicationList.map(t=>t.domaine).indexOf(element) );

    this.socle = this.applicationList.map(t=>t.socle).filter((element,i) =>
      i === this.applicationList.map(t=>t.socle).indexOf(element) );

    this.responsable = this.applicationList.map(t=>t.responsable).filter((element,i) =>
      i === this.applicationList.map(t=>t.responsable).indexOf(element) );

    }




}
