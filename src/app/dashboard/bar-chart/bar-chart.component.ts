
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'
import { Color, Label } from 'ng2-charts'
import {ApplicationService} from "../../Service/application.service";


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit, OnChanges {
  data: any
  @Input() dataAppart: any
  @Input() dataGspatrimoine: any
  public lineChartData: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: 'rgba(92, 187, 250, 0.637)',

      borderWidth: 1,
    },
  ]
  public lineChartOptions: ChartOptions = {
    responsive: true,
  }

  lineChartData2: ChartDataSets[] = [
    {
      data: [],
      backgroundColor: 'rgba(92, 187, 250, 0.637)',

      borderWidth: 1,
    },
  ]
  public lineChartLabels: Label[] = []
  // public lineChartLabels2: Label[] = [
  //   'A',
  //   'B',
  //   'C',
  //   'D',

  // ]
  formSelect = new FormControl()
  listSelect: string[] = ['appartenance', 'gestion patrimoine']
  public lineChartColors: Color[] = [
    {
      // borderColor: [
      //   'rgb(255, 99, 132)',
      //   'rgb(255, 159, 64)',
      //   'rgb(255, 205, 86)',
      //   'rgb(75, 192, 192)',
      //   'rgb(54, 162, 235)',
      //   'rgb(153, 102, 255)',
      //   'rgb(201, 203, 207)',
      // ],
    },
  ]
  public lineChartLegend = true
  public lineChartType: ChartType = 'bar'
  public lineChartPlugins = []

  constructor(public applicationService : ApplicationService) {
    this.formSelect.patchValue(this.listSelect[0])
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    this.dataAppart = changes['dataAppart'].currentValue
    this.dataGspatrimoine = changes['dataGspatrimoine'].currentValue

    // console.log('////' + this.dataAppart)
    // console.log(this.dataGspatrimoine.label)
    //
    // console.log(changes['dataGspatrimoine'].currentValue)

    this.lineChartLabels = this.dataAppart.label

    this.lineChartData = [
      {
        data: this.dataAppart.data,
        label: 'Appartenance',
        backgroundColor: 'rgba(92, 187, 250, 0.637)',

        borderWidth: 1,
      },
    ]
  }

  ngOnInit() {
    this.formSelect.valueChanges.subscribe((value) => {
      this.lineChartData = this.lineChartData2
      // this.lineChartLabels =this.lineChartLabels2;

      if (value === this.listSelect[0]) {
        console.log(this.dataAppart.label)
        this.lineChartLabels = this.dataAppart.label

        this.lineChartData = [
          {
            data: this.dataAppart.data,
            label: 'Appartenance',
            backgroundColor: 'rgba(92, 187, 250, 0.637)',

            borderWidth: 1,
          },
        ]
      }

      if (value === this.listSelect[1]) {
        console.log('ffffffffffffffffffff')
        const lineChartLabels: Label[] = this.dataGspatrimoine.label
        const lineChartData: ChartDataSets[] = [
          {
            data: this.dataGspatrimoine.data,
            label: 'Gestion patrimoine',
            backgroundColor: 'rgba(92, 187, 250, 0.637)',

            borderWidth: 1,
          },
        ]
        this.lineChartLabels = lineChartLabels
        this.lineChartData = lineChartData
      }
    })
  }
}
