import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center py-20 px-6">
      {/* Spotlight */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(255,94,26,0.12) 0%, transparent 70%)',
        }} />
      </div>

      <motion.div
        ref={ref}
        className="relative z-10 w-full max-w-lg mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="label-style mb-4">{'// START A CONVERSATION'}</p>
        <h2 className="font-syne font-extrabold mb-10" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          Let's build something extraordinary.
        </h2>

        <form className="glass p-8 text-left space-y-8" onSubmit={e => e.preventDefault()}>
          <div className="floating-field">
            <input type="text" placeholder=" " required />
            <label>Name</label>
          </div>
          <div className="floating-field">
            <input type="email" placeholder=" " required />
            <label>Email</label>
          </div>
          <div className="floating-field">
            <textarea rows={3} placeholder=" " required />
            <label>Tell us about your project</label>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-mono font-medium interactive transition-transform hover:scale-[1.02]"
            style={{
              background: '#FF5E1A',
              color: '#0A0A0A',
              boxShadow: '0 0 20px rgba(255,94,26,0.3)',
            }}
          >
            TRANSMIT MESSAGE →
          </button>
        </form>

        <div className="mt-10 space-y-2 font-mono text-muted-text" style={{ fontSize: '0.8rem' }}>
          <p>
            ✉{' '}
            <a href="mailto:ispin@nscet.ac.in" className="text-orange interactive hover:underline">
              ispin@nscet.ac.in
            </a>
          </p>
          <p>📍 NSCET, Theni, Tamil Nadu, India</p>
          <p>🗓 Operational since 2021</p>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
