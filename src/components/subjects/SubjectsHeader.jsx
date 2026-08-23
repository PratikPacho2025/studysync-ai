import { Plus, Search, Upload } from 'lucide-react'
import { useRef } from 'react'

export function SubjectsHeader({ searchQuery, onSearch, onAdd, onUpload, isUploading }) {
  const fileInputRef = useRef(null)

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (file && onUpload) {
      onUpload(file)
    }
  }

  return (
    <header className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Build your knowledge map</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">Subjects</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Track your learning</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,image/*"
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            aria-label="Upload Syllabus"
            className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white border border-[var(--color-accent)] text-[var(--color-accent)] shadow-sm transition hover:bg-slate-50 active:scale-95 sm:flex sm:h-11 sm:w-auto sm:gap-2 sm:px-4"
          >
            <Upload size={20} aria-hidden="true" />
            <span className="hidden text-sm font-bold sm:inline">
              {isUploading ? 'Scanning...' : 'Scan Syllabus'}
            </span>
          </button>
          <button
            type="button"
            onClick={onAdd}
            aria-label="Add subject"
            className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--color-accent)] text-white shadow-[0_8px_18px_rgba(39,124,104,0.2)] transition hover:bg-[#1e6655] active:scale-95 sm:flex sm:h-11 sm:w-auto sm:gap-2 sm:px-4"
          >
            <Plus size={20} aria-hidden="true" />
            <span className="hidden text-sm font-bold sm:inline">Add subject</span>
          </button>
        </div>
      </div>
      <label className="relative block">
        <Search size={18} className="pointer-events-none absolute left-3 top-3.5 text-[var(--color-muted)]" aria-hidden="true" />
        <span className="sr-only">Search subjects</span>
        <input
          value={searchQuery}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search subjects"
          className="min-h-12 w-full rounded-2xl border border-[#d8e5db] bg-white pl-10 pr-4 text-sm text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[#cfe8d8]"
        />
      </label>
    </header>
  )
}