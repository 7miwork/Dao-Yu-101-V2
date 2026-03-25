// Floating XP/Coin gain notification
import { usePlatform } from '@/contexts/PlatformContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function GainNotification() {
  const { showXPGain, showCoinGain } = usePlatform();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {showXPGain !== null && (
          <motion.div
            key="xp"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            className="flex items-center gap-2 px-4 py-2 rounded-sm font-pixel text-xs"
            style={{
              background: '#1a2e1a',
              border: '3px solid #5DA832',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.5)',
              color: '#7FD94A',
              textShadow: '1px 1px 0 rgba(0,0,0,0.5)'
            }}
          >
            ⚡ +{showXPGain} XP
          </motion.div>
        )}
        {showCoinGain !== null && (
          <motion.div
            key="coin"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.8 }}
            className="flex items-center gap-2 px-4 py-2 rounded-sm font-pixel text-xs"
            style={{
              background: '#2e2a1a',
              border: '3px solid #FFD700',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.5)',
              color: '#FFD700',
              textShadow: '1px 1px 0 rgba(0,0,0,0.5)'
            }}
          >
            🪙 +{showCoinGain} Coins
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
