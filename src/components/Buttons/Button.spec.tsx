import { render, screen } from '@testing-library/react';
import { Button } from './Buttons';

describe('Button', () => {
  it('should render a child with a text indicated', () => {
    const text = 'hola';

    render(<Button>{text}</Button>);
    const button = screen.getByText(text);

    expect(button).toBeInTheDocument();
  });
  it('should render a child with size and type variants', () => {
    const size = 'small';
    const type = 'secondary';

    render(
      <Button color={type} size={size}>
        Test
      </Button>,
    );
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.classList.contains(`btn--${size}`)).toBe(true);
    expect(button.classList.contains(`btn--${type}`)).toBe(true);
  });
  it('should render a button disabled', () => {
    render(<Button disabled>Test</Button>);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).not.toBeEnabled();
  });
});
