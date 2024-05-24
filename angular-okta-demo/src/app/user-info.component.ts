import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-user-info",
  standalone: true,
  imports: [NgIf, AsyncPipe, JsonPipe],
  template: `
    <p *ngIf="auth.isLoading$ | async">Loading...</p>
    <ul *ngIf="auth.user$ | async as user; else noData">
      <li>
        <img [src]="user.picture" style="width: 100px;height:100px" />
      </li>
      <li>{{ user.name }}</li>
      <li>{{ user.email }}</li>
    </ul>

    <ng-template #noData>No data</ng-template>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  auth = inject(AuthService);
}
