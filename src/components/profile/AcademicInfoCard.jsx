// ─────────────────────────────────────────────────────────────
//  AcademicInfoCard
//  Displays the student's academic context fields.
// ─────────────────────────────────────────────────────────────
import { BookOpen, Calendar, GraduationCap, School } from 'lucide-react'

function AcademicRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[#eaf3ed] text-[var(--color-accent)]"
        aria-hidden="true"
      >
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-[var(--color-ink)]">{value || '—'}</p>
      </div>
    </div>
  )
}

/**
 * @param {object} profile – { college, course, branch, year, semester }
 */
export function AcademicInfoCard({ profile }) {
  return (
    <section
      className="dashboard-card bg-white p-5 sm:p-6"
      aria-labelledby="academic-info-heading"
    >
      <p
        id="academic-info-heading"
        className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]"
      >
        Academic Information
      </p>
      <div className="space-y-4">
        <AcademicRow icon={School}       label="College"  value={profile.college} />
        <AcademicRow icon={GraduationCap} label="Course"  value={profile.course} />
        <AcademicRow icon={BookOpen}     label="Branch"   value={profile.branch} />
        <div className="grid grid-cols-2 gap-4">
          <AcademicRow icon={Calendar} label="Year"     value={profile.year} />
          <AcademicRow icon={Calendar} label="Semester" value={`Sem ${profile.semester}`} />
        </div>
      </div>
    </section>
  )
}
