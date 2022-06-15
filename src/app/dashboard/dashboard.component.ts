
import { Component, OnInit } from '@angular/core'

import {ApplicationService} from "../Service/application.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any
  etat: any
  lineChart: any
  appartenance: any
  gspatrimoine: any
  TOTALAPPLICATION!: number
  TOTALAPPLICATIONTMA!: number
  titreTotalApplication!: string
  titreApplicationTMA!: string

  constructor(
    private applicaionService: ApplicationService,

  ) {
    this.applicaionService.fetchDataDashboard().subscribe((data: any) => {
      this.data = data
      this.etat = data.etat
      this.lineChart = data.lineChart
      this.appartenance = data.appartenance
      this.gspatrimoine = data.gspatrimoine
      this.TOTALAPPLICATION = data.totalApplication
      this.TOTALAPPLICATIONTMA = data.totalApplicationTMA
      this.titreTotalApplication = data.titreTotalApplication
      this.titreApplicationTMA = data.titreApplicationTMA

      console.log(' this.data')
    })
  }

  ngOnInit(): void {
    console.log('hello')
  }
  ngAfterViewInit(): void {
    console.log('hello')
  }
}
