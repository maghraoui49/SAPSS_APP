import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../../Service/application.service";
import {Application} from "../../Model/application";
import {HttpErrorResponse} from "@angular/common/http";
import {DataArchiService} from "../../Service/data-archi.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Objet} from "../../Model/DataArchitecture/objet";
import {FormControl} from "@angular/forms";
import {Topic} from "../../Model/DataArchitecture/topic";
import {TableUtil} from "../../application/tableUtil";

@Component({
  selector: 'app-objet-metier',
  templateUrl: './objet-metier.component.html',
  styleUrls: ['./objet-metier.component.css']
})
export class ObjetMetierComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'domaine', 'socle', 'responsableSocle'];
  dataSource = new MatTableDataSource<Objet>();

  @ViewChild('paginator')
  paginator! : MatPaginator
  apiResponse! : any;


  private objetList!: any[];
  filterSelectObj: any[] = [];
  filterValues: any = {};


  socle : string[] =[] ;
  responsableSocle : string[]=[] ;
  domaine : string[]=[] ;


  ngsocle= ''
  ngresponsableSocle= ''
  ngdomaine= ''


  socleFilter = new FormControl();
  responsableSocleFilter = new FormControl();
  domaineFilter =new FormControl();


  globalFilter = '';


  filteredValues = {
    domaine: '', responsableSocle: '', socle: ''
  };



  constructor(public objetService : DataArchiService) { }

  ngOnInit(): void {
    this.getObjets();

    this.domaineFilter.valueChanges.subscribe((domaineFilterValue) => {
      this.filteredValues['domaine'] = domaineFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.responsableSocleFilter.valueChanges.subscribe((responsableSocleFilterValue) => {
      this.filteredValues['responsableSocle'] = responsableSocleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.socleFilter.valueChanges.subscribe((socleFilterValue) => {
      this.filteredValues['socle'] = socleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();

  }




  customFilterPredicate() {
    const myFilterPredicate = (data: Objet, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.nom.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.id.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.domaine.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.socle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.responsableSocle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1  ;

      }

      if (!globalMatch) {


        // @ts-ignore
        return;
      }

      let searchString = JSON.parse(filter);
      return data.domaine.toString().indexOf(searchString.domaine) !== -1 &&
        data.responsableSocle.toString().toLowerCase().indexOf(searchString.responsableSocle.toLowerCase()) !== -1 &&
        data.socle.toString().toLowerCase().indexOf(searchString.socle.toLowerCase()) !== -1  ;
    }
    return myFilterPredicate;
  }


  applyFilter(filter:any) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }




  public getObjets() :void {
    this.objetService.getObjet().subscribe(
      (response : Objet[]) => {
        this.apiResponse = response;
        this.dataSource.data = response;
        this.objetList = response;
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
    this.ngresponsableSocle= ''
    this.ngsocle= ''

    this.dataSource.filter = '';
  }


  buildFiledFilter(){
    this.domaine = this.objetList.map(t=>t.domaine).filter((element,i) =>
      i === this.objetList.map(t=>t.domaine).indexOf(element) );
    this.responsableSocle = this.objetList.map(t=>t.responsableSocle).filter((element,i) =>
      i === this.objetList.map(t=>t.responsableSocle).indexOf(element) );
    this.socle = this.objetList.map(t=>t.socle).filter((element,i) =>
      i === this.objetList.map(t=>t.socle).indexOf(element) );


  }

}
