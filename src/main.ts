/**
 * Title: main.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 1 September 2021
 * Description: This is the main.ts file.
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
