import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAuth0 } from "@auth0/auth0-angular";
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: "spa_app_domain",
      clientId: "spa_app_client_id",
      authorizationParams: {
        audience: "api_add_audience",
        redirect_uri: window.location.origin,
      },
    }),
  ],
};
