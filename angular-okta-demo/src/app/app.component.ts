import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="nav">
      <li><a routerLink="home" routerLinkActive="active">Home</a></li>
      <li>
        <a routerLink="weatherforecast" routerLinkActive="active"
          >WeatherForecast</a
        >
      </li>
      <li>
        <a routerLink="user-info" routerLinkActive="active">Profile</a>
      </li>
      <li>
        <a routerLink="login" routerLinkActive="active">Login</a>
      </li>
    </ul>
    <div style="padding:15px 20px">
      <router-outlet />
    </div>
  `,
  styles: [
    `
      .nav {
        display: flex;
        gap: 15px;
        padding: 15px;
      }
      .nav li {
        list-style: none;
      }
      .nav li a {
        text-decoration: none;
        color: black;
        font-size: 20px;
      }

      ul li a:hover {
        color: green;
      }

      .active {
        color: green;
      }
    `,
  ],
})
export class AppComponent {}
