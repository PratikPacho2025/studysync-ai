import { useEffect, useMemo, useState } from 'react'
import { AnalyticsHeader, AnalyticsInsight, ConsistencyCard, HealthBreakdown, StudyHealthScore, StudyTimeChart, SubjectPerformance, WeakAreas, WeeklyTrend } from '../../components/analytics'
import { calculateStudyHealth, calculateStudyTimeChange, getHealthStatus, getPositiveInsights, getWarningInsights } from '../../utils/analytics'
import { api } from '../../services/api'

export function AnalyticsPage() { 
  const [period, setPeriod] = useState('weekly')
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    api.fetchAnalytics().then(setAnalytics).catch(console.error)
  }, [])

  const data = useMemo(() => {
    if (!analytics) return null
    return analytics[period]
  }, [analytics, period])

  const score = useMemo(() => {
    if (!data) return 0
    return calculateStudyHealth(data)
  }, [data])

  const insights = useMemo(() => {
    if (!data) return { positive: [], warning: [] }
    return { positive: getPositiveInsights(data), warning: getWarningInsights(data) }
  }, [data])

  if (!data) {
    return <div className="p-8 text-center text-sm text-[var(--color-muted)]">Loading study analytics...</div>
  }

  return <div className="mx-auto w-full max-w-6xl space-y-7 pb-2"><AnalyticsHeader period={period} onPeriodChange={setPeriod} /><div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"><StudyHealthScore score={score} status={getHealthStatus(score)} /><HealthBreakdown data={data} /></div><div className="grid gap-5 lg:grid-cols-2"><WeeklyTrend values={data.trend} period={period} /><StudyTimeChart studyTime={data.studyTime} /></div><div className="grid gap-5 lg:grid-cols-2"><ConsistencyCard data={{ ...data.consistencyDetails, value: data.consistency }} /><SubjectPerformance subjects={data.subjects} /></div><div className="grid gap-5 lg:grid-cols-2"><WeakAreas areas={data.weakAreas} /><AnalyticsInsight positive={insights.positive} warning={insights.warning} /></div><p className="sr-only">Study time changed by {calculateStudyTimeChange(data.studyTime.totalMinutes, data.studyTime.previousWeekMinutes)} percent from the previous period.</p></div>
}