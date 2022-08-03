import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../../Service/application.service";
import {Application} from "../../Model/application";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DataArchiService} from "../../Service/data-archi.service";
import {Socle} from "../../Model/DataArchitecture/socle";
import {FormControl} from "@angular/forms";
import {TableUtil} from "../../application/tableUtil";

@Component({
  selector: 'app-socle',
  templateUrl: './socle.component.html',
  styleUrls: ['./socle.component.css']
})
export class SocleComponent implements OnInit {


  displayedColumns: string[] = ['id', 'domaine', 'libelle', 'resp', 'archi'];
  dataSource = new MatTableDataSource<Socle>();

  @ViewChild('paginator')
  paginator! : MatPaginator
  apiResponse! : any;


  private socleList!: any[];
  filterSelectObj: any[] = [];
  filterValues: any = {};


  libelle : string[] =[] ;
  domaine : string[]=[] ;
  archi : string[]=[] ;
  categorie : string[]=[] ;

  nglibelle= ''
  ngdomaine= ''
  ngarchi= ''
  ngcategorie= ''

  libelleFilter = new FormControl();
  domaineFilter = new FormControl();
  archiFilter =new FormControl();
  categorieFilter =new FormControl();

  globalFilter = '';


  filteredValues = {
    libelle: '', domaine: '', archi: '',
    categorie: ''
  };


  constructor(public socleService : DataArchiService) { }

  ngOnInit(): void {
    this.getSocles();

    this.libelleFilter.valueChanges.subscribe((libelleFilterValue) => {
      this.filteredValues['libelle'] = libelleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.domaineFilter.valueChanges.subscribe((domaineFilterValue) => {
      this.filteredValues['domaine'] = domaineFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.archiFilter.valueChanges.subscribe((archiFilterValue) => {
      this.filteredValues['archi'] = archiFilterValue;
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
    const myFilterPredicate = (data: Socle, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.libelle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.id.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.domaine.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.archi.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.categorie.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1  ;

      }

      if (!globalMatch) {


        // @ts-ignore
        return;
      }

      let searchString = JSON.parse(filter);
      return data.libelle.toString().indexOf(searchString.libelle) !== -1 &&
        data.domaine.toString().toLowerCase().indexOf(searchString.domaine.toLowerCase()) !== -1 &&
        data.categorie.toString().toLowerCase().indexOf(searchString.categorie.toLowerCase()) !== -1 &&
        data.archi.toString().toLowerCase().indexOf(searchString.archi.toLowerCase()) !== -1 ;
    }
    return myFilterPredicate;
  }



  public getSocles() :void {
    this.socleService.getSocle().subscribe(
      (response : Socle[]) => {
        this.apiResponse = response;
        this.dataSource.data = response;
        this.socleList = response;
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
    this.ngdomaine= ''
    this.ngarchi= ''
    this.nglibelle= ''
    this.ngcategorie= ''

    this.dataSource.filter = '';

  }




  buildFiledFilter(){
    this.libelle = this.socleList.map(t=>t.libelle).filter((element,i) =>
      i === this.socleList.map(t=>t.libelle).indexOf(element) );
    this.domaine = this.socleList.map(t=>t.domaine).filter((element,i) =>
      i === this.socleList.map(t=>t.domaine).indexOf(element) );
    this.categorie = this.socleList.map(t=>t.categorie).filter((element,i) =>
      i === this.socleList.map(t=>t.categorie).indexOf(element) );

    this.archi = this.socleList.map(t=>t.archi).filter((element,i) =>
      i === this.socleList.map(t=>t.archi).indexOf(element) );

    }

}
