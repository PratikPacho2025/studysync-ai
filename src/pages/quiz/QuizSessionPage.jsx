import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuizProgress, QuizQuestion, QuizTimer } from '../../components/quiz'
import { calculateAccuracy, calculateScore } from '../../utils/quiz'
import { api } from '../../services/api'

export function QuizSessionPage() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [seconds, setSeconds] = useState(600) // Default 10 mins until loaded
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    api.fetchQuizzes().then((data) => {
      const found = data.quizzes.find((q) => String(q.id) === String(quizId))
      const activeQuiz = found || data.quizzes[0]
      setQuiz(activeQuiz)
      setSeconds(activeQuiz.duration * 60)
    }).catch(console.error)
  }, [quizId])

  const unanswered = quiz ? quiz.questions.length - Object.keys(answers).length : 0

  const finishQuiz = useCallback(() => {
    if (!quiz) return
    const score = calculateScore(quiz, answers)
    const accuracy = calculateAccuracy(score, quiz.questions.length)
    
    api.submitQuizAttempt(quiz.id, accuracy).then(() => {
      navigate('/quiz/result', { 
        state: { 
          quiz, 
          score, 
          accuracy, 
          time: `${String(Math.floor((quiz.duration * 60 - seconds) / 60)).padStart(2, '0')}:${String((quiz.duration * 60 - seconds) % 60).padStart(2, '0')}` 
        } 
      })
    }).catch((err) => {
      console.error(err)
      // Navigate anyway in case of error so UX is smooth
      navigate('/quiz/result', { state: { quiz, score, accuracy, time: '00:00' } })
    })
  }, [answers, navigate, quiz, seconds])

  useEffect(() => {
    if (seconds <= 0) {
      finishQuiz()
      return undefined
    }
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000)
    return () => clearInterval(timer)
  }, [finishQuiz, seconds])

  if (!quiz) {
    return <div className="p-8 text-center text-sm text-[var(--color-muted)]">Loading quiz...</div>
  }

  const question = quiz.questions[current]

  return <div className="mx-auto w-full max-w-3xl space-y-6 pb-2"><button type="button" onClick={() => navigate('/quiz')} className="flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm font-bold text-[var(--color-muted)]"><ArrowLeft size={18} aria-hidden="true" /> Exit quiz</button><header className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">{quiz.subject}</p><h1 className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">{quiz.topic}</h1></div><QuizTimer seconds={seconds} /></header><section className="dashboard-card bg-white p-5 sm:p-7"><QuizProgress current={current + 1} total={quiz.questions.length} /><div className="mt-8"><QuizQuestion question={question} selectedAnswer={answers[current]} submitted={false} onSelect={(answer) => setAnswers((old) => ({ ...old, [current]: answer }))} /></div><div className="mt-8 flex justify-between gap-3 border-t border-[#edf1ed] pt-5"><button type="button" onClick={() => setCurrent((value) => Math.max(0, value - 1))} disabled={current === 0} className="flex min-h-11 items-center gap-2 rounded-xl border border-[#d8e5db] px-4 text-sm font-bold text-[var(--color-muted)] disabled:opacity-40"><ArrowLeft size={16} aria-hidden="true" /> Previous</button>{current < quiz.questions.length - 1 ? <button type="button" onClick={() => setCurrent((value) => value + 1)} className="flex min-h-11 items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 text-sm font-bold text-white">Next <ArrowRight size={16} aria-hidden="true" /></button> : <button type="button" onClick={() => unanswered ? setConfirm(true) : finishQuiz()} className="flex min-h-11 items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 text-sm font-bold text-white">Submit Quiz <Send size={16} aria-hidden="true" /></button>}</div></section>{confirm && <div className="fixed inset-0 z-50 grid place-items-center bg-[#173e32]/35 p-5"><div className="w-full max-w-sm rounded-3xl bg-[#f8fbf8] p-6 shadow-2xl"><h2 className="text-xl font-semibold text-[var(--color-ink)]">Submit incomplete quiz?</h2><p className="mt-2 text-sm text-[var(--color-muted)]">You have {unanswered} unanswered {unanswered === 1 ? 'question' : 'questions'}.</p><div className="mt-5 flex gap-3"><button type="button" onClick={() => setConfirm(false)} className="min-h-11 flex-1 rounded-xl border border-[#d8e5db] text-sm font-bold text-[var(--color-muted)]">Cancel</button><button type="button" onClick={finishQuiz} className="min-h-11 flex-1 rounded-xl bg-[var(--color-accent)] text-sm font-bold text-white">Submit</button></div></div></div>}</div>
}