import {Component, EventEmitter, OnInit, Output} from '@angular/core';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {




  constructor() { }

  ngOnInit(): void {
  }


}
