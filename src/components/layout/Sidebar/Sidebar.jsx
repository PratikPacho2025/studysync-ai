import { NavLink } from 'react-router-dom'
import { accountNavigation, primaryNavigation } from '../../../constants/navigation'

function NavigationLink({ item }) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.path}
      end={item.path === '/profile'}
      className={({ isActive }) => `group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition active:scale-[0.98] ${isActive ? 'bg-[#dceee4] text-[var(--color-accent)]' : 'text-[var(--color-muted)] hover:bg-white hover:text-[var(--color-ink)]'}`}
    >
      {({ isActive }) => <><Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} aria-hidden="true" /><span>{item.label}</span></>}
    </NavLink>
  )
}

export function Sidebar() {
  return (
    <aside className="depth-shadow fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[#dce7df] bg-[#eaf3ed] px-4 py-6 lg:flex">
      <div className="mb-10 px-3">
        <p className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">StudySync AI</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">Your study companion</p>
      </div>
      <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">Navigation</p>
      <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-1">
        {primaryNavigation.map((item) => <NavigationLink key={item.path} item={item} />)}
        <div className="my-4 border-t border-[#d2e1d7]" />
        {accountNavigation.map((item) => <NavigationLink key={item.path} item={item} />)}
      </nav>
    </aside>
  )
}