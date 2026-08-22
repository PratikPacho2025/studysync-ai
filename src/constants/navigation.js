import {
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckSquare,
  CircleUserRound,
  ClipboardCheck,
  FileQuestion,
  Goal,
  House,
  LayoutDashboard,
  Search,
  Settings,
  Sparkles,
  UserRound,
} from 'lucide-react'

export const primaryNavigation = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, mobileIcon: House },
  { label: 'Timetable', path: '/timetable', icon: CalendarDays, mobileLabel: 'Schedule' },
  { label: 'Study', path: '/study', icon: BookOpen },
  { label: 'Attendance', path: '/attendance', icon: ClipboardCheck },
  { label: 'Subjects', path: '/subjects', icon: CheckSquare },
  { label: 'Quiz', path: '/quiz', icon: FileQuestion },
  { label: 'Goals', path: '/goals', icon: Goal },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'AI Mentor', path: '/ai-mentor', icon: Sparkles },
]

export const mobileNavigation = [
  primaryNavigation[0],
  primaryNavigation[2],
  primaryNavigation[1],
  primaryNavigation[6],
  { label: 'Profile', path: '/profile', icon: CircleUserRound },
]

export const accountNavigation = [
  { label: 'Profile', path: '/profile', icon: UserRound },
  { label: 'Settings', path: '/profile?section=settings', icon: Settings },
]

export const utilityIcons = { Search }