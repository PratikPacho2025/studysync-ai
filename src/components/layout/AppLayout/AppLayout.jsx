import { Outlet } from 'react-router-dom'
import { MobileBottomNav } from '../MobileBottomNav/MobileBottomNav'
import { Sidebar } from '../Sidebar/Sidebar'
import { TopNavbar } from '../TopNavbar/TopNavbar'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[var(--color-background,#f3f7f2)] text-[var(--color-ink)] lg:pl-64">
      <Sidebar />
      <TopNavbar />
      <main className="min-h-[calc(100vh-4rem)] px-5 pb-24 pt-2 sm:px-8 sm:pb-28 lg:min-h-[calc(100vh-5rem)] lg:px-10 lg:pb-10 lg:pt-8">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  )
}