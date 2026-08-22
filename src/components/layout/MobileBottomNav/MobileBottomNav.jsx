import { NavLink } from 'react-router-dom'
import { mobileNavigation } from '../../../constants/navigation'

export function MobileBottomNav() {
  return (
    <nav aria-label="Primary navigation" className="depth-shadow fixed inset-x-0 bottom-0 z-40 border-t border-[#dce7df] bg-[#fbfdfb]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-sm lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {mobileNavigation.map(({ label, mobileLabel, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `group flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold transition active:scale-95 ${isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}`}
          >
            {({ isActive }) => (
              <>
                <span className={`grid size-8 place-items-center rounded-xl transition ${isActive ? 'bg-[#dceee4]' : 'group-hover:bg-white'}`}>
                  <Icon size={19} strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" />
                </span>
                <span>{mobileLabel ?? label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}