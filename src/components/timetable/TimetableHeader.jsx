import { Plus, Upload } from 'lucide-react'
import { useRef } from 'react'

export function TimetableHeader({ onAdd, onUpload, isUploading }) {
  const fileInputRef = useRef(null)

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (file && onUpload) {
      onUpload(file)
    }
  }

  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Plan your week</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">Timetable</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">Your academic schedule</p>
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
          aria-label="Upload Timetable"
          className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white border border-[var(--color-accent)] text-[var(--color-accent)] shadow-sm transition hover:bg-slate-50 active:scale-95 sm:flex sm:h-11 sm:w-auto sm:gap-2 sm:px-4"
        >
          <Upload size={20} aria-hidden="true" />
          <span className="hidden text-sm font-bold sm:inline">
            {isUploading ? 'Scanning...' : 'Scan Timetable'}
          </span>
        </button>
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add lecture"
          className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[var(--color-accent)] text-white shadow-[0_8px_18px_rgba(39,124,104,0.22)] transition hover:bg-[#1e6655] active:scale-95 sm:flex sm:h-11 sm:w-auto sm:gap-2 sm:px-4"
        >
          <Plus size={20} aria-hidden="true" />
          <span className="hidden text-sm font-bold sm:inline">Add lecture</span>
        </button>
      </div>
    </header>
  )
}