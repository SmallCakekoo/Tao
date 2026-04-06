import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import type { ButtonProps } from '../../types/ComponentProps';
import './Button.css';

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
