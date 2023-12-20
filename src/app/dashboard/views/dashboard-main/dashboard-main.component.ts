import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardSimpleData } from '../../models/DashboardSimpleData';
import { UIChart } from 'primeng/chart';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  dataClients: any;
  optionsClients: any;
  @ViewChild('chartClients', { static: true, read: UIChart }) chartClientsElement: UIChart;

  dataPersons: any;
  optionsPersons: any;
  @ViewChild('chartPersons', { static: true, read: UIChart }) chartPersonsElement: UIChart;

  plugins = [ChartDataLabels];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {

    Chart.register(ChartDataLabels);

    this.dashboardService.getData().subscribe((res) => {
      this.generateDataChart(res.clients, true);
    });

  }
  

  generateDataChart(data : DashboardSimpleData[], isClients: boolean) {

    data.sort((a, b) => {if (a.hours > b.hours) return -1; return 1});

    let documentStyle = getComputedStyle(document.documentElement);
    let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    let surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    let position = 1;



    let dataChart = {
        labels: data.map(item => (position++) + ". "+ item.name),
        datasets: [
            {
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: data.map(item => isClients ? item.hours : item.weeks),
                datalabels: {
                  align: 'end',
                  anchor: 'end'
                }
            }
        ]
    };

    let optionsChart = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            color: '#333',
            display: true,
            font: {
              weight: 'bold'
            }
          }
        },
        scales: {
            x: {
                ticks: {
                  color: textColorSecondary,
                  font: {
                    weight: 500
                  }
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false
                }
              },
              y: {
                ticks: {
                    crossAlign: "far",
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

    let heightChart = 100 + 30 * data.length;

    if (isClients) {
      this.dataClients = dataChart;
      this.optionsClients = optionsChart;
      this.chartClientsElement.el.nativeElement.childNodes[0].style['height'] = heightChart + 'px';
    }
    else {
      this.dataPersons = dataChart;
      this.optionsPersons = optionsChart;
      this.chartPersonsElement.el.nativeElement.childNodes[0].style['height'] = heightChart + 'px';
    }


  }

  generateDataPersons(data : DashboardSimpleData[]) {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dataPersons = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    this.optionsPersons = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };

  }

}
