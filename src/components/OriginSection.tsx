import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const OriginSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    let raf: number;
    const update = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.1}px)`;
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const words = ['INNOVATION', 'SYSTEMS', 'PRECISION', 'NSCET'];

  return (
    <section id="story" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* BG watermark */}
      <div ref={bgRef} className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none">
        <span className="font-syne font-extrabold" style={{ fontSize: '25vw', opacity: 0.02 }}>ORIGIN</span>
      </div>

      {/* Word cloud */}
      <div className="absolute inset-0 pointer-events-none">
        {words.map((w, i) => (
          <span
            key={w}
            className="absolute font-mono"
            style={{
              color: 'rgba(255,255,255,0.06)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              top: i < 2 ? '15%' : '80%',
              left: i % 2 === 0 ? '5%' : '75%',
            }}
          >
            {w}
          </span>
        ))}
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="label-style mb-8"
        >
          {'// THE BEGINNING'}
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono italic leading-relaxed"
          style={{ fontSize: '1.4rem', lineHeight: 2 }}
        >
          "In 2021, a group of faculty at NSCET asked a simple question: what if students didn't just study technology — what if they shipped it?"
        </motion.blockquote>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto my-8"
          style={{ width: 80, height: 1, background: '#FF5E1A' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-mono text-muted-text"
          style={{ fontSize: '0.85rem' }}
        >
          — The founding principle of iSPIN
        </motion.p>
      </div>
    </section>
  );
};

export default OriginSection;
