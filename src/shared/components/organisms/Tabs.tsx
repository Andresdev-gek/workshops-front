interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 w-full sm:w-fit">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              isActive
                ? 'bg-ultramarine text-white'
                : 'text-pearl-dark dark:text-pearl hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
