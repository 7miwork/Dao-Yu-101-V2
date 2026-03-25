// Dao-Yu-101 World Map Page
// Design: Pixel Archipelago — Interactive island map with unlock progression

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { usePlatform } from '@/contexts/PlatformContext';
import { programmingArchipelago, programmingIslands } from '@/lib/data';
import type { Island } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Star, BookOpen, ChevronRight, Trophy, Zap } from 'lucide-react';

const WORLD_MAP_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/world-map-Si4q7oLAMxC26psNBdgtDJ.webp";
const ISLAND_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/island-intro-fcFvnXT775ZBv5L6xE3rjN.webp";

// Island positions on the map (as % of container)
const ISLAND_POSITIONS = [
  { x: 18, y: 62 },  // 1 - Introduction
  { x: 35, y: 22 },  // 2 - Movement
  { x: 55, y: 18 },  // 3 - Loops
  { x: 30, y: 48 },  // 4 - Conditions
  { x: 18, y: 75 },  // 5 - Variables
  { x: 50, y: 55 },  // 6 - Functions
  { x: 65, y: 38 },  // 7 - Events
  { x: 50, y: 72 },  // 8 - Building
  { x: 68, y: 62 },  // 9 - Game Mechanics
  { x: 82, y: 28 },  // 10 - Final Project
];

// SVG path connections between islands
const CONNECTIONS = [
  [0, 1], [1, 2], [2, 9], [0, 3], [3, 4], [3, 5], [5, 6], [5, 7], [7, 8], [6, 9], [8, 9]
];

function IslandNode({ island, position, isUnlocked, isCompleted, isActive, onClick }: {
  island: Island;
  position: { x: number; y: number };
  isUnlocked: boolean;
  isCompleted: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  const size = island.id === 10 ? 52 : island.id === 1 ? 48 : 40;

  return (
    <motion.button
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%`, zIndex: isActive ? 20 : 10 }}
      whileHover={isUnlocked ? { scale: 1.15 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
    >
      <div className="relative flex flex-col items-center gap-1">
        {/* Island circle */}
        <div
          className="rounded-full flex items-center justify-center font-pixel relative overflow-hidden"
          style={{
            width: size, height: size,
            background: isCompleted ? island.color : isUnlocked ? island.color : '#4a4a4a',
            border: `3px solid ${isActive ? '#FFD700' : isCompleted ? '#FFD700' : isUnlocked ? 'rgba(255,255,255,0.5)' : '#333'}`,
            boxShadow: isActive
              ? `0 0 20px ${island.color}, 0 0 40px rgba(255,215,0,0.4), 3px 3px 0 rgba(0,0,0,0.5)`
              : isUnlocked
                ? `3px 3px 0 rgba(0,0,0,0.5), 0 0 10px ${island.color}40`
                : '2px 2px 0 rgba(0,0,0,0.5)',
            filter: !isUnlocked ? 'grayscale(0.7) brightness(0.6)' : 'none',
            fontSize: size * 0.4,
          }}
        >
          {!isUnlocked ? (
            <Lock size={size * 0.35} color="#aaa" />
          ) : (
            <span style={{ fontSize: size * 0.38 }}>{island.icon}</span>
          )}
          {isCompleted && (
            <div className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: '#FFD700', border: '2px solid #fff' }}>
              <Star size={8} fill="#fff" color="#fff" />
            </div>
          )}
        </div>

        {/* Island label */}
        <div
          className="px-2 py-0.5 text-center whitespace-nowrap"
          style={{
            background: isActive ? '#FFD700' : isUnlocked ? island.color : '#333',
            border: `2px solid ${isActive ? '#B8860B' : isUnlocked ? 'rgba(0,0,0,0.3)' : '#222'}`,
            boxShadow: '2px 2px 0 rgba(0,0,0,0.4)',
            borderRadius: '2px',
            maxWidth: '90px',
          }}
        >
          <span
            className="font-pixel block"
            style={{
              fontSize: '6px',
              color: isActive ? '#1a1a1a' : 'white',
              lineHeight: 1.4,
              textShadow: isActive ? 'none' : '1px 1px 0 rgba(0,0,0,0.5)',
            }}
          >
            {island.id}. {island.name.split(' ').slice(0, 2).join(' ')}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default function WorldMap() {
  const { user, t } = usePlatform();
  const [, navigate] = useLocation();
  const [selectedIsland, setSelectedIsland] = useState<Island | null>(programmingIslands[0]);

  const isIslandUnlocked = (island: Island) => user.xp >= island.xpRequired;
  const isIslandCompleted = (island: Island) => user.completedIslands.includes(island.id);
  const isIslandActive = (island: Island) => island.id === user.currentIsland;

  const completedCount = programmingIslands.filter(i => isIslandCompleted(i)).length;
  const unlockedCount = programmingIslands.filter(i => isIslandUnlocked(i)).length;
  const progressPercent = Math.round((completedCount / programmingIslands.length) * 100);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="px-4 py-4" style={{ background: 'var(--sidebar)', borderBottom: '3px solid var(--sidebar-border)' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-pixel text-sidebar-foreground" style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}>
              🗺️ PROGRAMMING ARCHIPELAGO
            </h1>
            <p className="font-game text-sidebar-foreground/60 text-xs mt-0.5">
              Minecraft Education Block Coding
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-game">
              <span className="text-sidebar-foreground/70">Progress:</span>
              <div className="w-24 h-3 rounded-none" style={{ background: 'var(--sidebar-accent)', border: '2px solid var(--sidebar-border)' }}>
                <div className="h-full" style={{ width: `${progressPercent}%`, background: '#5DA832', transition: 'width 0.5s ease' }} />
              </div>
              <span className="text-green-400 font-bold">{completedCount}/{programmingIslands.length}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-game" style={{ color: '#FFD700' }}>
              <Zap size={12} /> <span>{user.xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Map */}
        <div className="flex-1 min-w-0">
          <div className="relative rounded-sm overflow-hidden" style={{ border: '3px solid var(--border)', boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>
            {/* Map background */}
            <img src={WORLD_MAP_IMG} alt="World Map" className="w-full block" style={{ minHeight: '300px', objectFit: 'cover' }} />

            {/* SVG connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              {CONNECTIONS.map(([from, to], i) => {
                const a = ISLAND_POSITIONS[from];
                const b = ISLAND_POSITIONS[to];
                const fromUnlocked = isIslandUnlocked(programmingIslands[from]);
                const toUnlocked = isIslandUnlocked(programmingIslands[to]);
                return (
                  <line
                    key={i}
                    x1={`${a.x}%`} y1={`${a.y}%`}
                    x2={`${b.x}%`} y2={`${b.y}%`}
                    stroke={fromUnlocked && toUnlocked ? '#FFD700' : 'rgba(255,255,255,0.2)'}
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    opacity={fromUnlocked && toUnlocked ? 0.8 : 0.3}
                  />
                );
              })}
            </svg>

            {/* Island nodes */}
            {programmingIslands.map((island, idx) => (
              <IslandNode
                key={island.id}
                island={island}
                position={ISLAND_POSITIONS[idx]}
                isUnlocked={isIslandUnlocked(island)}
                isCompleted={isIslandCompleted(island)}
                isActive={isIslandActive(island)}
                onClick={() => setSelectedIsland(island)}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-3 text-xs font-game text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full" style={{ background: '#5DA832', border: '2px solid #FFD700' }} />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#5DA832', border: '2px solid #FFD700' }}>
                <Star size={8} fill="#FFD700" color="#FFD700" />
              </div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#4a4a4a', border: '2px solid #333' }}>
                <Lock size={8} color="#aaa" />
              </div>
              <span>Locked</span>
            </div>
          </div>
        </div>

        {/* Island Detail Panel */}
        <div className="w-full lg:w-80 shrink-0">
          <AnimatePresence mode="wait">
            {selectedIsland && (
              <motion.div
                key={selectedIsland.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="rounded-sm overflow-hidden"
                style={{ border: '3px solid var(--border)', boxShadow: '4px 4px 0 rgba(0,0,0,0.2)', background: 'var(--card)' }}
              >
                {/* Island image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={selectedIsland.id === 1 ? ISLAND_IMG : WORLD_MAP_IMG}
                    alt={selectedIsland.name}
                    className="w-full h-full object-cover"
                    style={{ filter: !isIslandUnlocked(selectedIsland) ? 'grayscale(0.8) brightness(0.5)' : 'none' }}
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${selectedIsland.color}CC, transparent)` }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-3xl">{selectedIsland.icon}</span>
                  </div>
                  {!isIslandUnlocked(selectedIsland) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <Lock size={32} color="#FFD700" />
                        <span className="font-pixel text-yellow-400" style={{ fontSize: '8px' }}>
                          {selectedIsland.xpRequired} XP NEEDED
                        </span>
                      </div>
                    </div>
                  )}
                  {isIslandCompleted(selectedIsland) && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-sm"
                      style={{ background: '#FFD700', border: '2px solid #B8860B' }}>
                      <Trophy size={12} color="#1a1a1a" />
                      <span className="font-pixel text-black" style={{ fontSize: '7px' }}>DONE</span>
                    </div>
                  )}
                </div>

                {/* Island info */}
                <div className="p-4">
                  <h3 className="font-pixel mb-1" style={{ fontSize: '10px', color: 'var(--foreground)' }}>
                    ISLAND {selectedIsland.id}
                  </h3>
                  <h2 className="font-game font-bold text-lg mb-2" style={{ color: selectedIsland.color }}>
                    {selectedIsland.name}
                  </h2>
                  <p className="text-sm font-game text-muted-foreground mb-4">
                    {selectedIsland.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-2 rounded-sm text-center" style={{ background: 'var(--muted)', border: '2px solid var(--border)' }}>
                      <div className="font-pixel text-xs" style={{ color: selectedIsland.color }}>15</div>
                      <div className="font-game text-xs text-muted-foreground">Lessons</div>
                    </div>
                    <div className="p-2 rounded-sm text-center" style={{ background: 'var(--muted)', border: '2px solid var(--border)' }}>
                      <div className="font-pixel text-xs" style={{ color: '#FFD700' }}>{selectedIsland.totalXP}</div>
                      <div className="font-game text-xs text-muted-foreground">Total XP</div>
                    </div>
                  </div>

                  {/* XP requirement */}
                  {!isIslandUnlocked(selectedIsland) && (
                    <div className="mb-4 p-3 rounded-sm" style={{ background: 'rgba(255,107,53,0.1)', border: '2px solid #FF6B35' }}>
                      <p className="font-game text-xs" style={{ color: '#FF6B35' }}>
                        🔒 Requires {selectedIsland.xpRequired} XP to unlock
                      </p>
                      <p className="font-game text-xs text-muted-foreground mt-1">
                        You have {user.xp} XP — need {selectedIsland.xpRequired - user.xp} more!
                      </p>
                    </div>
                  )}

                  {/* Lessons preview (Island 1 only) */}
                  {selectedIsland.id === 1 && selectedIsland.lessons.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-pixel mb-2" style={{ fontSize: '8px', color: 'var(--muted-foreground)' }}>LESSONS</h4>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {selectedIsland.lessons.slice(0, 8).map(lesson => {
                          const done = user.completedLessons.includes(lesson.id);
                          const current = lesson.id === user.currentLesson;
                          return (
                            <div
                              key={lesson.id}
                              className="flex items-center gap-2 p-2 rounded-sm text-xs font-game"
                              style={{
                                background: current ? `${selectedIsland.color}20` : 'var(--muted)',
                                border: `2px solid ${current ? selectedIsland.color : 'var(--border)'}`,
                              }}
                            >
                              <span className="w-5 h-5 rounded-sm flex items-center justify-center text-xs shrink-0"
                                style={{ background: done ? '#5DA832' : current ? selectedIsland.color : 'var(--border)', color: 'white' }}>
                                {done ? '✓' : lesson.id}
                              </span>
                              <span className="truncate" style={{ color: done ? 'var(--muted-foreground)' : 'var(--foreground)' }}>
                                {lesson.title}
                              </span>
                              <span className="ml-auto text-yellow-500 shrink-0">+{lesson.xpReward}</span>
                            </div>
                          );
                        })}
                        {selectedIsland.lessons.length > 8 && (
                          <div className="text-center text-xs text-muted-foreground font-game py-1">
                            +{selectedIsland.lessons.length - 8} more lessons...
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  {isIslandUnlocked(selectedIsland) ? (
                    <Link href={`/island/${selectedIsland.id}`}>
                      <button className="pixel-btn w-full py-3 text-white flex items-center justify-center gap-2"
                        style={{ background: selectedIsland.color, borderColor: 'rgba(0,0,0,0.3)', fontSize: '0.6rem' }}>
                        <BookOpen size={14} />
                        {isIslandCompleted(selectedIsland) ? 'REVIEW ISLAND' : isIslandActive(selectedIsland) ? 'CONTINUE' : 'START ISLAND'}
                        <ChevronRight size={14} />
                      </button>
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="pixel-btn w-full py-3 flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                      style={{ background: '#4a4a4a', borderColor: '#333', color: '#aaa', fontSize: '0.6rem' }}
                    >
                      <Lock size={14} />
                      LOCKED — EARN MORE XP
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Island list */}
          <div className="mt-4 rounded-sm overflow-hidden" style={{ border: '3px solid var(--border)', background: 'var(--card)' }}>
            <div className="px-3 py-2" style={{ background: 'var(--muted)', borderBottom: '2px solid var(--border)' }}>
              <span className="font-pixel" style={{ fontSize: '8px', color: 'var(--muted-foreground)' }}>ALL ISLANDS</span>
            </div>
            {programmingIslands.map(island => {
              const unlocked = isIslandUnlocked(island);
              const completed = isIslandCompleted(island);
              const active = isIslandActive(island);
              return (
                <button
                  key={island.id}
                  onClick={() => setSelectedIsland(island)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors border-b"
                  style={{
                    borderColor: 'var(--border)',
                    background: selectedIsland?.id === island.id ? `${island.color}15` : 'transparent',
                  }}
                >
                  <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                    style={{
                      background: unlocked ? island.color : '#4a4a4a',
                      border: `2px solid ${active ? '#FFD700' : 'transparent'}`,
                      filter: !unlocked ? 'grayscale(0.7)' : 'none',
                    }}>
                    {!unlocked ? <Lock size={12} color="#aaa" /> : <span style={{ fontSize: '14px' }}>{island.icon}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-game font-bold text-xs truncate" style={{ color: unlocked ? 'var(--foreground)' : 'var(--muted-foreground)' }}>
                      {island.id}. {island.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-game">
                      {unlocked ? '15 lessons' : `${island.xpRequired} XP needed`}
                    </div>
                  </div>
                  {completed && <Star size={12} fill="#FFD700" color="#FFD700" />}
                  {active && !completed && <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#5DA832' }} />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
