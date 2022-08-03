import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../../Service/application.service";
import {Application} from "../../Model/application";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DataArchiService} from "../../Service/data-archi.service";
import {Service} from "../../Model/DataArchitecture/service";
import {FormControl} from "@angular/forms";
import {Socle} from "../../Model/DataArchitecture/socle";
import {TableUtil} from "../../application/tableUtil";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {


  displayedColumns: string[] = ['id', 'libelle', 'socle', 'respoSocle','type'];
  dataSource = new MatTableDataSource<Service>();

  @ViewChild('paginator')
  paginator! : MatPaginator
  apiResponse! : any;


  private serviceList!: any[];
  filterSelectObj: any[] = [];
  filterValues: any = {};


  libelle : string[] =[] ;
  type : string[]=[] ;
  socle : string[]=[] ;
  respoSocle : string[]=[] ;

  nglibelle= ''
  ngtype= ''
  ngsocle= ''
  ngrespoSocle= ''

  libelleFilter = new FormControl();
  typeFilter = new FormControl();
  socleFilter =new FormControl();
  respoSocleFilter =new FormControl();

  globalFilter = '';


  filteredValues = {
    libelle: '', type: '', socle: '',
    respoSocle: ''
  };


  constructor(public serviceService : DataArchiService) { }

  ngOnInit(): void {
    this.getServices();

    this.libelleFilter.valueChanges.subscribe((libelleFilterValue) => {
      this.filteredValues['libelle'] = libelleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.typeFilter.valueChanges.subscribe((typeFilterValue) => {
      this.filteredValues['type'] = typeFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.socleFilter.valueChanges.subscribe((socleFilterValue) => {
      this.filteredValues['socle'] = socleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.respoSocleFilter.valueChanges.subscribe((respoSocleFilterValue) => {
      this.filteredValues['respoSocle'] = respoSocleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();

  }


  customFilterPredicate() {
    const myFilterPredicate = (data: Service, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.libelle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.id.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.type.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.socle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.respoSocle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1  ;

      }

      if (!globalMatch) {


        // @ts-ignore
        return;
      }

      let searchString = JSON.parse(filter);
      return data.libelle.toString().indexOf(searchString.libelle) !== -1 &&
        data.type.toString().toLowerCase().indexOf(searchString.type.toLowerCase()) !== -1 &&
        data.socle.toString().toLowerCase().indexOf(searchString.socle.toLowerCase()) !== -1 &&
        data.respoSocle.toString().toLowerCase().indexOf(searchString.respoSocle.toLowerCase()) !== -1 ;
    }
    return myFilterPredicate;
  }


  applyFilter(filter:any) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  public getServices() :void {
    this.serviceService.getService().subscribe(
      (response : Service[]) => {
        this.apiResponse = response;
        this.dataSource.data = response;
        this.serviceList = response;
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
    this.nglibelle= ''
    this.ngtype= ''
    this.ngrespoSocle= ''
    this.ngsocle= ''

    this.dataSource.filter = '';

  }




  buildFiledFilter(){
    this.libelle = this.serviceList.map(t=>t.libelle).filter((element,i) =>
      i === this.serviceList.map(t=>t.libelle).indexOf(element) );
    this.type = this.serviceList.map(t=>t.type).filter((element,i) =>
      i === this.serviceList.map(t=>t.type).indexOf(element) );
    this.socle = this.serviceList.map(t=>t.socle).filter((element,i) =>
      i === this.serviceList.map(t=>t.socle).indexOf(element) );

    this.respoSocle = this.serviceList.map(t=>t.respoSocle).filter((element,i) =>
      i === this.serviceList.map(t=>t.respoSocle).indexOf(element) );

  }
}
