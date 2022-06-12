import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {Application} from "../Model/application";
import {HttpErrorResponse} from "@angular/common/http";
import {ListerAppService} from "../Service/lister-app.service";
import {MatSelectChange} from "@angular/material/select";




interface DataNode {
  name: string;
  children?: DataNode[];
}

//
// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [
//           {name: 'Broccoli'}, {name: 'Brussels sprouts'}],
//       },
//       {
//         name: 'Orange',
//         children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
//       },
//     ],
//   },
// ];



/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */





@Component({
  selector: 'app-lister-application',
  templateUrl: './lister-application.component.html',
  styleUrls: ['./lister-application.component.css']
})
export class ListerApplicationComponent implements OnInit {



  treedata: DataNode[] =[];


  public getDataDom() :void {
    this.listerAppService.getDataDom().subscribe(
      (response : any[]) => {
        this.dataSource.data = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public getDataCat() :void {
    this.listerAppService.getDataCat().subscribe(
      (response : any[]) => {
        this.dataSource.data = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getDataStruct() :void {
    this.listerAppService.getDataStruct().subscribe(
      (response : any[]) => {
        this.dataSource.data = response;
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }











  private _transformer = (node: DataNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private listerAppService : ListerAppService) {
    this.getDataDom();
    //this.dataSource.data = this.treedata;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  selected: any = '1';

  ngOnInit(): void {

  }

  getData($event: MatSelectChange) {
    console.log($event.value)

    switch($event.value) {
      case '1': {
        this.dataSource.data=[];
        this.getDataDom()
        console.log("dom")
        break;
      }
      case '2': {
        this.dataSource.data=[];
        this.getDataCat()
        console.log("cat")
        break;
      }
      case '3': {
        this.dataSource.data=[];
        this.getDataStruct()
        console.log("struct")
        break;
      }
      default: {
        console.log("default")
        break;
      }
    }
  }
}
