// Dao-Yu-101 Shop Page
// Parents can purchase: Programming Archipelago, Bundles, Subscriptions
// Students can purchase: Avatars, Themes with coins

import { usePlatform } from '@/contexts/PlatformContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, Star, Zap, ShoppingCart, Lock, Crown, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const SHOP_STORAGE_KEY = 'dao-yu-101-shop';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  icon: string;
  color: string;
  features: string[];
  badge?: string;
  type: 'archipelago' | 'bundle' | 'subscription';
  popular?: boolean;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'programming-archipelago',
    name: 'Programming Archipelago',
    description: 'Full access to all 10 islands and 150 lessons of Minecraft Education Block Coding',
    price: 29.99,
    icon: '⛏️',
    color: '#5DA832',
    type: 'archipelago',
    features: [
      '10 Islands × 15 Lessons = 150 Lessons',
      'Full Minecraft Education integration',
      'XP, Coins & Achievement system',
      'Progress tracking & certificates',
      'Parent dashboard access',
      'Lifetime access',
    ],
  },
  {
    id: 'starter-bundle',
    name: 'Starter Bundle',
    description: 'Programming + Math Archipelago — perfect for beginners',
    price: 49.99,
    originalPrice: 59.98,
    icon: '🎒',
    color: '#1565C0',
    type: 'bundle',
    badge: 'SAVE 17%',
    features: [
      'Programming Archipelago (150 lessons)',
      'Math Archipelago — Coming Soon',
      'All gamification features',
      'Parent + Teacher dashboards',
      'Priority support',
      'Lifetime access',
    ],
  },
  {
    id: 'explorer-bundle',
    name: 'Explorer Bundle',
    description: 'All 5 Archipelagos — the complete Dao-Yu-101 experience',
    price: 89.99,
    originalPrice: 149.95,
    icon: '🌍',
    color: '#6A1B9A',
    type: 'bundle',
    badge: 'BEST VALUE',
    popular: true,
    features: [
      'All 5 Archipelagos (750+ lessons)',
      'Programming, Math, Science, History, Art',
      'Full gamification suite',
      'All role dashboards',
      'School & class management',
      'Certificates & badges',
      'Lifetime access',
    ],
  },
  {
    id: 'monthly-sub',
    name: 'Monthly Access',
    description: 'Access all available content for one month — cancel anytime',
    price: 9.99,
    icon: '📅',
    color: '#E65100',
    type: 'subscription',
    features: [
      'All currently available archipelagos',
      'New content as it launches',
      'All gamification features',
      'Cancel anytime',
      'Family sharing (up to 3 kids)',
    ],
  },
  {
    id: 'yearly-sub',
    name: 'Annual Access',
    description: 'Full year of unlimited learning — best for committed learners',
    price: 79.99,
    originalPrice: 119.88,
    icon: '🏆',
    color: '#B71C1C',
    type: 'subscription',
    badge: 'SAVE 33%',
    features: [
      'All currently available archipelagos',
      'New content as it launches',
      'All gamification features',
      'Priority support',
      'Family sharing (up to 5 kids)',
      'Exclusive annual subscriber badge',
    ],
  },
  {
    id: 'school-license',
    name: 'School License',
    description: 'For schools and educational institutions — bulk pricing available',
    price: 299.99,
    icon: '🏫',
    color: '#00695C',
    type: 'subscription',
    badge: 'SCHOOLS',
    features: [
      'Up to 30 student accounts',
      'Teacher management dashboard',
      'School-wide analytics',
      'Custom branding options',
      'Dedicated support',
      'Annual license',
    ],
  },
];

// Coin-based items for students
interface CoinItem {
  id: string;
  name: string;
  description: string;
  price: number; // in coins
  icon: string;
  color: string;
  type: 'avatar' | 'theme';
}

const COIN_ITEMS: CoinItem[] = [
  // Avatars
  { id: 'avatar-knight', name: 'Knight Avatar', description: 'Brave knight ready for coding adventures!', price: 50, icon: '⚔️', color: '#C0C0C0', type: 'avatar' },
  { id: 'avatar-wizard', name: 'Wizard Avatar', description: 'Magical coder with powerful spells!', price: 75, icon: '🧙', color: '#6A1B9A', type: 'avatar' },
  { id: 'avatar-dragon', name: 'Dragon Avatar', description: 'Fierce dragon that breathes code!', price: 100, icon: '🐉', color: '#B71C1C', type: 'avatar' },
  { id: 'avatar-robot', name: 'Robot Avatar', description: 'Mechanical genius of the archipelago!', price: 100, icon: '🤖', color: '#455A64', type: 'avatar' },
  { id: 'avatar-ninja', name: 'Ninja Avatar', description: 'Silent coder strikes with precision!', price: 125, icon: '🥷', color: '#1a1a1a', type: 'avatar' },
  { id: 'avatar-unicorn', name: 'Unicorn Avatar', description: 'Magical unicorn of coding dreams!', price: 150, icon: '🦄', color: '#E91E63', type: 'avatar' },
  // Themes
  { id: 'theme-ocean', name: 'Ocean Theme', description: 'Deep blue sea vibes for your dashboard!', price: 30, icon: '🌊', color: '#0277BD', type: 'theme' },
  { id: 'theme-forest', name: 'Forest Theme', description: 'Green woodland atmosphere!', price: 30, icon: '🌲', color: '#2E7D32', type: 'theme' },
  { id: 'theme-sunset', name: 'Sunset Theme', description: 'Warm orange and pink gradients!', price: 30, icon: '🌅', color: '#E65100', type: 'theme' },
  { id: 'theme-galaxy', name: 'Galaxy Theme', description: 'Explore the cosmos while coding!', price: 50, icon: '🌌', color: '#311B92', type: 'theme' },
  { id: 'theme-lava', name: 'Lava Theme', description: 'Hot molten rock style!', price: 50, icon: '🌋', color: '#BF360C', type: 'theme' },
  { id: 'theme-ice', name: 'Ice Theme', description: 'Cool frozen aesthetic!', price: 50, icon: '❄️', color: '#00ACC1', type: 'theme' },
];

const TYPE_FILTERS = [
  { value: 'all', label: 'All Products' },
  { value: 'archipelago', label: '🏝️ Archipelagos' },
  { value: 'bundle', label: '📦 Bundles' },
  { value: 'subscription', label: '🔄 Subscriptions' },
  { value: 'avatar', label: '👤 Avatars' },
  { value: 'theme', label: '🎨 Themes' },
];

export default function ShopPage() {
  const { user, setUser, t } = usePlatform();
  const [filter, setFilter] = useState<string>('all');
  const [purchased, setPurchased] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(SHOP_STORAGE_KEY) || '["programming-archipelago"]');
    } catch {
      return ['programming-archipelago'];
    }
  });

  // Save purchased items to localStorage
  useEffect(() => {
    localStorage.setItem(SHOP_STORAGE_KEY, JSON.stringify(purchased));
  }, [purchased]);

  // Determine which items to show based on filter
  const getFilteredItems = () => {
    if (filter === 'all') {
      return [...SHOP_ITEMS, ...COIN_ITEMS];
    }
    if (filter === 'avatar' || filter === 'theme') {
      return COIN_ITEMS.filter(i => i.type === filter);
    }
    return SHOP_ITEMS.filter(i => i.type === filter);
  };

  const filtered = getFilteredItems();

  const handlePurchase = (item: ShopItem | CoinItem) => {
    if (purchased.includes(item.id)) {
      toast.info(`You already own ${item.name}!`);
      return;
    }

    // Check if it's a coin item
    const isCoinItem = 'type' in item && (item.type === 'avatar' || item.type === 'theme');
    
    if (isCoinItem) {
      const coinItem = item as CoinItem;
      if (user.coins < coinItem.price) {
        toast.error(`Not enough coins! You need ${coinItem.price} coins but have ${user.coins}.`);
        return;
      }
      // Deduct coins
      setUser(prev => ({ ...prev, coins: prev.coins - coinItem.price }));
      toast.success(`🎉 ${coinItem.name} purchased with ${coinItem.price} coins!`, {
        description: 'Check your profile to equip it!',
      });
    } else {
      toast.success(`🎉 ${item.name} purchased! Start learning now.`, {
        description: 'Demo mode — no real payment processed.',
      });
    }
    
    setPurchased(prev => [...prev, item.id]);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="relative overflow-hidden px-4 py-10"
        style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1565C0 60%, #0D6E8A 100%)', borderBottom: '3px solid var(--border)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.1) 31px, rgba(255,255,255,0.1) 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(255,255,255,0.1) 31px, rgba(255,255,255,0.1) 32px)' }} />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="font-pixel text-white mb-2" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.5rem)', textShadow: '3px 3px 0 rgba(0,0,0,0.5)' }}>
            🛒 {t('shop.title').toUpperCase()}
          </h1>
          <p className="font-game text-white/75 mb-4">Unlock new worlds of learning for your child</p>
          <div className="flex items-center justify-center gap-2 text-sm font-game">
            <div className="px-3 py-1.5 rounded-sm" style={{ background: 'rgba(255,215,0,0.2)', border: '2px solid #FFD700', color: '#FFD700' }}>
              🪙 Your balance: {user.coins} coins
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TYPE_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="px-4 py-2 text-xs font-game rounded-sm transition-all"
              style={{
                background: filter === f.value ? 'var(--primary)' : 'var(--muted)',
                border: `2px solid ${filter === f.value ? 'var(--primary)' : 'var(--border)'}`,
                color: filter === f.value ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                boxShadow: filter === f.value ? '2px 2px 0 rgba(0,0,0,0.3)' : 'none',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => {
            const owned = purchased.includes(item.id);
            const isCoinItem = 'type' in item && (item.type === 'avatar' || item.type === 'theme');
            const shopItem = !isCoinItem ? item as ShopItem : null;
            const coinItem = isCoinItem ? item as CoinItem : null;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="relative flex flex-col rounded-sm overflow-hidden"
                style={{
                  border: `3px solid ${shopItem?.popular ? item.color : owned ? '#5DA832' : 'var(--border)'}`,
                  boxShadow: shopItem?.popular ? `0 0 20px ${item.color}40, 4px 4px 0 rgba(0,0,0,0.2)` : '4px 4px 0 rgba(0,0,0,0.15)',
                  background: 'var(--card)',
                }}
              >
                {/* Badge */}
                {(shopItem?.badge || shopItem?.popular || owned) && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2 py-1 font-pixel text-white rounded-sm"
                      style={{
                        fontSize: '7px',
                        background: owned ? '#5DA832' : shopItem?.popular ? item.color : '#FFD700',
                        border: '2px solid rgba(0,0,0,0.2)',
                        boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
                        color: owned ? 'white' : shopItem?.popular ? 'white' : '#1a1a1a',
                      }}>
                      {owned ? '✓ OWNED' : shopItem?.badge || (shopItem?.popular ? '⭐ POPULAR' : '')}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="p-5" style={{ background: `${item.color}15`, borderBottom: `2px solid ${item.color}30` }}>
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h3 className="font-game font-bold text-lg mb-1" style={{ color: item.color }}>{item.name}</h3>
                  <p className="font-game text-sm text-muted-foreground">{item.description}</p>
                </div>

                {/* Features (only for ShopItems) */}
                {shopItem && (
                  <div className="p-5 flex-1">
                    <ul className="space-y-2 mb-5">
                      {shopItem.features.map((f: string) => (
                        <li key={f} className="flex items-start gap-2 text-sm font-game">
                          <Check size={14} className="mt-0.5 shrink-0" style={{ color: item.color }} />
                          <span style={{ color: 'var(--foreground)' }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Price + CTA */}
                <div className="p-5 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-end gap-2 mb-3">
                    {coinItem ? (
                      <span className="font-pixel" style={{ fontSize: '1.4rem', color: item.color }}>🪙 {coinItem.price}</span>
                    ) : (
                      <>
                        <span className="font-pixel" style={{ fontSize: '1.4rem', color: item.color }}>${shopItem?.price}</span>
                        {shopItem?.originalPrice && (
                          <span className="font-game text-sm text-muted-foreground line-through">${shopItem.originalPrice}</span>
                        )}
                        {shopItem?.type === 'subscription' && (
                          <span className="font-game text-xs text-muted-foreground">/{item.id.includes('monthly') ? 'mo' : item.id.includes('yearly') ? 'yr' : 'yr'}</span>
                        )}
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => handlePurchase(item)}
                    className="pixel-btn w-full py-3 flex items-center justify-center gap-2"
                    style={{
                      background: owned ? 'var(--muted)' : item.color,
                      borderColor: owned ? 'var(--border)' : 'rgba(0,0,0,0.3)',
                      color: owned ? 'var(--muted-foreground)' : 'white',
                      fontSize: '0.6rem',
                    }}
                  >
                    {owned ? (
                      <><Check size={14} /> OWNED</>
                    ) : coinItem ? (
                      <><Sparkles size={14} /> BUY WITH COINS</>
                    ) : (
                      <><ShoppingCart size={14} /> {t('shop.buy').toUpperCase()}</>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info banner */}
        <div className="mt-8 p-5 rounded-sm text-center" style={{ background: 'var(--muted)', border: '2px solid var(--border)' }}>
          <p className="font-game text-sm text-muted-foreground">
            🔒 <strong style={{ color: 'var(--foreground)' }}>Secure payments</strong> — All purchases are protected. 
            30-day money-back guarantee. Need a school license? <a href="#" className="underline" style={{ color: 'var(--primary)' }}>Contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
