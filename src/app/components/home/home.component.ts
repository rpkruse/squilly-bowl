import { Component } from '@angular/core';
import { URL_ROUTES } from '../../shared/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  get rulesRoute(): string { return URL_ROUTES.RULES }
  get createRoute(): string { return URL_ROUTES.CREATE }
}