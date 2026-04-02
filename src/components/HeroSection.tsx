import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const layerRef1 = useRef<HTMLDivElement>(null);
  const layerRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    let raf: number;
    const update = () => {
      const y = window.scrollY;
      if (layerRef1.current) layerRef1.current.style.transform = `translateY(${y * 0.05}px)`;
      if (layerRef2.current) layerRef2.current.style.transform = `translateY(${y * 0.3}px)`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const keywords = ['INIT()', '$ deploy --prod', 'git push origin', 'npm run build', 'const io =', 'async fn()'];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 1: Circuit grid */}
      <div ref={layerRef1} className="absolute inset-0 will-change-transform" style={{ opacity: 0.04 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" width="60" height="60" patternUnits="userSpaceOnUse">
              <line x1="0" y1="30" x2="60" y2="30" stroke="#FF5E1A" strokeWidth="0.5" />
              <line x1="30" y1="0" x2="30" y2="60" stroke="#FF5E1A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Layer 2: Floating keywords */}
      <div ref={layerRef2} className="absolute inset-0 will-change-transform">
        {keywords.map((kw, i) => (
          <span
            key={i}
            className="absolute font-mono"
            style={{
              color: 'rgba(255,255,255,0.04)',
              fontSize: '0.75rem',
              top: `${15 + i * 14}%`,
              left: `${5 + (i % 3) * 35}%`,
            }}
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Foreground */}
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="label-style mb-8"
        >
          {'// A TECHNICAL ORGANIZATION · NSCET'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="font-syne font-extrabold leading-none tracking-tight"
          style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', letterSpacing: '-0.02em' }}
        >
          <span className="text-orange">i</span>SPIN
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-secondary-text mt-6"
          style={{ fontSize: '1.1rem' }}
        >
          Student-engineered. Institution-deployed. Always operational.
        </motion.p>

        {/* Animated divider */}
        <motion.div
          className="flex items-center justify-center gap-3 my-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            className="h-[1px]"
            style={{ background: '#FF5E1A' }}
            initial={{ width: 0 }}
            animate={{ width: '45%' }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
          <div className="w-[6px] h-[6px] rounded-full bg-orange" style={{ boxShadow: '0 0 12px #FF5E1A' }} />
          <motion.div
            className="h-[1px]"
            style={{ background: '#FF5E1A' }}
            initial={{ width: 0 }}
            animate={{ width: '45%' }}
            transition={{ duration: 0.6, delay: 0.7 }}
          />
        </motion.div>

        {/* Glass stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex justify-center gap-6"
        >
          <div className="glass px-6 py-4 text-center">
            <div className="font-syne font-extrabold text-orange" style={{ fontSize: '2.5rem' }}>2021</div>
            <div className="font-mono text-muted-text" style={{ fontSize: '0.75rem' }}>Year Founded</div>
          </div>
          <div className="glass px-6 py-4 text-center">
            <div className="font-syne font-extrabold text-orange" style={{ fontSize: '2.5rem' }}>6</div>
            <div className="font-mono text-muted-text" style={{ fontSize: '0.75rem' }}>Systems Deployed</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="font-mono text-muted-text" style={{ fontSize: '0.8rem' }}>SCROLL TO BEGIN THE STORY</p>
        <div className="text-orange mt-2" style={{ animation: 'bounce-arrow 1.5s ease-in-out infinite' }}>↓</div>
      </div>
    </section>
  );
};

export default HeroSection;
