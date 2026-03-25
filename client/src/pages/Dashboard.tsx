// Dao-Yu-101 Dashboard Page
// Role-based dashboards: Student, Parent, Teacher, Admin, School, Sales, Support

import { usePlatform } from '@/contexts/PlatformContext';
import { programmingIslands, achievements } from '@/lib/data';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Zap, BookOpen, Trophy, Flame, Clock, TrendingUp, Users, BarChart2, ShoppingCart, Settings, HelpCircle, Star, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// ── STUDENT DASHBOARD ──────────────────────────────────────────────────────
function StudentDashboard() {
  const { user } = usePlatform();
  const xpPercent = Math.min(100, (user.xp / user.xpToNextLevel) * 100);
  const completedIslands = programmingIslands.filter(i => user.completedIslands.includes(i.id));
  const unlockedIslands = programmingIslands.filter(i => user.xp >= i.xpRequired);
  const currentIsland = programmingIslands.find(i => i.id === user.currentIsland);
  const earnedBadges = achievements.filter(a => user.achievements.includes(a.id));

  const weeklyData = [
    { day: 'Mon', xp: 45, lessons: 2 },
    { day: 'Tue', xp: 80, lessons: 3 },
    { day: 'Wed', xp: 30, lessons: 1 },
    { day: 'Thu', xp: 120, lessons: 5 },
    { day: 'Fri', xp: 60, lessons: 2 },
    { day: 'Sat', xp: 90, lessons: 4 },
    { day: 'Sun', xp: 50, lessons: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome + Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Zap size={20} color="#5DA832" />, value: user.xp, label: 'Total XP', color: '#5DA832' },
          { icon: <span className="text-xl">🪙</span>, value: user.coins, label: 'Coins', color: '#FFD700' },
          { icon: <Flame size={20} color="#FF6B35" />, value: `${user.streak}d`, label: 'Streak', color: '#FF6B35' },
          { icon: <BookOpen size={20} color="#1565C0" />, value: user.completedLessons.length, label: 'Lessons Done', color: '#1565C0' },
        ].map(stat => (
          <div key={stat.label} className="pixel-card p-4 text-center">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <div className="font-pixel text-xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="font-game text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Level + XP Bar */}
      <div className="pixel-card p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-pixel" style={{ fontSize: '10px', color: 'var(--foreground)' }}>LEVEL {user.level}</span>
            <span className="font-game text-xs text-muted-foreground ml-3">{user.xp} / {user.xpToNextLevel} XP</span>
          </div>
          <span className="font-game text-xs text-muted-foreground">{Math.round(xpPercent)}% to Level {user.level + 1}</span>
        </div>
        <div className="xp-bar rounded-none">
          <div className="xp-bar-fill progress-shimmer" style={{ width: `${xpPercent}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Island */}
        <div className="pixel-card p-5">
          <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>CURRENT ISLAND</h3>
          {currentIsland ? (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-sm flex items-center justify-center text-2xl"
                  style={{ background: currentIsland.color, border: '2px solid rgba(0,0,0,0.2)' }}>
                  {currentIsland.icon}
                </div>
                <div>
                  <div className="font-game font-bold" style={{ color: 'var(--foreground)' }}>{currentIsland.name}</div>
                  <div className="text-xs text-muted-foreground font-game">Lesson {user.currentLesson} of 15</div>
                </div>
              </div>
              <div className="h-2 rounded-none mb-3" style={{ background: 'var(--muted)', border: '2px solid var(--border)' }}>
                <div className="h-full" style={{ width: `${(user.currentLesson / 15) * 100}%`, background: currentIsland.color }} />
              </div>
              <Link href={`/island/${currentIsland.id}`}>
                <button className="pixel-btn w-full py-2 text-white" style={{ background: currentIsland.color, borderColor: 'rgba(0,0,0,0.3)', fontSize: '0.55rem' }}>
                  CONTINUE LEARNING →
                </button>
              </Link>
            </div>
          ) : (
            <Link href="/world">
              <button className="pixel-btn w-full py-2 text-white" style={{ background: '#5DA832', borderColor: '#3d7a20', fontSize: '0.55rem' }}>
                START YOUR JOURNEY →
              </button>
            </Link>
          )}
        </div>

        {/* Weekly Activity */}
        <div className="pixel-card p-5">
          <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>WEEKLY XP</h3>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={weeklyData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fontFamily: 'Nunito' }} />
              <YAxis tick={{ fontSize: 10, fontFamily: 'Nunito' }} />
              <Tooltip contentStyle={{ fontFamily: 'Nunito', fontSize: 12, background: 'var(--card)', border: '2px solid var(--border)' }} />
              <Bar dataKey="xp" fill="#5DA832" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Achievements */}
      <div className="pixel-card p-5">
        <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>MY ACHIEVEMENTS ({earnedBadges.length}/{achievements.length})</h3>
        <div className="flex flex-wrap gap-3">
          {achievements.map(a => {
            const earned = user.achievements.includes(a.id);
            return (
              <div key={a.id} className="flex flex-col items-center gap-1 p-3 rounded-sm w-20 text-center"
                style={{
                  background: earned ? 'rgba(255,215,0,0.1)' : 'var(--muted)',
                  border: `2px solid ${earned ? '#FFD700' : 'var(--border)'}`,
                  filter: earned ? 'none' : 'grayscale(0.7) opacity(0.5)',
                }}>
                <span className="text-2xl">{a.icon}</span>
                <span className="font-game text-xs text-muted-foreground leading-tight">{a.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── PARENT DASHBOARD ───────────────────────────────────────────────────────
function ParentDashboard() {
  const { user } = usePlatform();
  const progressData = [
    { subject: 'Programming', progress: 35, color: '#5DA832' },
    { subject: 'Math', progress: 0, color: '#1565C0' },
    { subject: 'Science', progress: 0, color: '#E65100' },
  ];

  return (
    <div className="space-y-6">
      <div className="pixel-card p-5" style={{ background: 'linear-gradient(135deg, rgba(93,168,50,0.1) 0%, transparent 100%)' }}>
        <h3 className="font-pixel mb-2" style={{ fontSize: '9px', color: 'var(--foreground)' }}>CHILD: {user.name.toUpperCase()}</h3>
        <div className="flex flex-wrap gap-4">
          <div className="font-game text-sm"><span className="text-muted-foreground">Level:</span> <strong style={{ color: '#5DA832' }}>{user.level}</strong></div>
          <div className="font-game text-sm"><span className="text-muted-foreground">XP:</span> <strong style={{ color: '#5DA832' }}>{user.xp}</strong></div>
          <div className="font-game text-sm"><span className="text-muted-foreground">Streak:</span> <strong style={{ color: '#FF6B35' }}>{user.streak} days 🔥</strong></div>
          <div className="font-game text-sm"><span className="text-muted-foreground">Lessons:</span> <strong style={{ color: '#1565C0' }}>{user.completedLessons.length}</strong></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="pixel-card p-5">
          <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>SUBJECT PROGRESS</h3>
          {progressData.map(s => (
            <div key={s.subject} className="mb-3">
              <div className="flex justify-between text-xs font-game text-muted-foreground mb-1">
                <span>{s.subject}</span><span>{s.progress}%</span>
              </div>
              <div className="h-3 rounded-none" style={{ background: 'var(--muted)', border: '2px solid var(--border)' }}>
                <div className="h-full" style={{ width: `${s.progress}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="pixel-card p-5">
          <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>RECENT ACTIVITY</h3>
          <div className="space-y-2">
            {[
              { action: 'Completed Lesson 7', time: '2 hours ago', xp: '+30 XP' },
              { action: 'Earned "Code Warrior" badge', time: 'Yesterday', xp: '+100 XP' },
              { action: 'Completed Quiz (100%)', time: '2 days ago', xp: '+15 XP' },
              { action: 'Started Island 1', time: '5 days ago', xp: '+20 XP' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0 font-game text-xs"
                style={{ borderColor: 'var(--border)' }}>
                <div>
                  <div style={{ color: 'var(--foreground)' }}>{item.action}</div>
                  <div className="text-muted-foreground">{item.time}</div>
                </div>
                <span className="text-green-500 font-bold">{item.xp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pixel-card p-5">
        <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>SUBSCRIPTION & SHOP</h3>
        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2 rounded-sm font-game text-sm" style={{ background: 'rgba(93,168,50,0.15)', border: '2px solid #5DA832', color: '#5DA832' }}>
            ✓ Programming Archipelago — Active
          </div>
          <Link href="/shop">
            <button className="pixel-btn px-4 py-2 text-white" style={{ background: '#1565C0', borderColor: 'rgba(0,0,0,0.3)', fontSize: '0.55rem' }}>
              🛒 EXPLORE MORE COURSES
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── TEACHER DASHBOARD ──────────────────────────────────────────────────────
function TeacherDashboard() {
  const classData = [
    { name: 'Alex C.', level: 3, xp: 720, lessons: 7, streak: 5 },
    { name: 'Emma W.', level: 5, xp: 1450, lessons: 22, streak: 12 },
    { name: 'Luca M.', level: 2, xp: 380, lessons: 4, streak: 2 },
    { name: 'Sophie K.', level: 4, xp: 980, lessons: 15, streak: 8 },
    { name: 'Noah B.', level: 1, xp: 120, lessons: 1, streak: 1 },
  ];

  const islandProgress = programmingIslands.slice(0, 5).map(i => ({
    name: i.name.split(' ')[0],
    students: Math.floor(Math.random() * 5) + 1,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Users size={20} />, value: 5, label: 'Students', color: '#1565C0' },
          { icon: <BookOpen size={20} />, value: 49, label: 'Lessons Done', color: '#5DA832' },
          { icon: <TrendingUp size={20} />, value: '3.0', label: 'Avg Level', color: '#FFD700' },
          { icon: <Flame size={20} />, value: '5.6d', label: 'Avg Streak', color: '#FF6B35' },
        ].map(stat => (
          <div key={stat.label} className="pixel-card p-4 text-center">
            <div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="font-pixel text-xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="font-game text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="pixel-card p-5 overflow-x-auto">
        <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>CLASS ROSTER</h3>
        <table className="w-full text-sm font-game min-w-[500px]">
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Student', 'Level', 'XP', 'Lessons', 'Streak', 'Status'].map(h => (
                <th key={h} className="text-left py-2 px-2 text-xs text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classData.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="py-2 px-2 font-bold" style={{ color: 'var(--foreground)' }}>{s.name}</td>
                <td className="py-2 px-2"><span className="px-2 py-0.5 rounded-sm text-xs" style={{ background: 'rgba(93,168,50,0.15)', color: '#5DA832', border: '1px solid #5DA832' }}>LV{s.level}</span></td>
                <td className="py-2 px-2 text-yellow-500">{s.xp}</td>
                <td className="py-2 px-2 text-muted-foreground">{s.lessons}/150</td>
                <td className="py-2 px-2" style={{ color: '#FF6B35' }}>{s.streak}🔥</td>
                <td className="py-2 px-2">
                  <span className={`px-2 py-0.5 rounded-sm text-xs ${s.streak > 5 ? 'text-green-500' : s.streak > 2 ? 'text-yellow-500' : 'text-red-500'}`}
                    style={{ background: s.streak > 5 ? 'rgba(93,168,50,0.15)' : s.streak > 2 ? 'rgba(255,215,0,0.15)' : 'rgba(229,57,53,0.15)', border: '1px solid currentColor' }}>
                    {s.streak > 5 ? 'Active' : s.streak > 2 ? 'Good' : 'Needs Help'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pixel-card p-5">
        <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>ISLAND COMPLETION BY CLASS</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={islandProgress} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'Nunito' }} />
            <YAxis tick={{ fontSize: 10, fontFamily: 'Nunito' }} domain={[0, 5]} />
            <Tooltip contentStyle={{ fontFamily: 'Nunito', fontSize: 12, background: 'var(--card)', border: '2px solid var(--border)' }} />
            <Bar dataKey="students" fill="#1565C0" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── ADMIN DASHBOARD ────────────────────────────────────────────────────────
function AdminDashboard() {
  const platformStats = [
    { name: 'Jan', users: 120, revenue: 2400 },
    { name: 'Feb', users: 180, revenue: 3600 },
    { name: 'Mar', users: 250, revenue: 5000 },
    { name: 'Apr', users: 310, revenue: 6200 },
    { name: 'May', users: 420, revenue: 8400 },
    { name: 'Jun', users: 580, revenue: 11600 },
  ];

  const roleDistribution = [
    { name: 'Students', value: 450, color: '#5DA832' },
    { name: 'Parents', value: 180, color: '#1565C0' },
    { name: 'Teachers', value: 45, color: '#FFD700' },
    { name: 'Schools', value: 12, color: '#FF6B35' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Users size={20} />, value: '687', label: 'Total Users', color: '#5DA832' },
          { icon: <ShoppingCart size={20} />, value: '$11.6K', label: 'Monthly Revenue', color: '#FFD700' },
          { icon: <BookOpen size={20} />, value: '12,450', label: 'Lessons Completed', color: '#1565C0' },
          { icon: <TrendingUp size={20} />, value: '+38%', label: 'Growth (MoM)', color: '#FF6B35' },
        ].map(stat => (
          <div key={stat.label} className="pixel-card p-4 text-center">
            <div className="flex justify-center mb-2" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="font-pixel text-xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="font-game text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="pixel-card p-5">
          <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>USER GROWTH & REVENUE</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={platformStats} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: 'Nunito' }} />
              <YAxis tick={{ fontSize: 10, fontFamily: 'Nunito' }} />
              <Tooltip contentStyle={{ fontFamily: 'Nunito', fontSize: 12, background: 'var(--card)', border: '2px solid var(--border)' }} />
              <Line type="monotone" dataKey="users" stroke="#5DA832" strokeWidth={2} dot={{ r: 3, fill: '#5DA832' }} />
              <Line type="monotone" dataKey="revenue" stroke="#FFD700" strokeWidth={2} dot={{ r: 3, fill: '#FFD700' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="pixel-card p-5">
          <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>USER DISTRIBUTION</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie data={roleDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                  {roleDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {roleDistribution.map(r => (
                <div key={r.name} className="flex items-center gap-2 text-xs font-game">
                  <div className="w-3 h-3 rounded-sm" style={{ background: r.color }} />
                  <span className="text-muted-foreground">{r.name}:</span>
                  <span style={{ color: 'var(--foreground)' }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pixel-card p-5">
        <h3 className="font-pixel mb-4" style={{ fontSize: '9px', color: 'var(--foreground)' }}>QUICK ACTIONS</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Manage Users', icon: <Users size={14} />, color: '#1565C0' },
            { label: 'Content Editor', icon: <BookOpen size={14} />, color: '#5DA832' },
            { label: 'Analytics', icon: <BarChart2 size={14} />, color: '#FFD700' },
            { label: 'System Settings', icon: <Settings size={14} />, color: '#6A1B9A' },
          ].map(action => (
            <button key={action.label} className="pixel-btn px-4 py-2 flex items-center gap-2"
              style={{ background: `${action.color}20`, borderColor: action.color, color: action.color, fontSize: '0.55rem' }}
              onClick={() => {}}>
              {action.icon} {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── GENERIC DASHBOARDS ─────────────────────────────────────────────────────
function GenericDashboard({ role }: { role: string }) {
  const configs: Record<string, { icon: string; color: string; items: string[] }> = {
    school: { icon: '🏫', color: '#6A1B9A', items: ['Manage Teachers', 'View Student Analytics', 'Bulk Enrollment', 'School Reports', 'License Management'] },
    sales: { icon: '💼', color: '#E65100', items: ['Lead Pipeline', 'Revenue Dashboard', 'School Proposals', 'Subscription Plans', 'Commission Tracker'] },
    support: { icon: '🛠️', color: '#00695C', items: ['Open Tickets', 'User Lookup', 'Bug Reports', 'Knowledge Base', 'System Status'] },
  };
  const config = configs[role] || { icon: '👤', color: '#5DA832', items: ['Dashboard', 'Settings', 'Help'] };

  return (
    <div className="space-y-6">
      <div className="pixel-card p-8 text-center">
        <div className="text-5xl mb-4">{config.icon}</div>
        <h2 className="font-pixel mb-3" style={{ fontSize: '12px', color: 'var(--foreground)' }}>
          {role.toUpperCase()} DASHBOARD
        </h2>
        <p className="font-game text-muted-foreground mb-6">
          Welcome to your {role} control panel. Use the tools below to manage your responsibilities.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {config.items.map(item => (
            <button key={item} className="pixel-btn px-4 py-2"
              style={{ background: `${config.color}20`, borderColor: config.color, color: config.color, fontSize: '0.55rem' }}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user, currentRole, t } = usePlatform();

  const roleLabels: Record<string, string> = {
    student: '🎒 Student Dashboard',
    parent: '👨‍👩‍👧 Parent Dashboard',
    teacher: '👩‍🏫 Teacher Dashboard',
    admin: '⚙️ Admin Dashboard',
    school: '🏫 School Dashboard',
    sales: '💼 Sales Dashboard',
    support: '🛠️ Support Dashboard',
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="px-4 py-5" style={{ background: 'var(--sidebar)', borderBottom: '3px solid var(--sidebar-border)' }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="font-pixel text-sidebar-foreground" style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}>
            {roleLabels[currentRole] || '📊 Dashboard'}
          </h1>
          <p className="font-game text-sidebar-foreground/60 text-xs mt-1">
            Welcome back, {user.name}! {currentRole === 'student' ? `You're on a ${user.streak}-day streak! 🔥` : 'Here\'s your overview.'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <motion.div
          key={currentRole}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentRole === 'student' && <StudentDashboard />}
          {currentRole === 'parent' && <ParentDashboard />}
          {currentRole === 'teacher' && <TeacherDashboard />}
          {currentRole === 'admin' && <AdminDashboard />}
          {(currentRole === 'school' || currentRole === 'sales' || currentRole === 'support') && <GenericDashboard role={currentRole} />}
        </motion.div>
      </div>
    </div>
  );
}
