
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'


import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'
import {SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color,} from 'ng2-charts'
import {ApplicationService} from "../../Service/application.service";


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, OnChanges {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  }
  public pieChartLabels: Label[] = []
  public pieChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: [
        'rgb(204,18,36)',
        'rgb(13,142,201)',
        'rgb(211,167,36)',
        'rgb(33,199,66)',
      ],
    },
  ]
  public pieChartType: ChartType = 'pie'
  public pieChartLegend = true
  public pieChartPlugins = []
  @Input() data: any
  public pieChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ]

  constructor(private applicationService: ApplicationService) {
    monkeyPatchChartJsTooltip()
    monkeyPatchChartJsLegend()

    this.applicationService.fetchDataDashboard().subscribe((data: any) => {
        //this.data = data.etat
    })
  }
  ngOnChanges(changes: SimpleChanges): void {

    this.data = changes['data'].currentValue;


    this.pieChartLabels = changes['data'].currentValue.label

    this.pieChartData = [
      {
        data: changes['data'].currentValue.data,

        backgroundColor: [
          'rgb(204,18,36)',
          'rgb(13,142,201)',
          'rgb(211,167,36)',
          'rgb(33,199,66)',
        ],
      },
    ]


  }

  ngOnInit() {}
}
