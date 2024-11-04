import * as React from 'react';

// Utility type for common props
type CommonProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
};

// Define a `baseStyles` object to centralize common styles
const baseStyles = `
  rounded-md border 
  bg-opacity-10 backdrop-blur-sm 
  transition-all duration-300
  focus-visible:outline-none 
  shadow-sm hover:shadow-md 
`;

// Card Components
export const Card: React.FC<CommonProps> = ({ className, ...props }) => (
  <div 
    className={`${baseStyles} bg-white/10 dark:bg-gray-900 dark:text-gray-200 ${className}`} 
    {...props} 
  />
);

export const CardHeader: React.FC<CommonProps> = ({ className, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 border-b border-white/5 ${className}`} {...props} />
);

export const CardTitle: React.FC<CommonProps> = ({ className, ...props }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white ${className}`} {...props} />
);

export const CardDescription: React.FC<CommonProps> = ({ className, ...props }) => (
  <p className={`text-sm text-gray-500 dark:text-gray-400 ${className}`} {...props} />
);

export const CardContent: React.FC<CommonProps> = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);

// Button Component
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success' | 'danger';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading, children, disabled, ...props }, ref) => {
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80',
      outline: 'border border-white/20 text-gray-700 dark:text-gray-300',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
      link: 'underline-offset-4 hover:underline text-primary',
      success: 'bg-green-500 text-white hover:bg-green-600',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    };

    const sizes = {
      default: 'h-10 py-2 px-4',
      sm: 'h-9 px-3 text-xs',
      lg: 'h-11 px-8 text-base',
      icon: 'h-10 w-10'
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${loading ? 'opacity-70 cursor-wait' : ''} ${className}`}
        disabled={disabled || loading}
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

// Input Component
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  icon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, icon, ...props }, ref) => (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
      <input
        ref={ref}
        type={type}
        className={`
          ${baseStyles} flex h-10 w-full px-3 py-2 text-sm
          text-gray-900 placeholder:text-gray-500
          ${icon ? 'pl-10' : ''} ${error ? 'border-red-500/50 focus-visible:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
    </div>
  )
);
Input.displayName = 'Input';

// Remaining components like `Select`, `Alert`, and `Badge` would follow this same pattern.


// Select Component
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, error, ...props }, ref) => (
    <select
      className={`
        flex h-10 w-full rounded-md 
        border border-white/10 
        bg-white/10 backdrop-blur-md 
        px-3 py-2 text-sm 
        text-gray-900 
        ring-offset-background 
        focus-visible:outline-none 
        focus-visible:ring-2 
        focus-visible:ring-ring 
        focus-visible:ring-offset-2 
        disabled:cursor-not-allowed 
        disabled:opacity-50 
        shadow-sm hover:shadow-md focus:shadow-lg
        transition-all duration-300
        appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCAxTDggOCAxMiAxIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-no-repeat bg-right-4 bg-center-y
        ${error ? 'border-red-500/50 focus-visible:ring-red-500' : ''}
        ${className}
      `}
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
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info';
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-background/70 backdrop-blur-sm text-foreground border-input/50',
      success: 'bg-green-500/10 backdrop-blur-sm text-green-700 border-green-500/50',
      warning: 'bg-yellow-500/10 backdrop-blur-sm text-yellow-700 border-yellow-500/50',
      destructive: 'bg-red-500/10 backdrop-blur-sm text-red-700 border-red-500/50',
      info: 'bg-blue-500/10 backdrop-blur-sm text-blue-700 border-blue-500/50'
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={`
          relative w-full rounded-lg 
          border p-4 
          transition-all duration-300
          shadow-sm hover:shadow-md
          ${variants[variant]}
          ${className}
        `}
        {...props}
      />
    );
  }
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<HTMLDivElement, CommonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`
        font-medium leading-none tracking-tight mb-1
        ${className}
      `}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

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

// Badge Component
type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-primary/20 text-primary border-primary/20',
      secondary: 'bg-secondary/20 text-secondary border-secondary/20',
      outline: 'border-white/20 text-gray-700',
      success: 'bg-green-500/20 text-green-700 border-green-500/20',
      warning: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20',
      danger: 'bg-red-500/20 text-red-700 border-red-500/20',
    };

    return (
      <div
        ref={ref}
        className={`
          inline-flex items-center 
          rounded-full px-2.5 py-0.5 
          text-xs font-semibold 
          transition-colors 
          border backdrop-blur-sm
          ${variants[variant]}
          ${className}
        `}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export * from 'lucide-react';