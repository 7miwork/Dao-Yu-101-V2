// Dao-Yu-101 Island Page
// Shows island overview with all 15 lessons, progress, and navigation to lessons

import { useParams, Link } from 'wouter';
import { usePlatform } from '@/contexts/PlatformContext';
import { programmingIslands } from '@/lib/data';
import { motion } from 'framer-motion';
import { Lock, Star, BookOpen, Clock, Zap, Coins, ChevronLeft, CheckCircle, PlayCircle, Circle } from 'lucide-react';

const ISLAND_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/island-intro-fcFvnXT775ZBv5L6xE3rjN.webp";
const LESSON_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/lesson-bg-4ZqdJj7zHHRFntdZ5U2NDR.webp";

export default function IslandPage() {
  const params = useParams<{ id: string }>();
  const { user, t } = usePlatform();
  const islandId = parseInt(params.id || '1');
  const island = programmingIslands.find(i => i.id === islandId);

  if (!island) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <div className="font-pixel text-2xl mb-4">🏝️</div>
          <h2 className="font-pixel mb-4" style={{ fontSize: '12px', color: 'var(--foreground)' }}>ISLAND NOT FOUND</h2>
          <Link href="/world"><button className="pixel-btn px-4 py-2 text-white" style={{ background: '#5DA832', borderColor: '#3d7a20', fontSize: '0.6rem' }}>← BACK TO MAP</button></Link>
        </div>
      </div>
    );
  }

  const isUnlocked = user.xp >= island.xpRequired;
  const completedLessons = island.lessons.filter(l => user.completedLessons.includes(l.id));
  const progressPercent = island.lessons.length > 0 ? Math.round((completedLessons.length / island.lessons.length) * 100) : 0;
  const totalXP = island.lessons.reduce((sum, l) => sum + l.xpReward, 0);
  const totalCoins = island.lessons.reduce((sum, l) => sum + l.coinReward, 0);
  const totalTime = island.lessons.reduce((sum, l) => sum + l.duration, 0);

  const getLessonStatus = (lessonId: number) => {
    if (user.completedLessons.includes(lessonId)) return 'completed';
    if (lessonId === user.currentLesson) return 'current';
    const prevCompleted = lessonId === 1 || user.completedLessons.includes(lessonId - 1);
    return prevCompleted ? 'available' : 'locked';
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ minHeight: '260px' }}>
        <img src={islandId === 1 ? ISLAND_IMG : LESSON_BG} alt={island.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${island.color}CC 0%, rgba(0,0,0,0.7) 100%)` }} />

        <div className="relative z-10 px-4 py-6 max-w-4xl mx-auto">
          <Link href="/world">
            <button className="flex items-center gap-2 text-white/80 hover:text-white font-game text-sm mb-4 transition-colors">
              <ChevronLeft size={16} /> Back to World Map
            </button>
          </Link>

          <div className="flex flex-wrap items-start gap-4">
            <div className="text-5xl animate-float">{island.icon}</div>
            <div className="flex-1">
              <div className="font-pixel text-white/70 mb-1" style={{ fontSize: '9px' }}>
                ISLAND {island.id} · PROGRAMMING ARCHIPELAGO
              </div>
              <h1 className="font-pixel text-white mb-2" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.4rem)', textShadow: '2px 2px 0 rgba(0,0,0,0.6)' }}>
                {island.name.toUpperCase()}
              </h1>
              <p className="font-game text-white/85 mb-4 max-w-xl">{island.description}</p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-game"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.3)', color: 'white' }}>
                  <BookOpen size={12} /> {island.lessons.length} Lessons
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-game"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '2px solid rgba(255,215,0,0.5)', color: '#FFD700' }}>
                  <Zap size={12} /> {totalXP} XP
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-game"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '2px solid rgba(255,215,0,0.3)', color: '#FFD700' }}>
                  🪙 {totalCoins} Coins
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-game"
                  style={{ background: 'rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.2)', color: 'white' }}>
                  <Clock size={12} /> ~{Math.round(totalTime / 60)}h
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {island.lessons.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs font-game text-white/70 mb-1">
                <span>Progress</span>
                <span>{completedLessons.length}/{island.lessons.length} lessons ({progressPercent}%)</span>
              </div>
              <div className="h-3 rounded-none" style={{ background: 'rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.3)' }}>
                <div className="h-full transition-all duration-700" style={{ width: `${progressPercent}%`, background: island.color }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!isUnlocked ? (
          <div className="text-center py-16">
            <Lock size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="font-pixel mb-3" style={{ fontSize: '12px', color: 'var(--foreground)' }}>ISLAND LOCKED</h2>
            <p className="font-game text-muted-foreground mb-6">
              You need {island.xpRequired} XP to unlock this island. You currently have {user.xp} XP.
            </p>
            <Link href="/world">
              <button className="pixel-btn px-6 py-3 text-white" style={{ background: '#5DA832', borderColor: '#3d7a20', fontSize: '0.6rem' }}>
                ← BACK TO MAP
              </button>
            </Link>
          </div>
        ) : island.lessons.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🚧</div>
            <h2 className="font-pixel mb-3" style={{ fontSize: '12px', color: 'var(--foreground)' }}>COMING SOON</h2>
            <p className="font-game text-muted-foreground mb-6">
              This island is being built! Complete Island 1 first to unlock more content.
            </p>
            <Link href="/island/1">
              <button className="pixel-btn px-6 py-3 text-white" style={{ background: '#5DA832', borderColor: '#3d7a20', fontSize: '0.6rem' }}>
                🏝️ GO TO ISLAND 1
              </button>
            </Link>
          </div>
        ) : (
          <>
            <h2 className="font-pixel mb-6" style={{ fontSize: '10px', color: 'var(--foreground)' }}>
              ALL 15 LESSONS
            </h2>
            <div className="space-y-3">
              {island.lessons.map((lesson, idx) => {
                const status = getLessonStatus(lesson.id);
                const isAvailable = status !== 'locked';

                return (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    {isAvailable ? (
                      <Link href={`/lesson/${island.id}/${lesson.id}`}>
                        <div
                          className="flex items-center gap-4 p-4 rounded-sm cursor-pointer transition-all group"
                          style={{
                            background: status === 'current' ? `${island.color}15` : 'var(--card)',
                            border: `3px solid ${status === 'current' ? island.color : status === 'completed' ? '#5DA832' : 'var(--border)'}`,
                            boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
                          }}
                        >
                          {/* Status icon */}
                          <div className="shrink-0">
                            {status === 'completed' ? (
                              <CheckCircle size={24} color="#5DA832" fill="#5DA832" />
                            ) : status === 'current' ? (
                              <PlayCircle size={24} color={island.color} />
                            ) : (
                              <Circle size={24} color="var(--muted-foreground)" />
                            )}
                          </div>

                          {/* Lesson number */}
                          <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 font-pixel"
                            style={{
                              background: status === 'completed' ? '#5DA832' : status === 'current' ? island.color : 'var(--muted)',
                              color: 'white',
                              fontSize: '9px',
                              border: '2px solid rgba(0,0,0,0.2)',
                            }}>
                            {lesson.id}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="font-game font-bold text-sm group-hover:underline" style={{ color: 'var(--foreground)' }}>
                              {lesson.title}
                            </div>
                            <div className="text-xs text-muted-foreground font-game truncate mt-0.5">
                              {lesson.objective}
                            </div>
                          </div>

                          {/* Meta */}
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="hidden sm:flex items-center gap-1 text-xs font-game" style={{ color: '#FFD700' }}>
                              <Zap size={10} /> {lesson.xpReward}
                            </div>
                            <div className="hidden sm:flex items-center gap-1 text-xs font-game text-muted-foreground">
                              <Clock size={10} /> {lesson.duration}m
                            </div>
                            <div className="text-xs font-game px-2 py-0.5 rounded-sm"
                              style={{
                                background: lesson.type === 'interactive' ? 'rgba(93,168,50,0.2)' : lesson.type === 'video' ? 'rgba(21,101,192,0.2)' : 'rgba(106,27,154,0.2)',
                                color: lesson.type === 'interactive' ? '#5DA832' : lesson.type === 'video' ? '#1565C0' : '#6A1B9A',
                                border: `1px solid currentColor`,
                              }}>
                              {lesson.type}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div
                        className="flex items-center gap-4 p-4 rounded-sm opacity-50"
                        style={{
                          background: 'var(--muted)',
                          border: '3px solid var(--border)',
                          boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                        }}
                      >
                        <Lock size={24} color="var(--muted-foreground)" />
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 font-pixel"
                          style={{ background: 'var(--border)', color: 'var(--muted-foreground)', fontSize: '9px' }}>
                          {lesson.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-game font-bold text-sm text-muted-foreground">{lesson.title}</div>
                          <div className="text-xs text-muted-foreground font-game">Complete previous lesson to unlock</div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
