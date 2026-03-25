// Dao-Yu-101 Achievements Page
// Shows all badges, earned vs locked, with XP/coin rewards

import { usePlatform } from '@/contexts/PlatformContext';
import { achievements } from '@/lib/data';
import { motion } from 'framer-motion';
import { Zap, Lock } from 'lucide-react';

const BADGE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/achievement-badge-Z3cSG9memcFwHzY7S8CkwS.webp";

export default function AchievementsPage() {
  const { user, t } = usePlatform();
  const earned = user.achievements;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="px-4 py-8" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', borderBottom: '3px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="font-pixel text-white mb-2" style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.2rem)', textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
              🏆 {t('achievements.title').toUpperCase()}
            </h1>
            <p className="font-game text-white/70 mb-4">Earn badges by completing lessons, islands, and challenges!</p>
            <div className="flex gap-4">
              <div className="px-4 py-2 rounded-sm font-game text-sm" style={{ background: 'rgba(255,215,0,0.15)', border: '2px solid #FFD700', color: '#FFD700' }}>
                🏅 {earned.length}/{achievements.length} Earned
              </div>
              <div className="px-4 py-2 rounded-sm font-game text-sm" style={{ background: 'rgba(93,168,50,0.15)', border: '2px solid #5DA832', color: '#5DA832' }}>
                <Zap size={14} className="inline mr-1" />
                {achievements.filter(a => earned.includes(a.id)).reduce((s, a) => s + a.xpReward, 0)} XP from badges
              </div>
            </div>
          </div>
          <img src={BADGE_IMG} alt="Badges" className="w-48 rounded-sm" style={{ border: '3px solid #FFD700', boxShadow: '4px 4px 0 rgba(0,0,0,0.4)' }} />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, i) => {
            const isEarned = earned.includes(achievement.id);
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-5 rounded-sm"
                style={{
                  background: isEarned ? 'var(--card)' : 'var(--muted)',
                  border: `3px solid ${isEarned ? '#FFD700' : 'var(--border)'}`,
                  boxShadow: isEarned ? '4px 4px 0 rgba(255,215,0,0.2)' : '3px 3px 0 rgba(0,0,0,0.1)',
                  filter: isEarned ? 'none' : 'grayscale(0.5)',
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-14 h-14 rounded-sm flex items-center justify-center text-3xl shrink-0"
                    style={{
                      background: isEarned ? 'rgba(255,215,0,0.15)' : 'var(--border)',
                      border: `3px solid ${isEarned ? '#FFD700' : 'var(--border)'}`,
                    }}
                  >
                    {isEarned ? achievement.icon : <Lock size={20} color="var(--muted-foreground)" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-game font-bold text-sm mb-1" style={{ color: isEarned ? 'var(--foreground)' : 'var(--muted-foreground)' }}>
                      {achievement.name}
                    </h3>
                    <p className="text-xs font-game text-muted-foreground mb-2">{achievement.description}</p>
                    <div className="flex gap-2">
                      <span className="text-xs font-game px-2 py-0.5 rounded-sm"
                        style={{ background: 'rgba(93,168,50,0.15)', color: '#5DA832', border: '1px solid #5DA832' }}>
                        +{achievement.xpReward} XP
                      </span>
                      <span className="text-xs font-game px-2 py-0.5 rounded-sm"
                        style={{ background: 'rgba(255,215,0,0.15)', color: '#FFD700', border: '1px solid #FFD700' }}>
                        🪙 +{achievement.coinReward}
                      </span>
                    </div>
                  </div>
                </div>
                {isEarned && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(255,215,0,0.3)' }}>
                    <span className="font-pixel text-yellow-500" style={{ fontSize: '7px' }}>✓ ACHIEVEMENT UNLOCKED</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
