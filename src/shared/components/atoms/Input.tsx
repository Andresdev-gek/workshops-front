interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export function Input({ error, className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-4 py-2.5 rounded-2xl bg-white/80 dark:bg-pearl-dark/60
        border border-black/10 dark:border-white/10
        text-pearl-dark dark:text-pearl
        placeholder:text-black/40 dark:placeholder:text-white/40
        focus:outline-none focus:ring-2 focus:ring-ultramarine/50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${error ? 'border-red-500 focus:ring-red-500/50' : ''}
        ${className}`}
      {...props}
    />
  )
}
