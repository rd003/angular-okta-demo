import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    loadComponent: () =>
      import("./login/login.component").then((c) => c.LoginComponent),
  },
  {
    path: "weatherforecast",
    loadComponent: () =>
      import("./weatherforecast/weather-forecast.component").then(
        (c) => c.WeatherForecastComponent
      ),
  },
  {
    path: "user-info",
    loadComponent: () =>
      import("./user-info.component").then((c) => c.UserInfoComponent),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "**",
    loadComponent: () =>
      import("./not-found.component").then((c) => c.NotFoundComponent),
  },
];
