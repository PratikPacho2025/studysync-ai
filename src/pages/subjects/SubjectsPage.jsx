import { useMemo, useState } from 'react'
import { AddSubjectSheet, AddTopicSheet, SubjectCard, SubjectDetails, SubjectsHeader } from '../../components/subjects'
import { subjects as initialSubjects } from '../../data/mock/subjects'

export function SubjectsPage() {
  const [subjects, setSubjects] = useState(initialSubjects)
  const [selectedSubjectId, setSelectedSubjectId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [topicFilter, setTopicFilter] = useState('all')
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false)
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [editingTopic, setEditingTopic] = useState(null)

  const selectedSubject = subjects.find((subject) => subject.id === selectedSubjectId)
  const visibleSubjects = useMemo(() => subjects.filter((subject) => subject.name.toLowerCase().includes(searchQuery.toLowerCase())), [subjects, searchQuery])

  function saveSubject(subject) {
    setSubjects((current) => editingSubject ? current.map((item) => item.id === subject.id ? subject : item) : [...current, subject])
    setEditingSubject(null); setIsAddSubjectOpen(false)
  }
  function saveTopic(topic) {
    setSubjects((current) => current.map((subject) => subject.id !== selectedSubjectId ? subject : { ...subject, topics: editingTopic ? subject.topics.map((item) => item.id === topic.id ? topic : item) : [...subject.topics, topic] }))
    setEditingTopic(null); setIsAddTopicOpen(false)
  }
  function updateTopicStatus(topicId, status) {
    setSubjects((current) => current.map((subject) => subject.id !== selectedSubjectId ? subject : { ...subject, topics: subject.topics.map((topic) => topic.id === topicId ? { ...topic, status, studyProgress: status === 'completed' ? 100 : status === 'in-progress' ? Math.max(topic.studyProgress, 50) : 0 } : topic) }))
  }
  function deleteSubject(subjectId) { setSubjects((current) => current.filter((subject) => subject.id !== subjectId)); setSelectedSubjectId(null) }
  function deleteTopic(topicId) { setSubjects((current) => current.map((subject) => subject.id !== selectedSubjectId ? subject : { ...subject, topics: subject.topics.filter((topic) => topic.id !== topicId) })) }

  return <div className="mx-auto w-full max-w-6xl space-y-7 pb-2">{selectedSubject ? <SubjectDetails subject={selectedSubject} topicFilter={topicFilter} onBack={() => { setSelectedSubjectId(null); setTopicFilter('all') }} onEdit={(subject) => { setEditingSubject(subject); setIsAddSubjectOpen(true) }} onDelete={deleteSubject} onAddTopic={() => setIsAddTopicOpen(true)} onFilterChange={setTopicFilter} onStatusChange={updateTopicStatus} onEditTopic={(topic) => { setEditingTopic(topic); setIsAddTopicOpen(true) }} onDeleteTopic={deleteTopic} /> : <><SubjectsHeader searchQuery={searchQuery} onSearch={setSearchQuery} onAdd={() => { setEditingSubject(null); setIsAddSubjectOpen(true) }} /><section aria-labelledby="subjects-list-title"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">Your learning map</p><h2 id="subjects-list-title" className="mt-1 text-2xl font-semibold text-[var(--color-ink)]">All subjects</h2></div><span className="text-xs font-semibold text-[var(--color-muted)]">{visibleSubjects.length} shown</span></div><div className="grid gap-4 sm:grid-cols-2">{visibleSubjects.length ? visibleSubjects.map((subject) => <SubjectCard key={subject.id} subject={subject} onView={setSelectedSubjectId} onEdit={(item) => { setEditingSubject(item); setIsAddSubjectOpen(true) }} onDelete={deleteSubject} />) : <p className="dashboard-card bg-white p-8 text-center text-sm text-[var(--color-muted)] sm:col-span-2">No subjects match your search.</p>}</div></section></>}<AddSubjectSheet key={editingSubject?.id ?? 'new'} isOpen={isAddSubjectOpen} subject={editingSubject} onClose={() => { setIsAddSubjectOpen(false); setEditingSubject(null) }} onSave={saveSubject} /><AddTopicSheet key={editingTopic?.id ?? 'new-topic'} isOpen={isAddTopicOpen} topic={editingTopic} onClose={() => { setIsAddTopicOpen(false); setEditingTopic(null) }} onSave={saveTopic} /></div>
}