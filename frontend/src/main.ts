import { bootstrapApplication } from '@angular/platform-browser';
import { configuracaoApp } from './app/app.config';
import { Aplicativo } from './app/app';

bootstrapApplication(Aplicativo, configuracaoApp)
  .catch((falha) => console.error(falha));
