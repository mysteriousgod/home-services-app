import * as React from 'react';

// Utility type for common props
type CommonProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

// Card Components
export const Card: React.FC<CommonProps> = ({ className, ...props }) => (
  <div className={`rounded-lg border border-white/10 bg-white/10 backdrop-blur-md text-card-foreground shadow-sm ${className}`} {...props} />
);

export const CardHeader: React.FC<CommonProps> = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
);

export const CardTitle: React.FC<CommonProps> = ({ className, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
);

export const CardContent: React.FC<CommonProps> = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

// Button Component
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background backdrop-blur-sm';
    const variants = {
      default: 'bg-primary/70 text-primary-foreground hover:bg-primary/80',
      outline: 'border border-input/50 bg-background/50 hover:bg-accent/50 hover:text-accent-foreground',
      secondary: 'bg-secondary/70 text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
      link: 'underline-offset-4 hover:underline text-primary',
    };
    const sizes = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 rounded-md',
      lg: 'h-11 px-8 rounded-md',
    };
    
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Input Component
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-white/10 bg-white/10 backdrop-blur-md px-3 py-2 text-sm 
      text-gray-900 placeholder:text-gray-500
      ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50 
      shadow-sm hover:shadow-md focus:shadow-lg
      transition-all duration-300
      ${className}`}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = 'Input';
// Select Component
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      className={`flex h-10 w-full rounded-md border border-white/10 bg-white/10 backdrop-blur-md px-3 py-2 text-sm 
      text-gray-900 
      ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50 
      shadow-sm hover:shadow-md focus:shadow-lg
      transition-all duration-300
      ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = 'Select';

// Alert Components
type AlertProps = CommonProps & {
  variant?: 'default' | 'destructive';
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-background/70 backdrop-blur-sm text-foreground',
      destructive: 'bg-destructive/70 backdrop-blur-sm text-destructive-foreground border-destructive/50 dark:border-destructive [&>svg]:text-destructive-foreground',
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`relative w-full rounded-lg border border-input/50 p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Alert.displayName = 'Alert';

export const AlertDescription = React.forwardRef<HTMLDivElement, CommonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';

// Re-export lucide-react Mail icon