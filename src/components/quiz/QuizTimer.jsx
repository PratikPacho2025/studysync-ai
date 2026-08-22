import { Timer } from 'lucide-react'

export function QuizTimer({ seconds }) { return <time className="flex items-center gap-1 text-sm font-bold text-[var(--color-muted)]" dateTime={`PT${seconds}S`}><Timer size={16} aria-hidden="true" /> {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</time> }