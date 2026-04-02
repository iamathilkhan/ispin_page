const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative px-6 md:px-16 pt-12 pb-8">
      {/* Top line */}
      <div className="w-full h-[1px] mb-10" style={{ background: '#FF5E1A', boxShadow: '0 0 10px rgba(255,94,26,0.4)' }} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        {/* Left */}
        <div>
          <div className="font-syne text-xl font-bold mb-2">
            <span className="text-orange">i</span>
            <span>SPIN</span>
          </div>
          <p className="font-mono text-muted-text" style={{ fontSize: '0.75rem' }}>
            A student-run technical organization · NSCET · Est. 2021
          </p>
        </div>

        {/* Center */}
        <div className="flex flex-col items-start md:items-center gap-2">
          {['story', 'projects', 'team', 'contact'].map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="nav-link interactive capitalize"
            >
              {id}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="md:text-right">
          <div className="flex items-center gap-2 md:justify-end mb-2">
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: '#00FF88', animation: 'breathe 2s ease-in-out infinite' }} />
            <span className="font-mono text-green" style={{ fontSize: '0.75rem' }}>{'// SYSTEMS OPERATIONAL'}</span>
          </div>
          <p className="font-mono text-muted-text" style={{ fontSize: '0.75rem' }}>
            6 projects deployed · 5 years running
          </p>
        </div>
      </div>

      <div className="text-center font-mono text-muted-text" style={{ fontSize: '0.7rem' }}>
        Built by iSPIN Engineers · NSCET
      </div>
    </footer>
  );
};

export default Footer;
