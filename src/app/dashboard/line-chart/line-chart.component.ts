
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { FormControl } from '@angular/forms'


import {ChartDataSets, ChartOptions, ChartType } from 'chart.js'

import { Color, Label } from 'ng2-charts'
import {ApplicationService} from "../../Service/application.service";


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnChanges {
  public lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'décommissionnement des applications',
    },
    { data: [], label: ' la 1ère mise en service de l\'application' },
  ]

  public lineChartLabels: Label[] = []
  public lineChartOptions: ChartOptions = {
    responsive: true,
  }
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ]

  public lineChartLegend = true
  public lineChartType: ChartType = 'line'
  public lineChartPlugins = []

  @Input() data: any
  constructor(

    private applicationService: ApplicationService,
  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    console.log('line')
    console.log('halim')
    console.log(changes['data'].currentValue.dataDecom)

    this.lineChartData = [
      {
        data: changes['data'].currentValue.dataDecom,
        label: 'décommissionnement des applications',
      },
      {
        data: changes['data'].currentValue.dataMiseEnService,
        label: 'création des applications',
      },
    ]

    this.lineChartLabels = changes['data'].currentValue.label
    //  this.lineChartData = [
    //   {
    //     data: dataAppart.lineChart.dataDecom,
    //      label: 'décommissionnement des applications',
    //    },
    //    {
    //     data: data.lineChart.dataMiseEnService,
    //      label: "la 1ère mise en service de l'application",
    //   },
    //  ]
    //  this.lineChartLabels = data.lineChart.label
  }

  ngOnInit() {}
}
