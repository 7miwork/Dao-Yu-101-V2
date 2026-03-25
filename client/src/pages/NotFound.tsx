// Dao-Yu-101 404 Page — Pixel Art Style
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4" style={{ background: 'var(--background)' }}>
      <div className="text-center">
        <div className="text-7xl mb-6 animate-float">🌊</div>
        <h1 className="font-pixel mb-3" style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', color: 'var(--foreground)', textShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}>
          404
        </h1>
        <h2 className="font-pixel mb-4" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.9rem)', color: 'var(--muted-foreground)' }}>
          ISLAND NOT FOUND
        </h2>
        <p className="font-game text-muted-foreground mb-8 max-w-sm mx-auto">
          This island has sunk beneath the waves! The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <button className="pixel-btn px-6 py-3 text-white"
            style={{ background: '#5DA832', borderColor: '#3d7a20', fontSize: '0.6rem' }}>
            🏠 RETURN HOME
          </button>
        </Link>
      </div>
    </div>
  );
}
