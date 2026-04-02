import { useState, useEffect } from 'react';
import { GrainOverlay, CustomCursor, ScrollProgress, NavBar, YearTracker, AmbientOrbs } from '@/components/GlobalElements';
import HeroSection from '@/components/HeroSection';
import OriginSection from '@/components/OriginSection';
import TimelineSection from '@/components/TimelineSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('');
  const [currentYear, setCurrentYear] = useState('2021');
  const [yearProgress, setYearProgress] = useState(0);

  useEffect(() => {
    const sections = ['story', 'projects', 'team', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Year tracking via scroll position
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setYearProgress(Math.min(pct * 100, 100));
      const years = ['2021', '2021', '2022', '2022', '2023', '2023', '2024', '2025', '2025', '2026', '2026'];
      const idx = Math.min(Math.floor(pct * years.length), years.length - 1);
      setCurrentYear(years[idx]);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observers.forEach(o => o.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="relative" style={{ cursor: 'none' }}>
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgress />
      <NavBar activeSection={activeSection} />
      <YearTracker currentYear={currentYear} progress={yearProgress} />
      <AmbientOrbs />

      <main>
        <HeroSection />
        <OriginSection />
        <TimelineSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
