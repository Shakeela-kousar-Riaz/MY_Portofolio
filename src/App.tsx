/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsCertificationsSection } from './components/SkillsCertificationsSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ServicesPage } from './pages/ServicesPage';
import { FAQPage } from './pages/FAQPage';
import { Project } from './data/portfolioData';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme_preference');
      if (saved) return saved === 'dark';
    }
    return true; // Sleek modern dark mode by default for technical engineering portfolio
  });

  const [activePage, setActivePage] = useState<'home' | 'services' | 'faq'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactTopic, setContactTopic] = useState<string>('Full-time AI Engineer Role');
  const [contactMessage, setContactMessage] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('theme_preference', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync hash changes on first mount
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#services') {
        setActivePage('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#faq') {
        setActivePage('faq');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#projects' || hash === '#about' || hash === '#experience' || hash === '#skills' || hash === '#resume' || hash === '#contact') {
        setActivePage('home');
        setTimeout(() => {
          const el = document.getElementById(hash.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenResume = () => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const resumeEl = document.getElementById('resume');
        if (resumeEl) resumeEl.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const resumeEl = document.getElementById('resume');
      if (resumeEl) resumeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setContactTopic(serviceTitle);
    setContactMessage(
      `Hi Shakeela,\n\nI am interested in collaborating on: ${serviceTitle}.\n\nPlease let me know your availability for a discovery discussion.`
    );
    // Smooth scroll down to contact section
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContactWithTopic = (topic: string) => {
    setContactTopic(topic);
    setContactMessage(
      `Hi Shakeela,\n\nI have a question regarding: ${topic}.\n\nLooking forward to hearing from you!`
    );
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        darkMode ? 'bg-[#0B0A16] text-slate-100' : 'bg-[#FAF8FC] text-slate-900'
      }`}
    >
      {/* Top Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenContact={handleOpenContact}
      />

      <main className="relative">
        {activePage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              darkMode={darkMode}
              onOpenResume={handleOpenResume}
              onOpenContact={handleOpenContact}
            />

            {/* Selected Works / Projects */}
            <ProjectsSection
              darkMode={darkMode}
              onSelectProject={(project) => setSelectedProject(project)}
            />

            {/* Experience & Education */}
            <ExperienceSection darkMode={darkMode} />

            {/* Capabilities & Certifications */}
            <SkillsCertificationsSection darkMode={darkMode} />

            {/* Full Resume & Curriculum Vitae */}
            <ResumeSection darkMode={darkMode} />
          </>
        )}

        {activePage === 'services' && (
          <ServicesPage
            darkMode={darkMode}
            onSelectServiceForInquiry={handleSelectServiceForInquiry}
          />
        )}

        {activePage === 'faq' && (
          <FAQPage
            darkMode={darkMode}
            onOpenContactWithTopic={handleOpenContactWithTopic}
          />
        )}

        {/* Contact Details & Inquiry Form (Available across all pages for frictionless reach) */}
        <ContactSection
          darkMode={darkMode}
          initialTopic={contactTopic}
          initialMessage={contactMessage}
        />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} setActivePage={setActivePage} />

      {/* Interactive Project Case Study & Simulator Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        darkMode={darkMode}
      />
    </div>
  );
}
