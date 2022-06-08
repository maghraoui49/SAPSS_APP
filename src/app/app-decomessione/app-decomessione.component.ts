import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Application} from "../Model/application";
import {MatPaginator} from "@angular/material/paginator";
import {ApplicationService} from "../Service/application.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-app-decomessione',
  templateUrl: './app-decomessione.component.html',
  styleUrls: ['./app-decomessione.component.css']
})
export class AppDecomessioneComponent implements OnInit {


  displayedColumns: string[] = ['id', 'nom', 'gestionPatrimoine', 'socle', 'dateDeco'];
  dataSource = new MatTableDataSource<Application>();

  @ViewChild('paginator')
  paginator! : MatPaginator
  apiResponse! : any;

  constructor(public applicationService : ApplicationService) { }

  ngOnInit(): void {
    this.getApplication();
  }

  public getApplication() :void {
    this.applicationService.getApplicationsDeco().subscribe(
      (response : Application[]) => {
        this.apiResponse = response;
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;

      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }






  searchData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

}
