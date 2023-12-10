import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

// Specification:
// A number spinner component with limits.
// The + and - buttons should increment/decrement the value by 1 when clicking it.
// The spinner is ensitive for how long the user holds down the "+" or "-" button.
// If either button is held down for less than 2s it increments/decrements the value at 2 Hz.
// On the other hand if the button is held down for more than 2s it starts to increments/decrement at 10 Hz.
// As soon as the button is released the increment/decrement stops.
// If the mouse pointer leaves the button while it is held down the increment/decrement stops.

@Component({
  selector: 'jb-number-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="number-spinner">
      <div class="value">{{ value }}</div>
      <div class="buttons">
        <button
          data-testid="decreaseButton"
          (mousedown)="decreaseValue()"
          (mouseup)="stopChangingValue()"
          (mouseleave)="stopChangingValue()"
        >
          -
        </button>
        <button
          data-testid="increaseButton"
          (mousedown)="increaseValue()"
          (mouseup)="stopChangingValue()"
          (mouseleave)="stopChangingValue()"
        >
          +
        </button>
      </div>
    </div>
  `,
  styleUrl: './number-spinner.component.scss',
})
export class NumberSpinnerComponent implements OnInit {
  @Input() value!: number;
  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;
  @Output() readonly valueChange = new EventEmitter<number>();

  private intervalId?: number;
  private pressTime?: number;

  ngOnInit() {
    if (this.value === undefined) {
      this.value = this.min ?? 0;
    }
  }

  decreaseValue() {
    this.value--;
    this.startChangingValue(() => {
      if (this.value > this.min) {
        this.value--;
        this.valueChange.emit(this.value);
      }
    });
  }

  increaseValue() {
    this.value++;
    this.startChangingValue(() => {
      if (this.value < this.max) {
        this.value++;
        this.valueChange.emit(this.value);
      }
    });
  }

  private startChangingValue(changeFunction: () => void) {
    this.stopChangingValue();
    this.pressTime = Date.now();
    this.intervalId = window.setInterval(() => {
      if (Date.now() - (this.pressTime ?? 0) > 2000) {
        window.clearInterval(this.intervalId);
        this.intervalId = window.setInterval(changeFunction, 100);
      } else {
        changeFunction();
      }
    }, 500);
  }

  stopChangingValue() {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
}
