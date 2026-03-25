// Dao-Yu-101 Navbar
// Design: Pixel Archipelago — Game HUD top bar with XP, coins, level, theme/lang switchers

import { Link, useLocation } from 'wouter';
import { usePlatform } from '@/contexts/PlatformContext';
import { useState } from 'react';
import { Menu, X, Globe, Palette, ChevronDown, Zap, Coins, Flame } from 'lucide-react';
import type { Theme, Language, UserRole } from '@/lib/data';

const NAV_LINKS = [
  { href: '/', label: 'nav.home', icon: '🏠' },
  { href: '/world', label: 'nav.world', icon: '🗺️' },
  { href: '/dashboard', label: 'nav.dashboard', icon: '📊' },
  { href: '/shop', label: 'nav.shop', icon: '🛒' },
  { href: '/achievements', label: 'nav.achievements', icon: '🏆' },
];

const THEMES: { value: Theme; label: string; icon: string }[] = [
  { value: 'island', label: 'theme.island', icon: '🏝️' },
  { value: 'minecraft', label: 'theme.minecraft', icon: '⛏️' },
  { value: 'modern', label: 'theme.modern', icon: '✨' },
];

const LANGUAGES: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'ar', label: 'العربية', flag: '🇸🇦' },
];

const ROLES: { value: UserRole; label: string; icon: string }[] = [
  { value: 'student', label: 'Student', icon: '🎒' },
  { value: 'parent', label: 'Parent', icon: '👨‍👩‍👧' },
  { value: 'teacher', label: 'Teacher', icon: '👩‍🏫' },
  { value: 'admin', label: 'Admin', icon: '⚙️' },
  { value: 'school', label: 'School', icon: '🏫' },
  { value: 'sales', label: 'Sales', icon: '💼' },
  { value: 'support', label: 'Support', icon: '🛠️' },
];

export default function Navbar() {
  const { t, user, theme, setTheme, language, setLanguage, currentRole, setCurrentRole } = usePlatform();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const xpPercent = Math.min(100, (user.xp / user.xpToNextLevel) * 100);
  const currentLang = LANGUAGES.find(l => l.value === language);
  const currentRoleData = ROLES.find(r => r.value === currentRole);

  return (
    <nav className="sticky top-0 z-50 w-full" style={{ background: 'var(--sidebar)', borderBottom: '3px solid var(--sidebar-border)' }}>
      <div className="max-w-[1400px] mx-auto px-3 flex items-center gap-2 h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 mr-2">
          <div className="w-8 h-8 flex items-center justify-center text-lg" style={{ imageRendering: 'pixelated' }}>⛏️</div>
          <span className="font-pixel text-[10px] leading-tight hidden sm:block" style={{ color: 'var(--sidebar-primary)', textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
            DAO-YU<br />101
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 flex-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-game transition-all rounded-sm
                ${location === link.href
                  ? 'text-white font-bold'
                  : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
                }`}
              style={location === link.href ? {
                background: 'var(--sidebar-primary)',
                boxShadow: '2px 2px 0 rgba(0,0,0,0.4)'
              } : {}}
            >
              <span>{link.icon}</span>
              <span>{t(link.label)}</span>
            </Link>
          ))}
        </div>

        {/* HUD Stats */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {/* Streak */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-sm text-xs font-game" style={{ background: 'rgba(255,107,53,0.2)', border: '2px solid #FF6B35' }}>
            <Flame size={12} className="text-orange-400" />
            <span className="text-orange-300 font-bold">{user.streak}</span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-sm text-xs font-game" style={{ background: 'rgba(255,215,0,0.15)', border: '2px solid #FFD700' }}>
            <span className="text-yellow-400">🪙</span>
            <span className="text-yellow-300 font-bold">{user.coins}</span>
          </div>

          {/* Level + XP */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-sm" style={{ background: 'rgba(93,168,50,0.15)', border: '2px solid #5DA832' }}>
            <div className="flex items-center gap-1">
              <Zap size={12} className="text-green-400" />
              <span className="text-xs font-pixel text-green-300" style={{ fontSize: '8px' }}>LV{user.level}</span>
            </div>
            <div className="w-16 xp-bar rounded-none">
              <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
            </div>
            <span className="text-xs text-green-400 font-game" style={{ fontSize: '10px' }}>{user.xp}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 ml-2">
          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => { setRoleOpen(!roleOpen); setThemeOpen(false); setLangOpen(false); }}
              className="flex items-center gap-1 px-2 py-1.5 text-xs font-game rounded-sm transition-all"
              style={{ background: 'var(--sidebar-accent)', border: '2px solid var(--sidebar-border)', color: 'var(--sidebar-foreground)' }}
            >
              <span>{currentRoleData?.icon}</span>
              <span className="hidden sm:inline">{currentRoleData?.label}</span>
              <ChevronDown size={10} />
            </button>
            {roleOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 z-50 rounded-sm overflow-hidden" style={{ background: 'var(--sidebar)', border: '2px solid var(--sidebar-border)', boxShadow: '4px 4px 0 rgba(0,0,0,0.4)' }}>
                {ROLES.map(role => (
                  <button
                    key={role.value}
                    onClick={() => { setCurrentRole(role.value); setRoleOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-game text-left transition-colors
                      ${currentRole === role.value ? 'text-white' : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'}`}
                    style={currentRole === role.value ? { background: 'var(--sidebar-primary)' } : { background: 'transparent' }}
                  >
                    <span>{role.icon}</span>
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Switcher */}
          <div className="relative">
            <button
              onClick={() => { setThemeOpen(!themeOpen); setLangOpen(false); setRoleOpen(false); }}
              className="flex items-center gap-1 px-2 py-1.5 text-xs rounded-sm transition-all"
              style={{ background: 'var(--sidebar-accent)', border: '2px solid var(--sidebar-border)', color: 'var(--sidebar-foreground)' }}
              title="Switch Theme"
            >
              <Palette size={14} />
            </button>
            {themeOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 z-50 rounded-sm overflow-hidden" style={{ background: 'var(--sidebar)', border: '2px solid var(--sidebar-border)', boxShadow: '4px 4px 0 rgba(0,0,0,0.4)' }}>
                {THEMES.map(th => (
                  <button
                    key={th.value}
                    onClick={() => { setTheme(th.value); setThemeOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-game text-left transition-colors
                      ${theme === th.value ? 'text-white' : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'}`}
                    style={theme === th.value ? { background: 'var(--sidebar-primary)' } : { background: 'transparent' }}
                  >
                    <span>{th.icon}</span>
                    <span>{t(th.label)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => { setLangOpen(!langOpen); setThemeOpen(false); setRoleOpen(false); }}
              className="flex items-center gap-1 px-2 py-1.5 text-xs rounded-sm transition-all"
              style={{ background: 'var(--sidebar-accent)', border: '2px solid var(--sidebar-border)', color: 'var(--sidebar-foreground)' }}
              title="Switch Language"
            >
              <Globe size={14} />
              <span className="hidden sm:inline">{currentLang?.flag}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 z-50 rounded-sm overflow-hidden" style={{ background: 'var(--sidebar)', border: '2px solid var(--sidebar-border)', boxShadow: '4px 4px 0 rgba(0,0,0,0.4)' }}>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.value}
                    onClick={() => { setLanguage(lang.value); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-game text-left transition-colors
                      ${language === lang.value ? 'text-white' : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'}`}
                    style={language === lang.value ? { background: 'var(--sidebar-primary)' } : { background: 'transparent' }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 rounded-sm"
            style={{ background: 'var(--sidebar-accent)', border: '2px solid var(--sidebar-border)', color: 'var(--sidebar-foreground)' }}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ borderColor: 'var(--sidebar-border)', background: 'var(--sidebar)' }}>
          {/* Mobile HUD */}
          <div className="flex items-center gap-3 px-4 py-2 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
            <div className="flex items-center gap-1 text-xs font-game" style={{ color: '#FF6B35' }}>
              <Flame size={12} /> <span>{user.streak} days</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-game text-yellow-400">
              🪙 {user.coins}
            </div>
            <div className="flex items-center gap-1 text-xs font-game text-green-400">
              <Zap size={12} /> LV{user.level} · {user.xp} XP
            </div>
          </div>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-game border-b transition-colors
                ${location === link.href ? 'text-white' : 'text-sidebar-foreground/80'}`}
              style={{
                borderColor: 'var(--sidebar-border)',
                background: location === link.href ? 'var(--sidebar-primary)' : 'transparent'
              }}
            >
              <span className="text-base">{link.icon}</span>
              <span>{t(link.label)}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {(themeOpen || langOpen || roleOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setThemeOpen(false); setLangOpen(false); setRoleOpen(false); }} />
      )}
    </nav>
  );
}
