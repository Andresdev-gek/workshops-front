interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}

export function Spinner({ size = 'md', variant = 'dark' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-[3px]',
  }

  const colorClass = variant === 'light' ? 'border-white/30 border-t-white' : 'border-black/20 border-t-ultramarine'

  return (
    <div
      className={`inline-block rounded-full animate-spin ${sizeClasses[size]} ${colorClass}`}
      aria-label="Cargando"
      role="status"
    />
  )
}
