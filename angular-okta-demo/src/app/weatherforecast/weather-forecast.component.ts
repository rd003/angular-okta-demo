import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { WeatherForecastService } from "./weather-forecast.service";
import { Observable } from "rxjs";
import { WeatherForecast } from "./wether-forecast.model";
import { AsyncPipe, JsonPipe, NgFor, NgIf } from "@angular/common";

@Component({
  selector: "app-weather-forecast",
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [``],
  template: `
    <h2>Weatherforecast</h2>
    <ng-container *ngIf="data$ | async as data; else noData">
      <table class="tbl" style="margin-top:10px;">
        <thead>
          <th>Date</th>
          <th>TemperatureC</th>
          <th>TemperatureF</th>
          <th>Summary</th>
        </thead>
        <tbody>
          <tr *ngFor="let item of data">
            <td>{{ item.date }}</td>
            <td>{{ item.temperatureC }}</td>
            <td>{{ item.temperatureF }}</td>
            <td>{{ item.summary }}</td>
          </tr>
        </tbody>
      </table>
    </ng-container>
    <ng-template #noData>
      <p>No data found</p>
    </ng-template>
  `,
})
export class WeatherForecastComponent {
  weatherForecastService = inject(WeatherForecastService);

  data$: Observable<Array<WeatherForecast>> =
    this.weatherForecastService.GetWeatherForecast();
}
