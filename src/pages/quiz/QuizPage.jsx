import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { KnowledgeScoreCard, QuizCard, QuizHeader, QuizSummary, WeakTopicCard } from '../../components/quiz'
import { api } from '../../services/api'

export function QuizPage() {
  const navigate = useNavigate()
  const [subject, setSubject] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [quizzes, setQuizzes] = useState([])
  const [quizHistory, setQuizHistory] = useState([])
  const [weakTopics, setWeakTopics] = useState([])

  useEffect(() => {
    api.fetchQuizzes().then((data) => {
      setQuizzes(data.quizzes)
      setQuizHistory(data.quizHistory)
      setWeakTopics(data.weakTopics)
    }).catch(console.error)
  }, [])

  const availableSubjects = useMemo(() => [...new Set(quizzes.map((quiz) => quiz.subject))], [quizzes])
  const filteredQuizzes = useMemo(() => quizzes.filter((quiz) => (subject === 'all' || quiz.subject === subject) && (difficulty === 'all' || quiz.difficulty === difficulty)), [quizzes, subject, difficulty])
  
  const avgScore = useMemo(() => {
    if (quizHistory.length === 0) return 0
    return Math.round(quizHistory.reduce((sum, item) => sum + item.score, 0) / quizHistory.length)
  }, [quizHistory])

  const summary = { 
    completed: quizHistory.length, 
    average: avgScore, 
    accuracy: avgScore, 
    weak: weakTopics.length 
  }

  return <div className="mx-auto w-full max-w-6xl space-y-7 pb-2"><QuizHeader /><div className="grid gap-5 lg:grid-cols-2"><KnowledgeScoreCard data={{ score: avgScore, concept: avgScore > 0 ? avgScore + 4 : 0, quiz: avgScore, confidence: avgScore > 0 ? avgScore - 4 : 0 }} /><QuizSummary summary={summary} /></div><div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]"><section aria-labelledby="ready-title"><div className="flex items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Test what matters</p><h2 id="ready-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">Ready to Test</h2></div><div className="flex gap-2"><label className="sr-only" htmlFor="quiz-subject">Filter by subject</label><select id="quiz-subject" value={subject} onChange={(event) => setSubject(event.target.value)} className="min-h-10 max-w-[7.5rem] rounded-xl border border-[#d8e5db] bg-white px-2 text-xs font-semibold text-[var(--color-muted)]"><option value="all">All subjects</option>{availableSubjects.map((item) => <option key={item}>{item}</option>)}</select><label className="sr-only" htmlFor="quiz-difficulty">Filter by difficulty</label><select id="quiz-difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} className="min-h-10 rounded-xl border border-[#d8e5db] bg-white px-2 text-xs font-semibold capitalize text-[var(--color-muted)]"><option value="all">All levels</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></div></div><div className="mt-4 grid gap-4 sm:grid-cols-2">{filteredQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} onStart={(id) => navigate(`/quiz/session/${id}`)} />)}</div></section><WeakTopicCard topics={weakTopics} /></div><section aria-labelledby="recent-title"><div className="flex items-center justify-between"><h2 id="recent-title" className="text-2xl font-semibold text-[var(--color-ink)]">Recent Quizzes</h2><Link to="/quiz/history" className="text-xs font-bold text-[var(--color-accent)]">View history</Link></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{quizHistory.slice(0, 3).map((item) => <article key={item.id} className="dashboard-card bg-white p-4"><p className="text-sm font-semibold text-[var(--color-ink)]">{item.subject}</p><p className="mt-1 text-xs text-[var(--color-muted)]">{item.topic} · {item.date}</p><strong className={`mt-3 block text-2xl ${item.score < 60 ? 'text-[#a14d2e]' : 'text-[var(--color-accent)]'}`}>{item.score}%</strong></article>)}</div></section></div>
}