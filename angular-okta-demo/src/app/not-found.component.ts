import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [],
  template: ` <h3>404 Not Found</h3> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
