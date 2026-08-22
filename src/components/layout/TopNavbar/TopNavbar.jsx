import { Bell, Search, UserRound } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { primaryNavigation } from '../../../constants/navigation'

function getPageTitle(pathname) {
  return primaryNavigation.find((item) => item.path === pathname)?.label ?? 'StudySync AI'
}

export function TopNavbar() {
  const { pathname } = useLocation()

  return (
    <>
      <header className="depth-shadow sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#dce7df] bg-[#f3f7f2]/95 px-5 backdrop-blur-sm sm:px-8 lg:hidden">
        <span className="text-base font-semibold tracking-tight text-[var(--color-ink)]">StudySync AI</span>
        <div className="flex items-center gap-1">
          <button type="button" aria-label="View notifications" className="grid size-11 place-items-center rounded-xl text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-accent)]">
            <Bell size={19} strokeWidth={1.8} />
          </button>
          <button type="button" aria-label="Open profile" className="grid size-11 place-items-center rounded-xl text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-accent)]">
            <UserRound size={19} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <header className="hidden h-20 items-center justify-between border-b border-[#dce7df] bg-[#f3f7f2]/95 px-8 backdrop-blur-sm lg:flex">
        <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">{getPageTitle(pathname)}</h1>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Search" className="grid size-10 place-items-center rounded-xl text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-accent)]">
            <Search size={19} strokeWidth={1.8} />
          </button>
          <button type="button" aria-label="View notifications" className="grid size-10 place-items-center rounded-xl text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-accent)]">
            <Bell size={19} strokeWidth={1.8} />
          </button>
          <div className="ml-2 flex items-center gap-2.5 border-l border-[#dce7df] pl-4">
            <span className="grid size-9 place-items-center rounded-full bg-[#d8e9df] text-[var(--color-accent)]" aria-hidden="true"><UserRound size={18} /></span>
            <span className="text-sm font-semibold text-[var(--color-ink)]">Pratik</span>
          </div>
        </div>
      </header>
    </>
  )
}