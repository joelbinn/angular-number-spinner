import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NumberSpinnerComponent } from './number-spinner/number-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NumberSpinnerComponent],
  template: `<jb-number-spinner [(value)]="year" [min]="2000" [max]="2100"></jb-number-spinner>`,
})
export class AppComponent {
  year: number = 2018;
}
