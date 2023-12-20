import { Component } from '@angular/core';
import { URL_ROUTES } from '../../shared/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  getSpanStyle(index: number): string {
    return `--i:${index}`;
  }

  get rulesRoute(): string { return URL_ROUTES.RULES }
  get createRoute(): string { return URL_ROUTES.CREATE }

  get textSpans(): string[] {
    const finalProduct: string[] = [];
    const text = 'WELCOME TO THE SQUILLY BOWL!';

    text.split('').forEach((letter: string) => {
      if (letter.trim() === '') {
        letter = '&nbsp;';
      }
      finalProduct.push(letter);
    });

    return finalProduct;
  }
}