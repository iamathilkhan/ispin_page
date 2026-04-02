import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Faculty & Engineer Data ───
const faculty = [
  { pid: '001', name: 'Faculty Mentor 01', role: 'iSPIN Program Director', cpu: '94%', mem: '2.1G', bio: 'Overseeing technical strategy and student growth', initials: 'FM' },
  { pid: '002', name: 'Faculty Mentor 02', role: 'iSPIN Technical Advisor', cpu: '87%', mem: '1.8G', bio: 'Guiding engineering decisions and deployment', initials: 'FA' },
];

const engineers = [
  { pid: '101', name: 'Engineer 01', role: 'Full Stack Engineer', batch: '2023 Batch', skills: ['React', 'Node.js', 'PostgreSQL', 'Redis'], initials: 'E1' },
  { pid: '102', name: 'Engineer 02', role: 'Systems Engineer', batch: '2023 Batch', skills: ['IoT', 'Python', 'MQTT', 'Embedded'], initials: 'E2' },
  { pid: '103', name: 'Engineer 03', role: 'Frontend Engineer', batch: '2024 Batch', skills: ['React', 'Framer Motion', 'SVG', 'CSS'], initials: 'E3' },
  { pid: '104', name: 'Engineer 04', role: 'Backend Engineer', batch: '2024 Batch', skills: ['Node.js', 'Redis', 'Docker', 'REST API'], initials: 'E4' },
];

// ─── Contribution Grid ───
const ContribGrid = () => (
  <div className="grid gap-[3px]" style={{ gridTemplateColumns: 'repeat(7, 8px)', gridTemplateRows: 'repeat(5, 8px)' }}>
    {Array.from({ length: 35 }).map((_, i) => (
      <div
        key={i}
        className="rounded-sm"
        style={{
          width: 8, height: 8,
          background: `rgba(0,123,255,${[0.1, 0.2, 0.3, 0.5, 0.7][Math.floor(Math.random() * 5)]})`,
        }}
      />
    ))}
  </div>
);

// ─── Sparkline ───
const Sparkline = () => {
  const pts = Array.from({ length: 12 }, (_, i) => `${i * 8},${30 - Math.random() * 25}`).join(' ');
  return (
    <svg width="96" height="32" viewBox="0 0 96 32">
      <polyline points={pts} fill="none" stroke="rgba(255,94,26,0.5)" strokeWidth="1.5" />
    </svg>
  );
};

// ─── Faculty Card ───
const FacultyCard = ({ f }: { f: typeof faculty[0] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass interactive cursor-pointer mx-auto mb-4"
      style={{
        maxWidth: 900,
        padding: '1.25rem 1.75rem',
        borderLeft: '3px solid #007BFF',
        background: 'rgba(0,123,255,0.04)',
      }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <span className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(0,123,255,0.6)' }}>PID#{f.pid}</span>
          {/* Avatar */}
          <div className="relative w-11 h-11 rounded-full flex items-center justify-center"
            style={{ background: 'conic-gradient(#007BFF, #FF5E1A, #007BFF)' }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#111318' }}>
              <span className="font-syne font-bold text-sm">{f.initials}</span>
            </div>
          </div>
          <div>
            <div className="font-syne font-semibold text-sm">{f.name}</div>
            <div className="font-mono text-blue" style={{ fontSize: '0.75rem' }}>{f.role}</div>
          </div>
        </div>

        <div className="hidden md:block"><ContribGrid /></div>

        <div className="flex gap-2">
          <span className="font-mono px-2 py-0.5 rounded" style={{ fontSize: '0.65rem', background: 'rgba(255,94,26,0.1)', color: '#FF5E1A' }}>CPU:{f.cpu}</span>
          <span className="font-mono px-2 py-0.5 rounded" style={{ fontSize: '0.65rem', background: 'rgba(0,123,255,0.1)', color: '#007BFF' }}>MEM:{f.mem}</span>
          <span className="font-mono px-2 py-0.5 rounded flex items-center gap-1" style={{ fontSize: '0.65rem', background: 'rgba(0,255,136,0.06)', color: '#00FF88' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" style={{ background: '#00FF88' }} />
            RUNNING
          </span>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 font-mono text-secondary-text space-y-1" style={{ fontSize: '0.75rem' }}>
          <p>{`> role: ${f.role}`}</p>
          <p>{`> since: 2021`}</p>
          <p>{`> access_level: KERNEL`}</p>
          <p>{`> bio: "${f.bio}"`}</p>
        </div>
      )}
    </div>
  );
};

// ─── Engineer Card ───
const EngineerCard = ({ e }: { e: typeof engineers[0] }) => (
  <div
    className="glass interactive p-6 text-center"
    style={{ borderTop: '2px solid rgba(255,94,26,0.4)' }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(255,94,26,0.5)' }}>PID#{e.pid}</span>
      <span className="font-mono flex items-center gap-1" style={{ fontSize: '0.6rem', color: '#00FF88' }}>
        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#00FF88' }} />
        ACTIVE
      </span>
    </div>

    {/* Hex avatar */}
    <div className="mx-auto mb-3 w-16 h-16 flex items-center justify-center"
      style={{
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: 'conic-gradient(#FF5E1A, #007BFF, #00FF88, #FF5E1A)',
      }}
    >
      <div className="w-[58px] h-[58px] flex items-center justify-center"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: '#111318',
        }}
      >
        <span className="font-syne font-bold">{e.initials}</span>
      </div>
    </div>

    <div className="font-syne font-semibold text-sm mb-1">{e.name}</div>
    <div className="font-mono text-orange" style={{ fontSize: '0.75rem' }}>{e.role}</div>
    <div className="font-mono text-muted-text mb-3" style={{ fontSize: '0.65rem' }}>{e.batch}</div>

    <div className="flex flex-wrap justify-center gap-1 mb-3">
      {e.skills.map(s => (
        <span key={s} className="font-mono px-2 py-0.5 rounded"
          style={{ fontSize: '0.6rem', background: 'rgba(255,94,26,0.08)', color: '#FF5E1A', border: '1px solid rgba(255,94,26,0.15)' }}>
          {s}
        </span>
      ))}
    </div>

    <div className="flex justify-center"><Sparkline /></div>
  </div>
);

// ─── Team Section ───
const TeamSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="team" className="relative py-20 px-6" ref={ref}>
      {/* Dot matrix background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="2" fill="rgba(255,94,26,0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono mb-3" style={{ fontSize: '0.7rem', color: 'rgba(255,94,26,0.6)', letterSpacing: '0.4em' }}>
          {'// PROCESS REGISTRY · iSPIN KERNEL v5.0'}
        </p>
        <h2 className="font-syne font-extrabold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          ACTIVE PROCESSES
        </h2>
        <div className="glass inline-flex items-center gap-4 px-4 py-2 rounded-full mx-auto" style={{ fontSize: '0.7rem' }}>
          <span className="font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#007BFF' }} />
            2 KERNEL PROCESSES
          </span>
          <span className="font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#00FF88' }} />
            4 USER PROCESSES
          </span>
          <span className="font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#FF5E1A' }} />
            UPTIME: 5Y 3M
          </span>
        </div>
      </motion.div>

      {/* Faculty */}
      <div className="relative z-10 mb-12">
        <p className="font-mono text-muted-text mb-4 max-w-[900px] mx-auto" style={{ fontSize: '0.65rem' }}>
          PID#&nbsp;&nbsp;PROCESS_NAME&nbsp;&nbsp;ROLE&nbsp;&nbsp;CPU&nbsp;&nbsp;MEM&nbsp;&nbsp;STATUS
        </p>
        {faculty.map(f => <FacultyCard key={f.pid} f={f} />)}
      </div>

      {/* Engineers */}
      <div className="relative z-10 max-w-[1100px] mx-auto">
        <p className="font-mono text-muted-text mb-6" style={{ fontSize: '0.7rem' }}>
          {'// USER PROCESSES · ACTIVE CONTRIBUTORS'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {engineers.map(e => <EngineerCard key={e.pid} e={e} />)}
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 mt-16 py-3 px-6 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{
          background: 'rgba(255,94,26,0.04)',
          borderTop: '1px solid rgba(255,94,26,0.15)',
          borderBottom: '1px solid rgba(255,94,26,0.15)',
        }}
      >
        <span className="font-mono text-muted-text" style={{ fontSize: '0.7rem' }}>
          iSPIN@NSCET:~$ team --list --status=active
          <span className="inline-block w-2 h-3 ml-1" style={{ background: '#FF5E1A', animation: 'blink 1s infinite' }} />
        </span>
        <span className="font-mono text-secondary-text" style={{ fontSize: '0.7rem' }}>
          {'> 6 processes loaded · 0 errors · kernel stable'}
        </span>
        <span className="font-mono text-muted-text" style={{ fontSize: '0.65rem' }}>
          last updated: 2026-01-01 00:00 IST
        </span>
      </div>
    </section>
  );
};

export default TeamSection;
