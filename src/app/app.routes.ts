import { Routes } from '@angular/router';
import { URL_ROUTES } from './shared/constants';

export const routes: Routes = [
  { path: URL_ROUTES.HOME, loadChildren: () => import('./components/home/home.routes') },
  { path: URL_ROUTES.RULES, loadChildren: () => import('./components/rules/rules.routes') },
  { path: URL_ROUTES.CREATE, loadChildren: () => import('./components/create/create.routes') },
  { path: URL_ROUTES.PLAY, loadChildren: () => import('./components/play/play.routes') },
  { path: URL_ROUTES.DEFAULT, pathMatch: 'full', redirectTo: `/${URL_ROUTES.HOME}` },
  { path: URL_ROUTES.EMPTY, pathMatch: 'full', redirectTo: `/${URL_ROUTES.HOME}` }
];
