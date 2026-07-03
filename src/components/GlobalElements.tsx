import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const GrainOverlay = () => (
  <div className="grain-overlay">
    <svg width="100%" height="100%">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </div>
);

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const move = (e: MouseEvent) => {
      if (outerRef.current) {
        outerRef.current.style.left = e.clientX + 'px';
        outerRef.current.style.top = e.clientY + 'px';
      }
      if (innerRef.current) {
        innerRef.current.style.left = e.clientX + 'px';
        innerRef.current.style.top = e.clientY + 'px';
      }
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [role="button"], input, textarea, .interactive')) {
        setExpanded(true);
      }
    };
    const out = () => setExpanded(false);

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div ref={outerRef} className={`cursor-outer ${expanded ? 'expanded' : ''}`} />
      <div ref={innerRef} className={`cursor-inner ${expanded ? 'hidden' : ''}`} />
    </>
  );
};

const ScrollProgress = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const update = () => {
      if (ref.current) {
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        ref.current.style.width = pct + '%';
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <div ref={ref} className="scroll-progress" />;
};

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/history', label: 'History' },
    { to: '/team', label: 'Team' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`nav-fixed flex items-center justify-between ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="font-mono text-xl font-bold interactive">
        <span className="text-orange">{"{"}i{"}"}</span>
        <span className="text-primary-text">spin</span>
      </Link>
      <div className="flex gap-6">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link interactive ${pathname === l.to ? 'active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

interface YearTrackerProps {
  currentYear: string;
  progress: number;
}

const YearTracker = ({ currentYear, progress }: YearTrackerProps) => {
  const years = ['2021', '2022', '2023', '2024', '2025', '2026'];

  return (
    <div className="year-tracker hidden md:flex flex-col items-center gap-2">
      <span className="font-mono text-orange" style={{ fontSize: '11px' }}>{currentYear}</span>
      <div className="relative w-[2px] h-[200px] rounded-full" style={{ background: '#1A1A1A' }}>
        <div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{ background: '#FF5E1A', height: `${progress}%`, transition: 'height 0.3s' }}
        />
      </div>
      <div className="flex flex-col gap-1 mt-1">
        {years.map(y => (
          <span
            key={y}
            className="font-mono"
            style={{ fontSize: '9px', color: y === currentYear ? '#FF5E1A' : '#4A4F5E' }}
          >
            {y}
          </span>
        ))}
      </div>
    </div>
  );
};

const AmbientOrbs = () => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const update = () => {
      const y = window.scrollY;
      if (orb1Ref.current) orb1Ref.current.style.transform = `translateY(${y * 0.08}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translateY(${y * -0.06}px)`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div
        ref={orb1Ref}
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: 900, height: 900,
          top: -200, left: -200,
          background: 'radial-gradient(circle, rgba(255,94,26,0.12) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={orb2Ref}
        className="fixed pointer-events-none"
        style={{
          zIndex: 0,
          width: 700, height: 700,
          bottom: -200, right: -200,
          background: 'radial-gradient(circle, rgba(0,123,255,0.08) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export { GrainOverlay, CustomCursor, ScrollProgress, NavBar, YearTracker, AmbientOrbs };
