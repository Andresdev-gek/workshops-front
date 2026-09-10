import { Spinner } from './Spinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'muted'
  isLoading?: boolean
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ultramarine/50 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles =
    variant === 'primary'
      ? 'bg-ultramarine text-white hover:bg-ultramarine/90'
      : variant === 'secondary'
        ? 'bg-celeste text-pearl-dark hover:bg-celeste-dark/80 dark:bg-celeste-dark dark:text-white dark:hover:bg-celeste-dark/80'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'

  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {isLoading && <Spinner size="sm" variant="light" />}
      {children}
    </button>
  )
}
