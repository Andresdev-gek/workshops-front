interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'default'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variantStyles = {
    success: 'bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30',
    warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
    default: 'bg-ultramarine/10 text-ultramarine border-ultramarine/20',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${variantStyles[variant]}`}
    >
      {children}
    </span>
  )
}
