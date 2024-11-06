import * as React from 'react';

type CommonProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

// Modern base styles with QLED-inspired effects
const baseStyles = {
  light: `
    rounded-lg border border-gray-200
    bg-white/80 backdrop-blur-sm
    shadow-sm hover:shadow-md
    transition-all duration-300
  `,
  dark: `
    rounded-lg border border-gray-800
    bg-surface-dark/80 backdrop-blur-sm
    shadow-glow hover:shadow-glow-lg
    transition-all duration-300
  `
};

// Card Components with QLED theme
export const Card: React.FC<CommonProps> = ({ className, ...props }) => (
  <div 
    className={`
      ${baseStyles.light} dark:${baseStyles.dark}
      bg-gradient-to-br from-background-light to-surface-light
      dark:from-background-dark dark:to-surface-dark
      ${className}
    `} 
    {...props} 
  />
);

export const CardHeader: React.FC<CommonProps> = ({ className, ...props }) => (
  <div 
    className={`
      flex flex-col space-y-1.5 p-6 
      border-b border-gray-100 dark:border-gray-800
      ${className}
    `} 
    {...props} 
  />
);

export const CardTitle: React.FC<CommonProps> = ({ className, ...props }) => (
  <h3 
    className={`
      text-xl font-semibold leading-none tracking-tight
      text-text-primary-light dark:text-text-primary-dark
      ${className}
    `} 
    {...props} 
  />
);
export const CardContent: React.FC<CommonProps> = ({ className, ...props }) => (
  <div 
    className={`
      p-6 
      text-text-primary-light dark:text-text-primary-dark
      [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
      ${className}
    `} 
    {...props}
  />
);
CardContent.displayName = 'CardContent';

// Button Component with QLED effects
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading, children, ...props }, ref) => {
    const variants = {
      default: `
        bg-primary hover:bg-primary dark:bg-primary-dark
        text-white
        border-transparent
      `,
      outline: `
        border-2 border-primary-light dark:border-primary-dark
        text-primary-light dark:text-primary-dark
        hover:bg-primary-light/10 dark:hover:bg-primary-dark/10
      `,
      secondary: `
        bg-secondary-light hover:bg-secondary dark:bg-secondary-dark
        text-white
        border-transparent
      `,
      ghost: `
        hover:bg-gray-100 dark:hover:bg-gray-800
        text-gray-700 dark:text-gray-300
      `,
      link: `
        text-primary-light dark:text-primary-dark
        underline-offset-4 hover:underline
      `,
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 px-3 text-sm',
      lg: 'h-12 px-6 text-lg',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles.light} dark:${baseStyles.dark}
          ${variants[variant]}
          ${sizes[size]}
          ${loading ? 'opacity-70 cursor-wait' : ''}
          transform hover:scale-105
          ${className}
        `}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{children}</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';


// Input Component with QLED styling
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  icon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, ...props }, ref) => (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={`
          ${baseStyles.light} dark:${baseStyles.dark}
          w-full px-4 py-2
          bg-white dark:bg-surface-dark
          text-text-primary-light dark:text-text-primary-dark
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          ${error ? 'border-error-light dark:border-error-dark' : ''}
          ${icon ? 'pl-10' : ''}
          ${className}
        `}
        {...props}
      />
    </div>
  )
);
Input.displayName = 'Input';

// Alert Component with QLED effects
type AlertProps = CommonProps & {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: `
        bg-surface-light dark:bg-surface-dark
        border-gray-200 dark:border-gray-800
      `,
      success: `
        bg-success-light/10 dark:bg-success-dark/10
        border-success-light dark:border-success-dark
      `,
      warning: `
        bg-warning-light/10 dark:bg-warning-dark/10
        border-warning-light dark:border-warning-dark
      `,
      error: `
        bg-error-light/10 dark:bg-error-dark/10
        border-error-light dark:border-error-dark
      `,
      info: `
        bg-primary-light/10 dark:bg-primary-dark/10
        border-primary-light dark:border-primary-dark
      `,
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`
          ${baseStyles.light} dark:${baseStyles.dark}
          ${variants[variant]}
          p-4
          ${className}
        `}
        {...props}
      />
    );
  }
);
Alert.displayName = 'Alert';

// Badge Component with QLED styling
type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: `
        bg-primary-light/20 dark:bg-primary-dark/20
        text-primary-light dark:text-primary-dark
      `,
      secondary: `
        bg-secondary-light/20 dark:bg-secondary-dark/20
        text-secondary-light dark:text-secondary-dark
      `,
      outline: `
        border-2 border-gray-200 dark:border-gray-800
        text-gray-700 dark:text-gray-300
      `,
      success: `
        bg-success-light/20 dark:bg-success-dark/20
        text-success-light dark:text-success-dark
      `,
      warning: `
        bg-warning-light/20 dark:bg-warning-dark/20
        text-warning-light dark:text-warning-dark
      `,
      error: `
        bg-error-light/20 dark:bg-error-dark/20
        text-error-light dark:text-error-dark
      `,
    };

    return (
      <div
        ref={ref}
        className={`
          inline-flex items-center
          rounded-full px-2.5 py-0.5
          text-xs font-semibold
          ${variants[variant]}
          ${className}
        `}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  icon?: React.ReactNode;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, error, icon, ...props }, ref) => (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none">
          {icon}
        </div>
      )}
      <select
        ref={ref}
        className={`
          ${baseStyles.light} dark:${baseStyles.dark}
          w-full h-10 pl-4 pr-10 py-2
          bg-white dark:bg-surface-dark
          text-text-primary-light dark:text-text-primary-dark
          placeholder:text-gray-400 dark:placeholder:text-gray-500
          disabled:opacity-50 disabled:cursor-not-allowed
          appearance-none
          ${error ? 'border-error-light dark:border-error-dark ring-error-light/20 dark:ring-error-dark/20' : ''}
          ${icon ? 'pl-10' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg 
          className="w-4 h-4 text-gray-500 dark:text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
      {error && (
        <div className="absolute -bottom-5 left-0 text-sm text-error-light dark:text-error-dark">
          {error}
        </div>
      )}
    </div>
  )
);
Select.displayName = 'Select';


export const AlertDescription = React.forwardRef<HTMLDivElement, CommonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`
        text-sm [&_p]:leading-relaxed
        ${className}
      `}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';

export * from 'lucide-react';