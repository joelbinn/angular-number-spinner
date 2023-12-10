import "@testing-library/jest-dom";
import { render, fireEvent, screen, waitFor } from '@testing-library/angular';
import { NumberSpinnerComponent } from './number-spinner.component';
jest.useFakeTimers();

describe('NumberSpinnerComponent', () => {
  it('should create', async () => {
    const component = await render(NumberSpinnerComponent);
    expect(component).toBeTruthy();
  });

  it('should increment value on click', async () => {
    await render(NumberSpinnerComponent, {
      componentProperties: { value: 5 },
    });

    fireEvent.mouseDown(screen.getByTestId('increaseButton'));
    jest.advanceTimersByTime(100);
    fireEvent.mouseUp(screen.getByTestId('increaseButton'));
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('should decrement value on click', async () => {
    await render(NumberSpinnerComponent, {
      componentProperties: { value: 5 },
    });

    fireEvent.mouseDown(screen.getByTestId('decreaseButton'));
    jest.advanceTimersByTime(100);
    fireEvent.mouseUp(screen.getByTestId('decreaseButton'));
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('should increment by 2 Hz when pressing for less than 2 s', async () => {
    await render(NumberSpinnerComponent, {
      componentProperties: { value: 0 },
    });

    fireEvent.mouseDown(screen.getByTestId('increaseButton'));
    jest.advanceTimersByTime(1999);
    fireEvent.mouseUp(screen.getByTestId('increaseButton'));

    await waitFor(() => expect(screen.getByText('4')).toBeInTheDocument());
  });

  it('should increment by 10 Hz when pressing for more than 2 s', async () => {
    await render(NumberSpinnerComponent, {
      componentProperties: { value: 0 },
    });

    fireEvent.mouseDown(screen.getByTestId('increaseButton'));
    jest.advanceTimersByTime(3000);
    fireEvent.mouseUp(screen.getByTestId('increaseButton'));

    await waitFor(() => expect(screen.getByText(`${10}`)).toBeInTheDocument());
  });

  // Additional tests...
});
