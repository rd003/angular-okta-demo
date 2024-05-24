import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable, map, switchMap } from "rxjs";
import { WeatherForecast } from "./wether-forecast.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "@auth0/auth0-angular";

@Injectable({
  providedIn: "root",
})
export class WeatherForecastService {
  private readonly _baseUrl = `${environment.BASE_URL}/weatherforecast`;
  private readonly _http = inject(HttpClient);
  private readonly _auth = inject(AuthService);

  GetWeatherForecast(): Observable<Array<WeatherForecast>> {
    const token$ = this._auth.getAccessTokenSilently();
    // const token$: Observable<string | undefined> =
    //   this._auth.idTokenClaims$.pipe(map((d) => d?.__raw));

    return token$.pipe(
      switchMap((token) => {
        const headers = new HttpHeaders().set(
          "Authorization",
          `Bearer ${token}`
        );
        console.log(`token: ${token}`);
        return this._http.get<Array<WeatherForecast>>(this._baseUrl, {
          headers,
        });
      })
    );
  }
}
