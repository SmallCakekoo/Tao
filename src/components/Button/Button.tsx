import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'nav';
  to?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', className = '', to, ...props }, ref) => {
    const classes = `btn btn-${variant} ${className ?? ''}`.trim();

    if (to) {
      return (
        <Link to={to} className={classes}>
          {props.children}
        </Link>
      );
    }

    return <button ref={ref} className={classes} {...props} />;
  }
);