import { Component, ViewChild } from '@angular/core';
import { RestService } from './rest.service'
import { Casdata } from './casdata'
import { forEach } from '@angular/router/src/utils/collection';


export interface Token {
  cspapitoken: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cas-demo-app';

  @ViewChild("f") formValues; // Added this
  cspapitoken: string

  public casdata: Casdata = <Casdata>{};

  public barChartData:any[];

  public polarAreaChartData:number[];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
  };
  public barChartLabels = ['Blueprints','Cloud Accounts','Deployments','Projects'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public polarAreaChartLabels:string[] = ['Blueprints','Cloud Accounts','Deployments','Projects'];
  public polarAreaLegend:boolean = true;
 
  public polarAreaChartType:string = 'doughnut';

  public show:boolean = false;

  constructor(private rs: RestService) {}

  onSubmit(token: Token) {
    this.show = true;
    this.rs.newCall(token).subscribe((data: Casdata) => {
      this.casdata = data;
      this.show = false;
      this.polarAreaChartData = [data.bps, data.cloudaccounts, data.deployments, data.projects];
      console.log(data)
    });
    this.formValues.resetForm();
  }

}
