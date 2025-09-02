import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
// ⬇️ NGX-TRANSLATE (v17+)
    provideTranslateService({
      // opcional, mas recomendado
      lang: 'pt',
      fallbackLang: 'pt'
    }),

    // Loader via provider (configura prefix/suffix)
    provideTranslateHttpLoader({
      prefix: '/assets/i18n/',   // seu caminho
      suffix: '.json'
      // opções extras disponíveis:
      // enforceLoading: false,
      // useHttpBackend: false
    }),
  ]
};
