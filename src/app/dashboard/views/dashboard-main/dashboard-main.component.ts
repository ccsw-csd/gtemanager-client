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

    setTimeout(() => {

      this.generateDataChart(this.dataRaw.clients, true);
      this.generateDataChart(this.dataRaw.persons, false);
    }, 100);
    return;
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



  dataRaw = {
    "clients": [
        {
            "name": "SCHNEIDER ELECTRIC INDUSTRIES SAS.",
            "weeks": 7,
            "hours": 280
        },
        {
            "name": "ROCHE DIAGNOSTICS, S.L.",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "MAPFRE ESPAÑA CIA. DE SEGUROS Y REASEGUROS, S.A.",
            "weeks": 8,
            "hours": 320
        },
        {
            "name": "Sky Deutschland Fernsehen GmbH & CO KG",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "AIRBUS DEFENCE & SPACE, S.A.U.",
            "weeks": 6,
            "hours": 240
        },
        {
            "name": "CONSUM SOCIEDAD COOPERATIVA V",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "AXA GROUP OPERATIONS SPAIN, S.A.",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "REPSOL, S.A.",
            "weeks": 9,
            "hours": 360
        },
        {
            "name": "HP PRINTING AND COMPUTING SOLUTIONS, S.L.U.",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "MINISTERIO DE JUSTICIA",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "INDUSTRIA DE DISEÑO TEXTIL, S.A.",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "AIRBUS OPERATIONS SAS",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "CAIXABANK, S.A.",
            "weeks": 21,
            "hours": 840
        },
        {
            "name": "AXA BUSINESS OPERATIONS, S.A.U.",
            "weeks": 9,
            "hours": 360
        },
        {
            "name": "MAPFRE TECH, S.A.",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "GENERIC BDC CUST",
            "weeks": 26,
            "hours": 1040
        },
        {
            "name": "SANTANDER GLOBAL TECHNOLOGY AND OPERATIONS, S.L.",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "CAIXABANK ASSET MANAGEMENT SGIIC, S.A.U.",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "CAPGEMINI SUISSE S.A.",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "CENTROS COMERCIALES CARREFOUR, S.A.",
            "weeks": 19,
            "hours": 760
        },
        {
            "name": "GLOBAL OMNIUM IDRICA, S.L.",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "CAIXABANK TECH, S.L.U.",
            "weeks": 23,
            "hours": 920
        },
        {
            "name": "ADECCO ITALIA HOLDING DI PARTECIPAZIONE E SERVIZI SPA",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "MINISTERIO SANIDAD, S SOCIAL. E IGUALDAD",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "CAJA DE SEGUROS REUNIDOS, S.A.",
            "weeks": 9,
            "hours": 360
        },
        {
            "name": "VIDACAIXA, S.A.U. DE SEGUROS Y REASEGUROS",
            "weeks": 14,
            "hours": 560
        },
        {
            "name": "INDITEX LOGISTICA, S.A.",
            "weeks": 7,
            "hours": 280
        },
        {
            "name": "ADMINISTRADOR INFR. FERROVIARIAS (ADIF)",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "PELAYO MUTUA DE SEGUROS Y REASEGUROS",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "SANTA LUCIA, S.A.",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "SECURITAS DIRECT ESPAÑA, S.A.U.",
            "weeks": 8,
            "hours": 320
        },
        {
            "name": "IBERIA LAE, S.A. OPERADORA SDAD. UNIPERSONAL",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "MERCADONA, S.A.",
            "weeks": 7,
            "hours": 280
        },
        {
            "name": "OPEN DIGITAL SERVICES, S.L.",
            "weeks": 10,
            "hours": 400
        },
        {
            "name": "ROCHE DIAGNOSTICS INTERNATIONAL AG",
            "weeks": 9,
            "hours": 360
        },
        {
            "name": "MERCEDES-BENZ GROUP SERVICES MADRID, S.A.",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "SDAD. ESTATAL CORREOS Y TELEGRAFOS, SA SME",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "MINISTERIO DE ASUNTOS ECONOMICOS Y TRANSFORMACION DIGITAL",
            "weeks": 10,
            "hours": 400
        },
        {
            "name": "ADECCO IBERIA, S.A.U.",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "CTTI",
            "weeks": 7,
            "hours": 280
        }
    ],
    "persons": [
        {
            "name": "Raul Palla Moro",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Angel Balaguer Camps",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Juan Carlos Asenjo Ruiz",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Elena Altimis Ibañes",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Oriol Torrent Sevilla",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Josep Miquel Pratginestos Ninou",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Luis Perez Parra",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Javier Alvaro Robles Sanchez",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Ana Maria Sierra Ferrer",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Raúl Ribera Cerezo",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Maria Amparo San Jose Navarro",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Ana Maria Segovia Moran",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Jordi Sainz Lacosta",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Xavier Garcia Sendra",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Jacinto Luis Cruz Martín",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Nuria Cortijo Galiano",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "Enrique Campos Escribano",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "David Campos Rubiano",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Raul Montero Jorda",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "María Pilar Mora Burbano",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Ramon Martinez Mosquera",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Gianluigi Micheletti",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "Eduardo López-Cano Romo",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Silvia Gasa Vives",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Marcos Herrero Fernandez",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Gemma Haya Fernandez",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Javier Garcia Costell",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "Adrian Llera Rodriguez",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Manuel Angel Martinez Gaspar",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Daniel Ibañez Mene",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Carlos Alberto De Freitas Goncalves",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Teresa Gonzalez Dominguez",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "David Conesa Royo",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Josep Viñals Barturo",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Jose David Linares Rufo",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Ernest Albets Moreno",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "Felipe Augusto Arredondo Contreras",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Vanesa Leal Navas",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Juan Gutierrez Ribalaygua",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "Carlos Diaz Garcia",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Gabriel Andujar Gómez",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Daniel Garcia Garcia",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Jose Antonio Rego Graña",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Yelaine Durán Carralero",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Jennifer Dominguez Peque",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "David Baqués Herrera",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Alejandro Navarro Perona",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Alberto Moya López",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Gil Verges Oms",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Eduardo Gonzalez Zangarini",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Alejandro Sepulveda Frontera",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Juan Sebastian Toro Astudillo",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "Cristian Encinas González",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Oscar Velazquez Nielsen",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Paulina Nathaly Anrango Escobar",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "Juan Torrella Torrella",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Rubén Morcillo Muñoz",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Ramon David Sebastian Manjón",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Luis Eduardo Varela Martinos",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Juan Francisco Berenguer Ortiz",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Jorge Juan Vieira Darias",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "Ismael García Felipe",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Jose Luis Cantos Galvan",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "Jesus Javier Cortes Mira",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Manuel Alfonso Fuentes Maqueda",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Andoni Mendez Pinilla",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "Alberto Iglesias Gonzalo",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Felipe Puntero Sanchez Casas",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Samuel Infante Lopez",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "Anibal Gomez Fernandez",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "Daniel Martinez Noriega",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Adrià Farran Domingo",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Biel Jorda Sorribes",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Joan Minguillon Pedreño",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Jorge Galán Alonso",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Victor Perez Hernandez",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "ERNESTO BALTASAR NVE OBONO",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Susana DE DIEGO MUÑOZ",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "FRANCISCO JAVIER GONZALEZ GRANDEZ",
            "weeks": 3,
            "hours": 120
        },
        {
            "name": "VIVIAN VIVIANO BENIGNO",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Pedro LASERNA FERNANDEZ",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "RAFAEL COSTA CAVALCANTE",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "RAFAEL VILLEN BONASTRE",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "MAGDA OSMAN GIMENEZ",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "DANIEL VALENCIA HERNANDEZ",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Andres REJAS GARCIA",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "Mohammed BEN DOHHOU LAOUINI",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Albert Fernández Mir",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "MARCOS DE LA FUENTE PALLARES",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "DANIEL OZUNA",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "DAVID DEL AMO BENITO",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "ALEJANDRO BEYA",
            "weeks": 5,
            "hours": 200
        },
        {
            "name": "EVA FIZ GARCIA",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Elisabeth RIGOL POTRONY",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Salobrar MIGUEL MATEOS",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Mª Luz PEREZ CHISCANO",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "MANUEL ALEJANDRO PRIETO MANCIA",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "VICTOR MANUEL MARTINEZ SEVERIANO",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Alberto Espina Megia",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Marc Roles Centellas",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Ángel Dolz González external",
            "weeks": 4,
            "hours": 160
        },
        {
            "name": "Pablo Vega Roca",
            "weeks": 2,
            "hours": 80
        },
        {
            "name": "Angel Antonio Asenjo Gonzalez",
            "weeks": 1,
            "hours": 40
        },
        {
            "name": "Pablo Ramos Ruiz",
            "weeks": 1,
            "hours": 40
        }
    ]
};


}
