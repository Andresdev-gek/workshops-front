import { Input } from '../atoms/Input'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormField({ label, error, id, ...inputProps }: FormFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5 text-left">
      <label htmlFor={inputId} className="text-sm font-medium text-pearl-dark dark:text-pearl">
        {label}
      </label>
      <Input id={inputId} error={error} {...inputProps} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
