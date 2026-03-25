// Dao-Yu-101 Lesson Page
// Full lesson viewer: content → task → quiz → XP reward

import { useParams, Link, useLocation } from 'wouter';
import { usePlatform } from '@/contexts/PlatformContext';
import { programmingIslands } from '@/lib/data';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Zap, BookOpen, Wrench, HelpCircle, Trophy, Star } from 'lucide-react';

const LESSON_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/lesson-bg-4ZqdJj7zHHRFntdZ5U2NDR.webp";

type Step = 'content' | 'task' | 'quiz' | 'complete';

export default function LessonPage() {
  const params = useParams<{ islandId: string; lessonId: string }>();
  const { user, addXP, addCoins, completeLesson, t } = usePlatform();
  const [, navigate] = useLocation();

  const islandId = parseInt(params.islandId || '1');
  const lessonId = parseInt(params.lessonId || '1');

  const island = programmingIslands.find(i => i.id === islandId);
  const lesson = island?.lessons.find(l => l.id === lessonId);

  const [step, setStep] = useState<Step>('content');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);

  if (!island || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <div className="font-pixel text-2xl mb-4">📚</div>
          <h2 className="font-pixel mb-4" style={{ fontSize: '12px', color: 'var(--foreground)' }}>LESSON NOT FOUND</h2>
          <Link href="/world"><button className="pixel-btn px-4 py-2 text-white" style={{ background: '#5DA832', borderColor: '#3d7a20', fontSize: '0.6rem' }}>← BACK TO MAP</button></Link>
        </div>
      </div>
    );
  }

  const isCompleted = user.completedLessons.includes(lesson.id);
  const nextLesson = island.lessons.find(l => l.id === lessonId + 1);
  const prevLesson = island.lessons.find(l => l.id === lessonId - 1);

  const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: 'content', label: 'Learn', icon: <BookOpen size={14} /> },
    { key: 'task', label: 'Practice', icon: <Wrench size={14} /> },
    { key: 'quiz', label: 'Quiz', icon: <HelpCircle size={14} /> },
    { key: 'complete', label: 'Complete', icon: <Trophy size={14} /> },
  ];

  const stepIndex = STEPS.findIndex(s => s.key === step);

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    const correct = selectedAnswer === lesson.quiz.correct;
    setIsCorrect(correct);
    setAnswered(true);
  };

  const handleComplete = () => {
    if (!isCompleted) {
      const xp = lesson.xpReward + (isCorrect ? Math.round(lesson.xpReward * 0.5) : 0);
      const coins = lesson.coinReward + (isCorrect ? Math.round(lesson.coinReward * 0.5) : 0);
      setXpEarned(xp);
      setCoinsEarned(coins);
      addXP(xp);
      addCoins(coins);
      completeLesson(lesson.id);
    }
    setStep('complete');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="sticky top-14 z-40" style={{ background: 'var(--card)', borderBottom: '3px solid var(--border)' }}>
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href={`/island/${islandId}`}>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground font-game text-xs transition-colors">
              <ChevronLeft size={14} /> {island.name}
            </button>
          </Link>
          <div className="flex-1 flex items-center justify-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex items-center gap-1">
                <button
                  onClick={() => { if (i <= stepIndex || isCompleted) setStep(s.key); }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-sm text-xs font-game transition-all ${step === s.key ? 'text-white' : i < stepIndex ? 'text-green-500' : 'text-muted-foreground'}`}
                  style={step === s.key ? { background: island.color, border: `2px solid rgba(0,0,0,0.2)` } : {}}
                >
                  {i < stepIndex ? <CheckCircle size={12} color="#5DA832" /> : s.icon}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && <div className="w-4 h-0.5" style={{ background: i < stepIndex ? '#5DA832' : 'var(--border)' }} />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs font-game" style={{ color: '#FFD700' }}>
            <Zap size={12} /> +{lesson.xpReward}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* ── CONTENT STEP ── */}
          {step === 'content' && (
            <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-pixel text-xs" style={{ color: island.color }}>LESSON {lesson.id}</span>
                  <span className="px-2 py-0.5 text-xs font-game rounded-sm"
                    style={{ background: `${island.color}20`, color: island.color, border: `1px solid ${island.color}` }}>
                    {lesson.type}
                  </span>
                </div>
                <h1 className="font-pixel mb-3" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)', color: 'var(--foreground)' }}>
                  {lesson.title.toUpperCase()}
                </h1>
                <div className="p-3 rounded-sm mb-4" style={{ background: `${island.color}15`, border: `2px solid ${island.color}40` }}>
                  <p className="font-game text-sm font-bold" style={{ color: island.color }}>
                    🎯 Objective: {lesson.objective}
                  </p>
                </div>
              </div>

              {/* Lesson content */}
              <div className="relative rounded-sm overflow-hidden mb-6">
                <div className="absolute inset-0 opacity-10">
                  <img src={LESSON_BG} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 p-6" style={{ background: 'var(--card)', border: '3px solid var(--border)', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen size={18} style={{ color: island.color }} />
                    <span className="font-pixel" style={{ fontSize: '9px', color: island.color }}>LESSON CONTENT</span>
                  </div>
                  <div className="font-game text-base leading-relaxed" style={{ color: 'var(--foreground)', whiteSpace: 'pre-wrap' }}>
                    {lesson.content}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                {prevLesson ? (
                  <Link href={`/lesson/${islandId}/${prevLesson.id}`}>
                    <button className="pixel-btn px-4 py-2 flex items-center gap-2"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--foreground)', fontSize: '0.55rem' }}>
                      <ChevronLeft size={14} /> PREV
                    </button>
                  </Link>
                ) : <div />}
                <button
                  onClick={() => setStep('task')}
                  className="pixel-btn px-6 py-3 text-white flex items-center gap-2"
                  style={{ background: island.color, borderColor: 'rgba(0,0,0,0.3)', fontSize: '0.6rem' }}
                >
                  PRACTICE TASK <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── TASK STEP ── */}
          {step === 'task' && (
            <motion.div key="task" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-6">
                <span className="font-pixel text-xs" style={{ color: '#FF6B35' }}>PRACTICE TASK</span>
                <h1 className="font-pixel mt-1 mb-3" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)', color: 'var(--foreground)' }}>
                  {lesson.title.toUpperCase()}
                </h1>
              </div>

              <div className="p-6 rounded-sm mb-6" style={{ background: 'var(--card)', border: '3px solid #FF6B35', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Wrench size={18} color="#FF6B35" />
                  <span className="font-pixel" style={{ fontSize: '9px', color: '#FF6B35' }}>MINECRAFT TASK</span>
                </div>
                <div className="font-game text-base leading-relaxed" style={{ color: 'var(--foreground)' }}>
                  {lesson.task}
                </div>
              </div>

              <div className="p-4 rounded-sm mb-6" style={{ background: 'rgba(93,168,50,0.1)', border: '2px solid #5DA832' }}>
                <p className="font-game text-sm" style={{ color: '#5DA832' }}>
                  💡 <strong>Tip:</strong> Open Minecraft Education and try the task before moving to the quiz. You'll understand the concept much better!
                </p>
              </div>

              <div className="flex justify-between items-center">
                <button onClick={() => setStep('content')} className="pixel-btn px-4 py-2 flex items-center gap-2"
                  style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--foreground)', fontSize: '0.55rem' }}>
                  <ChevronLeft size={14} /> BACK
                </button>
                <button onClick={() => setStep('quiz')} className="pixel-btn px-6 py-3 text-white flex items-center gap-2"
                  style={{ background: '#FF6B35', borderColor: 'rgba(0,0,0,0.3)', fontSize: '0.6rem' }}>
                  TAKE QUIZ <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── QUIZ STEP ── */}
          {step === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-6">
                <span className="font-pixel text-xs" style={{ color: '#FFD700' }}>KNOWLEDGE CHECK</span>
                <h1 className="font-pixel mt-1 mb-3" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)', color: 'var(--foreground)' }}>
                  QUIZ TIME!
                </h1>
              </div>

              <div className="p-6 rounded-sm mb-6" style={{ background: 'var(--card)', border: '3px solid #FFD700', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle size={18} color="#FFD700" />
                  <span className="font-pixel" style={{ fontSize: '9px', color: '#FFD700' }}>QUESTION</span>
                </div>
                <p className="font-game text-lg font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                  {lesson.quiz.question}
                </p>

                <div className="space-y-3">
                  {lesson.quiz.options.map((option, idx) => {
                    let borderColor = 'var(--border)';
                    let bg = 'var(--muted)';
                    let textColor = 'var(--foreground)';
                    if (answered) {
                      if (idx === lesson.quiz.correct) { borderColor = '#5DA832'; bg = 'rgba(93,168,50,0.15)'; textColor = '#5DA832'; }
                      else if (idx === selectedAnswer && !isCorrect) { borderColor = '#E53935'; bg = 'rgba(229,57,53,0.15)'; textColor = '#E53935'; }
                    } else if (selectedAnswer === idx) {
                      borderColor = '#FFD700'; bg = 'rgba(255,215,0,0.15)';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => { if (!answered) setSelectedAnswer(idx); }}
                        disabled={answered}
                        className="w-full flex items-center gap-3 p-4 rounded-sm text-left transition-all font-game text-sm"
                        style={{ background: bg, border: `3px solid ${borderColor}`, color: textColor, boxShadow: '2px 2px 0 rgba(0,0,0,0.1)' }}
                      >
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center font-pixel shrink-0"
                          style={{ background: borderColor, color: 'white', fontSize: '9px', border: '2px solid rgba(0,0,0,0.2)' }}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        {option}
                        {answered && idx === lesson.quiz.correct && <CheckCircle size={18} color="#5DA832" className="ml-auto" />}
                        {answered && idx === selectedAnswer && !isCorrect && <XCircle size={18} color="#E53935" className="ml-auto" />}
                      </button>
                    );
                  })}
                </div>

                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-sm"
                    style={{
                      background: isCorrect ? 'rgba(93,168,50,0.1)' : 'rgba(229,57,53,0.1)',
                      border: `2px solid ${isCorrect ? '#5DA832' : '#E53935'}`
                    }}
                  >
                    <p className="font-game font-bold mb-1" style={{ color: isCorrect ? '#5DA832' : '#E53935' }}>
                      {isCorrect ? `✅ ${t('quiz.correct')} +${Math.round(lesson.xpReward * 0.5)} bonus XP!` : `❌ ${t('quiz.wrong')}`}
                    </p>
                    <p className="font-game text-sm text-muted-foreground">{lesson.quiz.explanation}</p>
                  </motion.div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button onClick={() => setStep('task')} className="pixel-btn px-4 py-2 flex items-center gap-2"
                  style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--foreground)', fontSize: '0.55rem' }}>
                  <ChevronLeft size={14} /> BACK
                </button>
                {!answered ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={selectedAnswer === null}
                    className="pixel-btn px-6 py-3 text-white flex items-center gap-2 disabled:opacity-50"
                    style={{ background: '#FFD700', borderColor: 'rgba(0,0,0,0.3)', color: '#1a1a1a', fontSize: '0.6rem' }}
                  >
                    {t('quiz.check')} <CheckCircle size={14} />
                  </button>
                ) : (
                  <button onClick={handleComplete} className="pixel-btn px-6 py-3 text-white flex items-center gap-2"
                    style={{ background: '#5DA832', borderColor: 'rgba(0,0,0,0.3)', fontSize: '0.6rem' }}>
                    COMPLETE LESSON <Trophy size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* ── COMPLETE STEP ── */}
          {step === 'complete' && (
            <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="text-center py-8">
              <motion.div
                animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8 }}
                className="text-7xl mb-6"
              >
                🎉
              </motion.div>
              <h2 className="font-pixel mb-3" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.3rem)', color: 'var(--foreground)' }}>
                LESSON COMPLETE!
              </h2>
              <p className="font-game text-muted-foreground mb-8 max-w-md mx-auto">
                Great work! You've completed "{lesson.title}". Keep going to unlock more islands!
              </p>

              {/* Rewards */}
              <div className="flex justify-center gap-6 mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="flex flex-col items-center gap-2 p-4 rounded-sm"
                  style={{ background: 'rgba(93,168,50,0.15)', border: '3px solid #5DA832', boxShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}
                >
                  <Zap size={24} color="#5DA832" />
                  <span className="font-pixel" style={{ fontSize: '1.2rem', color: '#5DA832' }}>+{xpEarned || lesson.xpReward}</span>
                  <span className="font-game text-xs text-muted-foreground">XP Earned</span>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="flex flex-col items-center gap-2 p-4 rounded-sm"
                  style={{ background: 'rgba(255,215,0,0.15)', border: '3px solid #FFD700', boxShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}
                >
                  <span className="text-2xl">🪙</span>
                  <span className="font-pixel" style={{ fontSize: '1.2rem', color: '#FFD700' }}>+{coinsEarned || lesson.coinReward}</span>
                  <span className="font-game text-xs text-muted-foreground">Coins Earned</span>
                </motion.div>
                {isCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="flex flex-col items-center gap-2 p-4 rounded-sm"
                    style={{ background: 'rgba(255,215,0,0.1)', border: '3px solid #FFD700', boxShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}
                  >
                    <Star size={24} fill="#FFD700" color="#FFD700" />
                    <span className="font-pixel" style={{ fontSize: '0.9rem', color: '#FFD700' }}>PERFECT!</span>
                    <span className="font-game text-xs text-muted-foreground">Quiz Bonus</span>
                  </motion.div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href={`/island/${islandId}`}>
                  <button className="pixel-btn px-5 py-3 flex items-center gap-2"
                    style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--foreground)', fontSize: '0.6rem' }}>
                    📋 ISLAND OVERVIEW
                  </button>
                </Link>
                {nextLesson ? (
                  <Link href={`/lesson/${islandId}/${nextLesson.id}`}>
                    <button className="pixel-btn px-6 py-3 text-white flex items-center gap-2"
                      style={{ background: island.color, borderColor: 'rgba(0,0,0,0.3)', fontSize: '0.6rem' }}>
                      NEXT LESSON <ChevronRight size={14} />
                    </button>
                  </Link>
                ) : (
                  <Link href="/world">
                    <button className="pixel-btn px-6 py-3 text-white flex items-center gap-2"
                      style={{ background: '#FFD700', borderColor: 'rgba(0,0,0,0.3)', color: '#1a1a1a', fontSize: '0.6rem' }}>
                      🗺️ BACK TO MAP
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
