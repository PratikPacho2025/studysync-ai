// ─────────────────────────────────────────────────────────────
//  SettingsItem
//  A versatile list row supporting icon, title, description,
//  an optional right-side control (toggle, chevron, value text),
//  and optional click handling.
// ─────────────────────────────────────────────────────────────
import { ChevronRight } from 'lucide-react'

/**
 * @param {React.ReactNode} icon        – Lucide icon element
 * @param {string}          title
 * @param {string}          [description]
 * @param {React.ReactNode} [control]   – toggle, select, etc.
 * @param {string}          [value]     – short text shown before chevron
 * @param {boolean}         [chevron]   – show > arrow
 * @param {function}        [onClick]
 * @param {string}          [className]
 */
export function SettingsItem({
  icon,
  title,
  description,
  control,
  value,
  chevron = false,
  onClick,
  className = '',
}) {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`flex w-full min-h-[3.25rem] items-center gap-4 px-4 py-3 text-left transition ${
        onClick ? 'cursor-pointer hover:bg-[#f3f7f2] active:bg-[#e8f0e9]' : ''
      } ${className}`}
    >
      {/* Icon */}
      {icon && (
        <span
          className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf3ed] text-[var(--color-accent)]"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      {/* Text */}
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[var(--color-ink)]">{title}</span>
        {description && (
          <span className="mt-0.5 block text-xs leading-relaxed text-[var(--color-muted)]">
            {description}
          </span>
        )}
      </span>

      {/* Right-side control */}
      {control && <span className="shrink-0">{control}</span>}

      {/* Value text */}
      {!control && value && (
        <span className="shrink-0 text-xs font-semibold text-[var(--color-muted)]">{value}</span>
      )}

      {/* Chevron */}
      {chevron && (
        <ChevronRight
          size={16}
          className="shrink-0 text-[var(--color-muted)]"
          aria-hidden="true"
        />
      )}
    </Tag>
  )
}
