import {Component, OnInit, ViewChild} from '@angular/core';
import {ApplicationService} from "../../Service/application.service";
import {Application} from "../../Model/application";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DataArchiService} from "../../Service/data-archi.service";
import {Topic} from "../../Model/DataArchitecture/topic";
import {FormControl} from "@angular/forms";
import {Service} from "../../Model/DataArchitecture/service";
import {TableUtil} from "../../application/tableUtil";

@Component({
  selector: 'app-topic-fonctionnel',
  templateUrl: './topic-fonctionnel.component.html',
  styleUrls: ['./topic-fonctionnel.component.css']
})
export class TopicFonctionnelComponent implements OnInit {




  displayedColumns: string[] = ['id', 'libelle', 'socle', 'objetMetier','categorie'];
  dataSource = new MatTableDataSource<Topic>();

  @ViewChild('paginator')
  paginator! : MatPaginator
  apiResponse! : any;


  private topicList!: any[];
  filterSelectObj: any[] = [];
  filterValues: any = {};


  objetMetier : string[] =[] ;
  categorie : string[]=[] ;
  socle : string[]=[] ;


  ngobjetMetier= ''
  ngcategorie= ''
  ngsocle= ''


  objetMetierFilter = new FormControl();
  categorieFilter = new FormControl();
  socleFilter =new FormControl();


  globalFilter = '';


  filteredValues = {
    objetMetier: '', categorie: '', socle: ''
  };


  constructor(public topicService : DataArchiService) { }

  ngOnInit(): void {
    this.getTopics();
    this.objetMetierFilter.valueChanges.subscribe((objetMetierFilterValue) => {
      this.filteredValues['objetMetier'] = objetMetierFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.categorieFilter.valueChanges.subscribe((categorieFilterValue) => {
      this.filteredValues['categorie'] = categorieFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.socleFilter.valueChanges.subscribe((socleFilterValue) => {
      this.filteredValues['socle'] = socleFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();

  }




  customFilterPredicate() {
    const myFilterPredicate = (data: Topic, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.libelle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.id.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.categorie.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.socle.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1 ||
          data.objetMetier.toString().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1  ;

      }

      if (!globalMatch) {


        // @ts-ignore
        return;
      }

      let searchString = JSON.parse(filter);
      return data.objetMetier.toString().indexOf(searchString.objetMetier) !== -1 &&
        data.categorie.toString().toLowerCase().indexOf(searchString.categorie.toLowerCase()) !== -1 &&
        data.socle.toString().toLowerCase().indexOf(searchString.socle.toLowerCase()) !== -1  ;
    }
    return myFilterPredicate;
  }



  applyFilter(filter:any) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }



  public getTopics() :void {
    this.topicService.getTopic().subscribe(
      (response : Topic[]) => {
        this.apiResponse = response;
        this.dataSource.data = response;
        this.topicList = response;
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
    this.ngcategorie= ''
    this.ngobjetMetier= ''
    this.ngsocle= ''

    this.dataSource.filter = '';
  }

  buildFiledFilter(){
    this.objetMetier = this.topicList.map(t=>t.objetMetier).filter((element,i) =>
      i === this.topicList.map(t=>t.objetMetier).indexOf(element) );
    this.categorie = this.topicList.map(t=>t.categorie).filter((element,i) =>
      i === this.topicList.map(t=>t.categorie).indexOf(element) );
    this.socle = this.topicList.map(t=>t.socle).filter((element,i) =>
      i === this.topicList.map(t=>t.socle).indexOf(element) );


  }


}
