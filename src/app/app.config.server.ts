import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { appConfig } from './app.config';

import pt from '../../public/assets/i18n/pt.json';
import en from '../../public/assets/i18n/en.json';

class ServerTranslateLoader implements TranslateLoader {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly translations: Record<string, any> = { pt, en };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTranslation(lang: string): Observable<any> {
    return of(this.translations[lang] ?? this.translations['pt']);
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: TranslateLoader, useClass: ServerTranslateLoader },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
