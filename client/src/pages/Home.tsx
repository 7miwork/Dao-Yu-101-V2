// Dao-Yu-101 Home/Landing Page
// Design: Pixel Archipelago — Hero with world map, features, CTA

import { Link } from 'wouter';
import { usePlatform } from '@/contexts/PlatformContext';
import { motion } from 'framer-motion';
import { Star, Users, Globe, ShoppingBag, Award, BookOpen, Zap, Shield } from 'lucide-react';

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/hero-banner-gRvyymdBVhunU6GJyr2UfV.webp";
const WORLD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/world-map-Si4q7oLAMxC26psNBdgtDJ.webp";
const BADGE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663474460314/C3yzfyLqBUhAPsbQTbr9Ek/achievement-badge-Z3cSG9memcFwHzY7S8CkwS.webp";

const FEATURES = [
  { icon: '🗺️', title: 'World Map Navigation', desc: 'Explore a living archipelago. Each island is a new topic to conquer!' },
  { icon: '⛏️', title: 'Minecraft Education', desc: 'Learn block coding through real Minecraft Education projects and challenges.' },
  { icon: '⚡', title: 'XP & Levels', desc: 'Earn experience points, level up, and unlock new islands as you progress.' },
  { icon: '🏆', title: 'Achievements', desc: 'Collect badges and certificates. Show off your coding skills!' },
  { icon: '🪙', title: 'Coins & Shop', desc: 'Earn coins for every lesson. Spend them in the island shop for extras.' },
  { icon: '👨‍👩‍👧', title: 'Family & School', desc: 'Parent dashboards, teacher tools, and school analytics all in one place.' },
];

const STATS = [
  { value: '10', label: 'Islands', icon: '🏝️' },
  { value: '150', label: 'Lessons', icon: '📚' },
  { value: '6', label: 'Achievements', icon: '🏆' },
  { value: '5', label: 'Languages', icon: '🌍' },
];

const TESTIMONIALS = [
  { name: 'Emma, age 11', role: 'Student', text: 'I built my first Minecraft game using code! The islands make it so fun to learn.', avatar: '👧' },
  { name: 'Mr. Schmidt', role: 'Teacher', text: 'The teacher dashboard shows me exactly where each student needs help. Amazing tool!', avatar: '👨‍🏫' },
  { name: 'Sarah M.', role: 'Parent', text: 'My son asks to do his coding lessons every day. Best educational investment!', avatar: '👩' },
];

export default function Home() {
  const { t } = usePlatform();

  return (
    <div className="min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: '85vh' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Dao-Yu-101 World" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(13,27,62,0.85) 100%)' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-16 pb-24" style={{ minHeight: '85vh' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-sm text-xs font-game"
              style={{ background: 'rgba(93,168,50,0.25)', border: '2px solid #5DA832', color: '#7FD94A' }}>
              ⛏️ Minecraft Education Block Coding
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-pixel text-white mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', textShadow: '3px 3px 0 rgba(0,0,0,0.7), -1px -1px 0 rgba(0,0,0,0.5)' }}
          >
            DAO-YU-101
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-game text-white/90 mb-2 max-w-2xl"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', fontWeight: 800, textShadow: '2px 2px 0 rgba(0,0,0,0.6)' }}
          >
            {t('hero.title')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-game text-white/75 mb-10 max-w-xl"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}
          >
            {t('hero.subtitle')} — No coding experience needed!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/world">
              <button className="pixel-btn px-8 py-4 text-white font-bold"
                style={{ background: '#5DA832', borderColor: '#3d7a20', fontSize: '0.65rem' }}>
                🚀 {t('hero.cta')}
              </button>
            </Link>
            <Link href="/world">
              <button className="pixel-btn px-8 py-4 font-bold"
                style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.5)', color: 'white', fontSize: '0.65rem' }}>
                🗺️ {t('hero.cta2')}
              </button>
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-6 justify-center mt-14"
          >
            {STATS.map(stat => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{stat.icon}</span>
                <span className="font-pixel text-white" style={{ fontSize: '1.2rem', textShadow: '2px 2px 0 rgba(0,0,0,0.6)' }}>{stat.value}</span>
                <span className="font-game text-white/70 text-xs">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--background)" />
          </svg>
        </div>
      </section>

      {/* ── WORLD MAP PREVIEW ────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-pixel mb-3" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)', color: 'var(--foreground)' }}>
              THE PROGRAMMING ARCHIPELAGO
            </h2>
            <p className="font-game text-muted-foreground max-w-xl mx-auto">
              Navigate 10 unique islands, each packed with 15 lessons. Unlock them step by step as you master new coding skills!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-sm overflow-hidden pixel-border"
            style={{ borderColor: '#5DA832' }}
          >
            <img src={WORLD_IMG} alt="Programming Archipelago World Map" className="w-full" />
            <div className="absolute inset-0 flex items-end justify-center pb-6">
              <Link href="/world">
                <button className="pixel-btn px-6 py-3 text-white"
                  style={{ background: '#5DA832', borderColor: '#3d7a20', fontSize: '0.6rem' }}>
                  🗺️ EXPLORE THE MAP
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: 'var(--muted)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-pixel mb-3" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.2rem)', color: 'var(--foreground)' }}>
              WHY DAO-YU-101?
            </h2>
            <p className="font-game text-muted-foreground">Everything you need to learn coding through Minecraft adventures</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="pixel-card p-5"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-game font-bold mb-2" style={{ color: 'var(--foreground)', fontSize: '0.95rem' }}>{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-game">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS PREVIEW ─────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="font-pixel mb-4" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', color: 'var(--foreground)' }}>
              EARN BADGES & ACHIEVEMENTS
            </h2>
            <p className="font-game text-muted-foreground mb-6">
              Every lesson completed, every island conquered, every quiz aced — earns you XP, coins, and exclusive achievement badges. Show off your coding journey!
            </p>
            <div className="flex flex-wrap gap-3">
              {['⭐ First Step', '⚔️ Code Warrior', '💚 Loop Master', '🔴 Logic Wizard', '🔵 Island Conqueror', '👑 Champion'].map(badge => (
                <span key={badge} className="px-3 py-1.5 text-xs font-game rounded-sm"
                  style={{ background: 'var(--accent)', color: 'var(--accent-foreground)', border: '2px solid var(--border)' }}>
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 max-w-sm"
          >
            <img src={BADGE_IMG} alt="Achievement Badges" className="w-full rounded-sm pixel-border" style={{ borderColor: '#FFD700' }} />
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: 'var(--muted)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-pixel mb-3" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', color: 'var(--foreground)' }}>
              WHAT PLAYERS SAY
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="pixel-card p-5"
              >
                <div className="text-3xl mb-3">{t.avatar}</div>
                <p className="text-sm font-game text-muted-foreground mb-4 italic">"{t.text}"</p>
                <div>
                  <div className="font-game font-bold text-sm" style={{ color: 'var(--foreground)' }}>{t.name}</div>
                  <div className="text-xs text-muted-foreground font-game">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES SECTION ────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ background: 'var(--background)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-pixel mb-3" style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', color: 'var(--foreground)' }}>
              FOR EVERYONE
            </h2>
            <p className="font-game text-muted-foreground mb-8">Tailored dashboards and tools for every role in the learning journey</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: '🎒', role: 'Students', desc: 'Learn & explore islands' },
                { icon: '👨‍👩‍👧', role: 'Parents', desc: 'Track & purchase access' },
                { icon: '👩‍🏫', role: 'Teachers', desc: 'Manage & monitor classes' },
                { icon: '🏫', role: 'Schools', desc: 'Institution-wide analytics' },
                { icon: '⚙️', role: 'Admins', desc: 'Full platform control' },
              ].map(item => (
                <div key={item.role} className="pixel-card p-4 text-center w-36">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-game font-bold text-sm mb-1" style={{ color: 'var(--foreground)' }}>{item.role}</div>
                  <div className="text-xs text-muted-foreground font-game">{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1565C0 50%, #0D6E8A 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.1) 31px, rgba(255,255,255,0.1) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.1) 31px, rgba(255,255,255,0.1) 32px)' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="font-pixel text-white mb-4" style={{ fontSize: 'clamp(1rem, 3vw, 1.8rem)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
            READY TO EXPLORE?
          </h2>
          <p className="font-game text-white/80 mb-8 max-w-md mx-auto">
            Join thousands of young coders building amazing Minecraft projects. Your first island is free!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/world">
              <button className="pixel-btn px-8 py-4 text-white font-bold"
                style={{ background: '#5DA832', borderColor: '#3d7a20', fontSize: '0.65rem' }}>
                🚀 START FREE TODAY
              </button>
            </Link>
            <Link href="/shop">
              <button className="pixel-btn px-8 py-4 font-bold"
                style={{ background: 'rgba(255,215,0,0.2)', borderColor: '#FFD700', color: '#FFD700', fontSize: '0.65rem' }}>
                🛒 VIEW PLANS
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-8 px-4 text-center" style={{ background: 'var(--sidebar)', borderTop: '3px solid var(--sidebar-border)' }}>
        <div className="font-pixel text-sidebar-foreground/60" style={{ fontSize: '8px' }}>
          ⛏️ DAO-YU-101 © 2024 — LEARN · BUILD · CONQUER
        </div>
      </footer>
    </div>
  );
}
