interface GlassPanelProps {
  children: React.ReactNode
  className?: string
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div className={`glass p-6 sm:p-8 shadow-lg ${className}`}>
      {children}
    </div>
  )
}
