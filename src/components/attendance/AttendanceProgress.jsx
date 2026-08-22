export function AttendanceProgress({ percentage, size = 'normal' }) {
  const dimension = size === 'large' ? 'size-36' : 'size-14'
  const textSize = size === 'large' ? 'text-3xl' : 'text-sm'
  return <div className={`relative grid ${dimension} shrink-0 place-items-center rounded-full`} style={{ background: `conic-gradient(#277c68 ${percentage * 3.6}deg, #deebe1 0deg)` }} role="img" aria-label={`${percentage}% attendance`}><div className={`grid ${size === 'large' ? 'size-28' : 'size-11'} place-items-center rounded-full bg-white`}><span className={`${textSize} font-semibold text-[var(--color-ink)]`}>{percentage}%</span></div></div>
}