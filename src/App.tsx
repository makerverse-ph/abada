/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Award, 
  Shield, 
  Globe, 
  Users, 
  Menu, 
  X, 
  ChevronUp, 
  FileText, 
  Calendar, 
  MapPin, 
  Mail, 
  ArrowRight, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  CheckCircle, 
  Download, 
  Send, 
  Check,
  Building,
  Scale,
  Activity,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Define TS Types
interface Publication {
  id: string;
  title: string;
  year: string;
  status: 'In Press' | 'Published';
  category: string;
  categoryLabel: string;
  author: string;
  description: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Theme {
  id: string;
  title: string;
  description: string;
}

export default function App() {
  // Navigation active state highlight on scroll
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Publication search & filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  
  // Back to top indicator
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Modal for requesting a paper or publication copy
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);
  const [requestSaved, setRequestSaved] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    affiliation: '',
    purpose: '',
    agreeToTerms: false
  });
  
  // Contact form submission state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Monitor scroll height
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set up active section link intersection observer
  useEffect(() => {
    const sections = ['home', 'about', 'mission', 'services', 'themes', 'leadership', 'publications', 'events', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // trigger when portion enters view
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Publications data source
  const publications: Publication[] = [
    {
      id: 'pub1',
      title: 'Disaster Management in the Philippines',
      year: 'In Press',
      status: 'In Press',
      category: 'resilience',
      categoryLabel: 'Disaster Risk & Resilience',
      author: 'StratSearch Foundation Core Research Panel',
      description: 'An exhaustive assessment of vulnerability indices, regional response logistics, and recommendations for community-based adaptation mechanisms.'
    },
    {
      id: 'pub2',
      title: 'Rapid Situational Analysis on Child Domestic Work',
      year: 'In Press',
      status: 'In Press',
      category: 'social',
      categoryLabel: 'Labor & Social Protection',
      author: 'StratSearch Social Policy Division',
      description: 'A rapid situational audit analyzing employment conditions, domestic work vulnerabilities, and legal enforcement caps across national urban spaces.'
    },
    {
      id: 'pub3',
      title: 'Qualitative Research on Employment Arrangements, Practices and Working Conditions in Domestic Work in the Philippines',
      year: 'In Press',
      status: 'In Press',
      category: 'social',
      categoryLabel: 'Labor & Social Protection',
      author: 'SSFI Research Workgroup on Labor Dynamics',
      description: 'A deep-dive research framework documenting informal protocols, welfare access, and institutional shortcomings of domestic helpers.'
    },
    {
      id: 'pub4',
      title: 'Towards an ASEAN Parliament: Challenges and Prospects',
      year: '2018',
      status: 'Published',
      category: 'asean',
      categoryLabel: 'ASEAN & Regional Cooperation',
      author: 'Dr. Clarita R. Carlos et al.',
      description: 'A comprehensive feasibility review considering legislative integration, transnational sovereignty constraints, and comparative parliamentary structures.'
    },
    {
      id: 'pub5',
      title: 'Population Ageing in the Philippines: Issues and Challenges',
      year: '2017',
      status: 'Published',
      category: 'social',
      categoryLabel: 'Labor & Social Protection',
      author: 'StratSearch Commission on Social Demographics',
      description: 'Analyzing demographic trajectories, financial security in older cohorts, and pension infrastructure limits to build adaptive policies.'
    },
    {
      id: 'pub6',
      title: 'Democratic Deficits in the Philippines: What is to be done?',
      year: '2010',
      status: 'Published',
      category: 'governance',
      categoryLabel: 'Governance & Institutional Reform',
      author: 'Dr. Clarita R. Carlos',
      description: 'Analyzing bureaucratic clientelism, structural institutional flaws, and clear strategic roadmaps for public accountability in local spaces.'
    },
    {
      id: 'pub7',
      title: 'Towards Bureaucratic Reform: Issues and Challenges',
      year: '2004',
      status: 'Published',
      category: 'electoral',
      categoryLabel: 'Electoral & Bureaucratic Reform',
      author: 'Dr. Clarita R. Carlos',
      description: 'Identifying structural issues, career path reforms, and performance-based reward paradigms inside Philippine Civil Service organs.'
    },
    {
      id: 'pub8',
      title: 'History of Electoral Reforms in the Philippines: Pre-Spanish to 1998',
      year: '1998',
      status: 'Published',
      category: 'electoral',
      categoryLabel: 'Electoral & Bureaucratic Reform',
      author: 'SSFI Electoral Policy Panel',
      description: 'An authoritative historical compendium detailing legal frameworks, franchise development, and voting mechanisms since the pre-colonial era.'
    },
    {
      id: 'pub9',
      title: 'Selected Election Cases in the Philippines: From the Supreme Court and Electoral Tribunals',
      year: '1998',
      status: 'Published',
      category: 'electoral',
      categoryLabel: 'Electoral & Bureaucratic Reform',
      author: 'StratSearch Legal & Jurisprudential Division',
      description: 'An organized selection of foundational legal doctrines, election challenges, and judicial decisions forming electoral precedent.'
    },
    {
      id: 'pub10',
      title: 'Elections in the Philippines from Pre-colonial Period to the Present',
      year: '1996',
      status: 'Published',
      category: 'electoral',
      categoryLabel: 'Electoral & Bureaucratic Reform',
      author: 'Dr. Clarita R. Carlos & SSFI Scholars',
      description: 'Examining political agency, shifting social movements, patronage networks, and structural shifts from initial voting to electronic transition.'
    },
    {
      id: 'pub11',
      title: 'The Philippines in ASEAN: An Assessment of 27 Years of Cooperation in Selected Functional Areas',
      year: '1996',
      status: 'Published',
      category: 'asean',
      categoryLabel: 'ASEAN & Regional Cooperation',
      author: 'StratSearch Research Team on South East Asian Polity',
      description: 'Evaluating trade policies, defense cooperation, and diplomatic milestones across three decades of Philippine membership in the bloc.'
    },
    {
      id: 'pub12',
      title: 'Political Parties in the Philippines from 1900 to the Present',
      year: '1996',
      status: 'Published',
      category: 'governance',
      categoryLabel: 'Governance & Institutional Reform',
      author: 'Dr. Clarita R. Carlos',
      description: 'An in-depth empirical work outlining party system instability, programmatic party design deficits, and recommendations to strengthen democracy.'
    },
    {
      id: 'pub13',
      title: 'Chronicle of the 1998 Elections in the Philippines',
      year: '1996',
      status: 'Published',
      category: 'electoral',
      categoryLabel: 'Electoral & Bureaucratic Reform',
      author: 'Dennis M. Lalata & Historical Team',
      description: 'A structural snapshot of campaign financing, party switching, candidates, and media narratives shaping the seminal 1998 nationwide ballot.'
    }
  ];

  // Core services items
  const services: Service[] = [
    {
      id: 'ser1',
      title: 'Evidence-Based Research',
      description: 'Rigorous scholarly design and qualitative-quantitative studies conducted by eminent scientists and policy specialists.',
      icon: <Shield className="w-6 h-6 text-accent-gold" />
    },
    {
      id: 'ser2',
      title: 'Continuing Education & Seminars',
      description: 'Strengthening administrative capital via interactive seminars, professional certification, and tailored civil service training.',
      icon: <GraduationCap className="w-6 h-6 text-accent-gold" />
    },
    {
      id: 'ser3',
      title: 'Strategic Planning & Evaluation',
      description: 'Empirical research, program assessments, impact audits, and rigorous monitoring for private, public, and NGO sectors.',
      icon: <Briefcase className="w-6 h-6 text-accent-gold" />
    },
    {
      id: 'ser4',
      title: 'Symposia & Roundtable Discussions',
      description: 'Targeted policy dialogue, elite consultations, and public-private workshops addressing national and global policy choke-points.',
      icon: <Users className="w-6 h-6 text-accent-gold" />
    },
    {
      id: 'ser5',
      title: 'Feasibility & Management Studies',
      description: 'High-level business plans, regional vulnerability audits, project mapping, and organization reform feasibility.',
      icon: <Globe className="w-6 h-6 text-accent-gold" />
    },
    {
      id: 'ser6',
      title: 'Academic & Trust Publication',
      description: 'Publishing academic logs, policy white-papers, and empirical books, advancing high-quality research dissemination.',
      icon: <BookOpen className="w-6 h-6 text-accent-gold" />
    }
  ];

  // Themes
  const strategicThemes: Theme[] = [
    { id: 't1', title: 'Governance and Institutional Reform', description: 'Assessing democratic checks, programmatic political development, and structural systemic loopholes.' },
    { id: 't2', title: 'Defense, Security, and Foreign Policy', description: 'Analyzing geo-political developments, maritime claims, deterrence frameworks, and Southeast Asian policy vectors.' },
    { id: 't3', title: 'Development Policy', description: 'Empirical studies of social demographics, elderly protection schemes, housing, and structural poverty relief.' },
    { id: 't4', title: 'Electoral and Bureaucratic Reform', description: 'Historical lessons, campaign finance policies, and civil service performance optimizations.' },
    { id: 't5', title: 'ASEAN and Regional Cooperation', description: 'Legislative integration, economic agreements, and shared initiatives bridging regional borders.' },
    { id: 't6', title: 'Disaster Management and Resilience', description: 'Climate adaptation analysis, regional triage protocols, vulnerability mapping, and relief planning.' },
    { id: 't7', title: 'Labor, Social Protection, & Domestic Work', description: 'Examining informal contract structures, child protection safeguards, and legal guarantees for domestic personnel.' },
    { id: 't8', title: 'Public Sector Capacity Building', description: 'Bridging technical gaps in civil service leadership with structured curriculum design.' }
  ];

  // Filters calculation
  const uniqueCategories = useMemo(() => {
    const list = new Set(publications.map(p => p.categoryLabel));
    return ['All', ...Array.from(list)];
  }, []);

  const filteredPublications = useMemo(() => {
    return publications.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCategory = selectedCategory === 'All' || p.categoryLabel === selectedCategory;
      const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
      
      return matchSearch && matchCategory && matchStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSubmitted(true);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  // Handle publication request form submission
  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSaved(true);
    setTimeout(() => {
      setSelectedPaper(null);
      setRequestSaved(false);
      setRequestForm({
        name: '',
        email: '',
        affiliation: '',
        purpose: '',
        agreeToTerms: false
      });
    }, 3000);
  };

  // Scroll handler for click anchors
  const navigateTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8F7F2] font-sans antialiased text-[#1F2933]">

      {/* HEADER / NAVIGATION */}
      <header className={`sticky top-0 z-40 transition-all duration-300 w-full ${
        scrolled 
          ? 'bg-[#0B1F3A]/98 backdrop-blur-md shadow-lg py-3 border-b border-[#C7A45D]/20' 
          : 'bg-[#0B1F3A] py-5 border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <a href="#home" id="nav-brand-logo" onClick={(e) => navigateTo(e, 'home')} className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#C7A45D] rounded p-1">
            <div className="relative flex items-center justify-center w-10 h-10 bg-[#FFFFFF]/10 border border-[#C7A45D]/60 rounded-lg group-hover:bg-[#C7A45D]/20 transition-all duration-300">
              <span className="font-serif font-bold text-base text-[#C7A45D] tracking-wider">SS</span>
              {/* Gold decorative dot */}
              <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#C7A45D] rounded-full"></span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-semibold text-[#FFFFFF] tracking-wide text-sm sm:text-base leading-tight group-hover:text-[#C7A45D] transition-colors">
                StratSearch Foundation
              </span>
              <span className="text-[#64748B] text-xxs tracking-widest font-mono uppercase mt-0.5 group-hover:text-[#FFFFFF]/80 transition-colors">
                Policy Think Tank • Est. 1993
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: 'about', label: 'About' },
              { id: 'mission', label: 'Mission' },
              { id: 'services', label: 'Services' },
              { id: 'themes', label: 'Themes' },
              { id: 'leadership', label: 'Leadership' },
              { id: 'publications', label: 'Publications' },
              { id: 'contact', label: 'Contact' }
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                id={`nav-link-${item.id}`}
                onClick={(e) => navigateTo(e, item.id)}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase rounded transition-all duration-200 outline-none focus:ring-1 focus:ring-[#C7A45D] ${
                  activeSection === item.id 
                    ? 'text-[#C7A45D]' 
                    : 'text-[#F8F7F2]/80 hover:text-[#FFFFFF] hover:bg-[#FFFFFF]/5'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => navigateTo(e, 'contact')}
              className="ml-3 px-4 py-2 border border-[#C7A45D] hover:bg-[#C7A45D] hover:text-[#0B1F3A] text-[#C7A45D] rounded text-xs font-bold uppercase tracking-wider transition-all duration-300"
            >
              Consult SSFI
            </a>
          </nav>

          {/* Mobile hamburger button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/5 rounded focus:outline-none focus:ring-2 focus:ring-[#C7A45D]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            />
            {/* Drawer Body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#0B1F3A] z-40 lg:hidden p-6 shadow-2xl flex flex-col border-l border-[#C7A45D]/20"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/10 border border-[#C7A45D] rounded flex items-center justify-center">
                    <span className="font-serif font-bold text-xs text-[#C7A45D]">SS</span>
                  </div>
                  <span className="font-serif font-semibold text-white tracking-wide text-sm">SSFI Secretariat</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-white/80 focus:outline-[#C7A45D]"
                  id="mobile-menu-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-1 overflow-y-auto flex-grow pr-1">
                {[
                  { id: 'about', label: 'About Think Tank' },
                  { id: 'mission', label: 'Mission & Vision' },
                  { id: 'services', label: 'Core Services' },
                  { id: 'themes', label: 'Research Themes' },
                  { id: 'leadership', label: 'Executive Leadership' },
                  { id: 'publications', label: 'Publications Library' },
                  { id: 'events', label: 'Conferences & Events' },
                  { id: 'contact', label: 'Contact SSFI' }
                ].map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    id={`mobile-nav-${item.id}`}
                    onClick={(e) => navigateTo(e, item.id)}
                    className={`block py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded transition-all duration-150 ${
                      activeSection === item.id 
                        ? 'bg-[#C7A45D] text-[#0B1F3A]' 
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 text-center">
                <p className="text-white/40 text-[10px] uppercase font-mono tracking-widest mb-3">Institutional Secretariat</p>
                <a 
                  href="mailto:ssfiphil@gmail.com" 
                  className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#C7A45D] text-[#0B1F3A] hover:bg-yellow-500 rounded text-xs font-bold uppercase tracking-wider transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" /> ssfiphil@gmail.com
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] lg:min-h-screen bg-[#0B1F3A] overflow-hidden flex items-center py-20 px-4 sm:px-6 lg:px-8">
        
        {/* Background Visual Enhancements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C7A45D_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C7A45D]/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-900/40 rounded-full blur-[140px]"></div>
        
        {/* Fine gold horizontal lines represent scholarly border structure */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#C7A45D] to-transparent"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy - spanning 7 cols */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            
            {/* Scholarly Tag/Chip */}
            <div className="inline-flex items-center gap-2 bg-[#C7A45D]/15 border border-[#C7A45D]/30 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#C7A45D] animate-pulse"></span>
              <span className="text-[#C7A45D] text-[10px] sm:text-xs font-mono font-semibold tracking-wider uppercase">
                Philippine Policy Think Tank
              </span>
            </div>

            {/* Title / Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FFFFFF] font-bold tracking-tight leading-tight">
              Championing science, <span className="text-[#C7A45D] italic block sm:inline">evidence</span>, and strategic insight in policy & decision-making.
            </h1>

            {/* Divider */}
            <div className="w-24 h-1 bg-[#C7A45D]" id="hero-divider"></div>

            {/* Subheading */}
            <p className="text-[#64748B] text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              StratSearch Foundation, Inc. is an independent policy research and strategic development think tank supporting public institutions, private organizations, and regional development actors through science-based research, program evaluations, and expert policy analysis.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
              <a 
                href="#publications" 
                id="hero-cta-primary"
                onClick={(e) => navigateTo(e, 'publications')}
                className="flex items-center justify-center gap-2 bg-[#C7A45D] hover:bg-yellow-500 text-[#0B1F3A] font-bold px-7 py-3.5 rounded text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#C7A45D]/30"
              >
                Explore Publications Library <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="#contact" 
                id="hero-cta-secondary"
                onClick={(e) => navigateTo(e, 'contact')}
                className="flex items-center justify-center gap-2 border border-[#C7A45D] hover:bg-white/5 text-[#C7A45D] hover:text-white font-bold px-7 py-3.5 rounded text-sm uppercase tracking-wider transition-all duration-300 focus:ring-4 focus:ring-white/15"
              >
                Contact SSFI <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Research Graphic/Grid on Right - spanning 5 cols */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-square p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm shadow-xl flex items-center justify-center overflow-hidden group">
              
              {/* Outer rotated bounding grid line */}
              <div className="absolute inset-0 border border-[#C7A45D]/10 rounded-full scale-90 rotate-45 animate-[spin_180s_infinite_linear]"></div>
              <div className="absolute inset-0 border border-white/5 rounded-full scale-75 rotate-12 animate-[spin_90s_infinite_linear]"></div>
              
              {/* Institutional Columns - geometric SVG design representing policy and science */}
              <svg viewBox="0 0 400 400" className="w-full h-full text-white/5 fill-none stroke-current" style={{ strokeWidth: 1.5 }}>
                {/* Horizontal data lines */}
                <line x1="50" y1="200" x2="350" y2="200" className="stroke-[#C7A45D]/20" />
                <line x1="50" y1="120" x2="350" y2="120" className="stroke-[#64748B]/10" />
                <line x1="50" y1="280" x2="350" y2="280" className="stroke-[#64748B]/10" />
                
                {/* vertical grid lines */}
                <line x1="200" y1="50" x2="200" y2="350" className="stroke-[#C7A45D]/20" />
                <line x1="120" y1="50" x2="120" y2="350" className="stroke-[#64748B]/10" />
                <line x1="280" y1="50" x2="280" y2="350" className="stroke-[#64748B]/10" />
                
                {/* Concentric rings of influence */}
                <circle cx="200" cy="200" r="100" className="stroke-[#C7A45D]/30" />
                <circle cx="200" cy="200" r="60" className="stroke-white/10" />
                <circle cx="200" cy="200" r="140" className="stroke-white/5" />
                
                {/* Polished Academic Crest details in the center */}
                <g className="stroke-[#C7A45D]" strokeWidth="2" fill="none">
                  {/* Outer Shield-like Hexagon */}
                  <polygon points="200,165 230,182.5 230,217.5 200,235 170,217.5 170,182.5" className="fill-[#0B1F3A]" />
                  {/* Institutional Pillars */}
                  <rect x="182" y="185" width="6" height="30" className="fill-[#C7A45D]" />
                  <rect x="197" y="180" width="6" height="40" className="fill-[#C7A45D]" />
                  <rect x="212" y="185" width="6" height="30" className="fill-[#C7A45D]" />
                  {/* Top roof of pillar */}
                  <polygon points="178,180 200,168 222,180" className="fill-[#C7A45D]/20" />
                  {/* Base support */}
                  <line x1="175" y1="220" x2="225" y2="220" />
                </g>

                {/* Satellite data nodes to represent digital science data */}
                <circle cx="120" cy="120" r="4" className="fill-[#C7A45D]" />
                <line x1="120" y1="124" x2="170" y2="182.5" className="stroke-[#C7A45D]/40 stroke-dasharray-[2_2]" />

                <circle cx="280" cy="120" r="4" className="fill-white" />
                <line x1="280" y1="124" x2="230" y2="182.5" className="stroke-white/20 stroke-dasharray-[2_2]" />

                <circle cx="280" cy="280" r="4" className="fill-[#C7A45D]" />
                <line x1="280" y1="276" x2="230" y2="217.5" className="stroke-[#C7A45D]/40 stroke-dasharray-[2_2]" />

                <circle cx="120" cy="280" r="4" className="fill-white" />
                <line x1="120" y1="276" x2="170" y2="217.5" className="stroke-white/20 stroke-dasharray-[2_2]" />
              </svg>

              {/* Foreground float overlay showing SEC Legacy */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#0B1F3A]/90 border border-[#C7A45D]/30 shadow-2xl p-4 rounded-lg flex items-center gap-3">
                <Building className="w-8 h-8 text-[#C7A45D] shrink-0" />
                <div>
                  <h4 className="text-[11px] font-mono tracking-widest text-[#C7A45D] uppercase font-bold">SEC Standard Legacy</h4>
                  <p className="text-white text-xs font-light leading-relaxed">Continuous policymaking contribution in Asia-Pacific since 1993.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section id="credibility-strip" className="bg-[#FFFFFF] border-y border-[#E5E7EB] py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x-0 md:divide-x divide-gray-100">
            
            <div className="flex flex-col items-center p-2">
              <span className="text-3xl font-serif font-bold text-[#0B1F3A]" id="cred-legacy">1993</span>
              <span className="text-xxs tracking-wider uppercase text-[#64748B] font-semibold mt-1">SEC Legacy Incorporation</span>
            </div>

            <div className="flex flex-col items-center p-2">
              <span className="text-3xl font-serif font-bold text-[#0B1F3A]" id="cred-publications">13+</span>
              <span className="text-xxs tracking-wider uppercase text-[#64748B] font-semibold mt-1">Foundational Studies</span>
            </div>

            <div className="flex flex-col items-center p-2">
              <span className="text-3xl font-serif font-bold text-[#0B1F3A]" id="cred-influence">National</span>
              <span className="text-xxs tracking-wider uppercase text-[#64748B] font-semibold mt-1">Executive & Senate Reach</span>
            </div>

            <div className="flex flex-col items-center p-2">
              <div className="flex items-center gap-1">
                <span className="text-3xl font-serif font-bold text-[#0B1F3A]" id="cred-evidence">100%</span>
              </div>
              <span className="text-xxs tracking-wider uppercase text-[#64748B] font-semibold mt-1">Evidence-Based Science</span>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT THINK TANK */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F7F2]">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C7A45D] text-xs font-mono font-bold tracking-widest uppercase block mb-3">Institutional Profile</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0B1F3A] font-bold tracking-tight">
              About StratSearch Foundation
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A45D] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Narrative Box - 7 cols */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <h3 className="font-serif text-2xl text-[#0B1F3A] leading-snug">
                Providing evidence-based research to private and public entities involved in national policymaking.
              </h3>
              
              <p className="text-sm text-[#1F2933] leading-relaxed font-light">
                Originally SEC-registered in 1993 as the <strong>Center for Asia-Pacific Studies (CENAPSIS)</strong>, StratSearch Foundation, Inc. (SSFI) has matured from regional academic exploration into a focal policy development institute. We operate actively at the complex vertical integration where government agenda-setting, administrative policy development, and civil service execution intersect.
              </p>
              
              <p className="text-sm text-[#1F2933] leading-relaxed font-light">
                Through our historical advisory partnerships with executive agencies, law-drafting committees in legislative houses, private conglomerates, and regional security structures, SSFI supplies precise empirical data, socio-economic calculations, and non-partisan academic integrity.
              </p>

              {/* Callout highlights */}
              <div className="p-5 bg-white border-l-4 border-[#C7A45D] rounded-r-lg shadow-sm">
                <p className="font-sans font-medium text-xs text-[#0B1F3A] leading-relaxed uppercase tracking-wider mb-1">
                  Cross-Collaborative Charter
                </p>
                <p className="text-xs text-[#64748B] italic leading-relaxed">
                  "SSFI disseminates research studies in cooperation with the private sector, government agencies, international non-government development actors, and local academic institutions."
                </p>
              </div>

            </div>

            {/* Right Abstract Box (Structural Pillar Design) - 5 cols */}
            <div className="lg:col-span-5 bg-white border border-[#E5E7EB] p-8 rounded-xl shadow-md relative overflow-hidden flex flex-col gap-6">
              {/* Corner Accent ribbon */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#C7A45D]/10 rounded-bl-full pointer-events-none"></div>
              
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0B1F3A]/5 rounded-lg border border-[#0B1F3A]/10">
                  <Activity className="w-6 h-6 text-[#0B1F3A]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#0B1F3A]">Strategic Core Focus</h4>
              </div>
              
              <p className="text-xs text-[#64748B] leading-relaxed">
                Our approach bypasses short-term political convenience. We establish multi-decade research panels dedicated to foundational policy hurdles, tracking regional institutional challenges in Southeast Asia with academic rigour.
              </p>

              <div className="border-t border-[#E5E7EB] pt-6 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C7A45D] mt-0.5 shrink-0" />
                  <div>
                    <h5 className="font-sans font-semibold text-xs text-[#0B1F3A]">Original SEC Heritage</h5>
                    <p className="text-[11px] text-[#64748B]">Established 1993 as the Center for Asia-Pacific Studies.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C7A45D] mt-0.5 shrink-0" />
                  <div>
                    <h5 className="font-sans font-semibold text-xs text-[#0B1F3A]">Policy-Focused Framework</h5>
                    <p className="text-[11px] text-[#64748B]">Addressing executive, legislative, and judicial concerns.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-[#C7A45D] mt-0.5 shrink-0" />
                  <div>
                    <h5 className="font-sans font-semibold text-xs text-[#0B1F3A]">National Reach</h5>
                    <p className="text-[11px] text-[#64748B]">Headquartered in Quezon City with linkages across institutions.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section id="mission" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C7A45D] text-xs font-mono font-bold tracking-widest uppercase block mb-3">Charter Directives</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0B1F3A] font-bold tracking-tight">
              Mission & Core Objectives
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A45D] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card 1: Evidence Based */}
            <div className="group bg-[#F8F7F2] border border-[#E5E7EB] hover:border-[#C7A45D]/40 p-10 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col gap-5">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0B1F3A] group-hover:bg-[#C7A45D] transition-colors"></div>
              
              <div className="p-3 bg-[#0B1F3A] inline-flex rounded-lg w-fit text-white">
                <BookOpen className="w-6 h-6 " />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#0B1F3A] font-bold">
                Evidence-Based Policy Research
              </h3>

              <p className="text-xs sm:text-sm text-[#1F2933] leading-relaxed font-light">
                To initiate, structure, and deliver high-integrity scientific and socio-economic research studies covering developmental issues, governance bottlenecks, regional integration limits, and community vulnerabilities. We focus on providing precise evidence, removing biased speculation, and identifying strategic policy avenues.
              </p>
              
              <ul className="mt-auto space-y-2.5 pt-4 border-t border-[#E5E7EB] text-xs font-medium text-[#64748B]">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#C7A45D] rounded-full"></div> Broad socio-demographic tracking</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#C7A45D] rounded-full"></div> Transnational cooperation analyses</li>
              </ul>
            </div>

            {/* Card 2: Public Assistance */}
            <div className="group bg-[#F8F7F2] border border-[#E5E7EB] hover:border-[#C7A45D]/40 p-10 rounded-2xl transition-all duration-300 relative overflow-hidden flex flex-col gap-5">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0B1F3A] group-hover:bg-[#C7A45D] transition-colors"></div>
              
              <div className="p-3 bg-[#0B1F3A] inline-flex rounded-lg w-fit text-white">
                <Scale className="w-6 h-6" />
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#0B1F3A] font-bold">
                Supporting Policymaking Entities
              </h3>

              <p className="text-xs sm:text-sm text-[#1F2933] leading-relaxed font-light">
                To proactively assist public offices, legislative commissions, departments of state, and municipal administrations in crafting, vetting, validating, and implementing policies. By bridging theoretical science with administrative feasibility, we help translate policy guidelines into effective local public actions.
              </p>
              
              <ul className="mt-auto space-y-2.5 pt-4 border-t border-[#E5E7EB] text-xs font-medium text-[#64748B]">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#C7A45D] rounded-full"></div> Government curriculum coordination</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#C7A45D] rounded-full"></div> Structural project execution audits</li>
              </ul>
            </div>

          </div>

          {/* Core Quote Panel */}
          <div className="mt-16 bg-[#0B1F3A] text-white p-8 sm:p-12 rounded-2xl relative overflow-hidden border border-[#C7A45D]/30 shadow-xl">
            <div className="absolute right-0 bottom-0 opacity-5 w-60 h-60 pointer-events-none transform translate-x-12 translate-y-12">
              <Building className="w-full h-full text-[#C7A45D]" />
            </div>
            
            <div className="max-w-3xl relative z-10 flex flex-col gap-4">
              <p className="text-xs uppercase font-mono tracking-widest text-[#C7A45D] font-bold">Executive Charter Conviction</p>
              <blockquote className="font-serif text-lg sm:text-xl italic leading-relaxed text-[#F8F7F2]">
                "Our fundamental objective is to deepen the quality, accountability, and reach of public action by grounding policy directions and evaluation in rigorous research and strategic foresight."
              </blockquote>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-0.5 bg-[#C7A45D]"></div>
                <p className="text-xs font-mono text-[#F8F7F2] uppercase tracking-wider">SSFI Board of Trustees & Academic Panel</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CORE SERVICES */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F7F2]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C7A45D] text-xs font-mono font-bold tracking-widest uppercase block mb-3">Institutional Capabilities</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0B1F3A] font-bold tracking-tight">
              Our Core Services
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A45D] mx-auto mt-4"></div>
            <p className="text-sm text-[#64748B] mt-4 font-light max-w-xl mx-auto">
              SSFI offers seven interconnected service domains aiding state departments, corporate sectors, and multilateral developmental teams.
            </p>
          </div>

          {/* Services Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white border border-[#E5E7EB] hover:border-[#C7A45D]/40 p-8 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col gap-4 group hover:-translate-y-1"
                id={`service-card-${index}`}
              >
                <div className="p-3 bg-[#0B1F3A]/5 rounded-lg w-fit group-hover:bg-[#0B1F3A] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif font-bold text-base text-[#0B1F3A] tracking-tight group-hover:text-[#C7A45D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-auto pt-2 flex items-center justify-between text-xs font-semibold text-[#0B1F3A]/80 group-hover:text-[#C7A45D] transition-colors">
                  <span>Capability Ready</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STRATEGIC THEMES SECTION */}
      <section id="themes" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0B1F3A] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 animate-fade-in">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C7A45D] text-xs font-mono font-bold tracking-widest uppercase block mb-3">Research Agendas</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] font-bold tracking-tight">
              Strategic Research Themes
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A45D] mx-auto mt-4"></div>
            <p className="text-sm text-[#64748B] mt-4 font-light max-w-xl mx-auto">
              Primary areas of investigative query, field analysis, and publication conducted in coordination with academic panels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategicThemes.map((theme, index) => (
              <div 
                key={theme.id}
                className="bg-white/5 border border-white/10 hover:border-[#C7A45D]/40 p-6 rounded-xl transition-all duration-300 flex flex-col justify-between group"
                id={`theme-card-${index}`}
              >
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-[#C7A45D] font-semibold tracking-wider block">THEME 0{index + 1}</span>
                  <h3 className="font-serif font-bold text-sm text-white group-hover:text-[#C7A45D] transition-colors leading-snug">
                    {theme.title}
                  </h3>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed mt-4 font-normal">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* EXEC LEADERSHIP EXECUTIVE COMMITTEE */}
      <section id="leadership" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C7A45D] text-xs font-mono font-bold tracking-widest uppercase block mb-3">Academic Direction</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0B1F3A] font-bold tracking-tight">
              Executive Committee & Trustees
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A45D] mx-auto mt-4"></div>
            <p className="text-sm text-[#64748B] mt-4 font-light max-w-xl mx-auto">
              Our directors combine academic credentials with years of administrative, legislative, and international project execution expertise.
            </p>
          </div>

          {/* Directors Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Dr. Clarita Carlos - 6 cols */}
            <div className="md:col-span-6 border border-[#E5E7EB] hover:border-[#C7A45D]/30 p-6 sm:p-10 rounded-2xl bg-[#F8F7F2]/40 hover:shadow-lg transition-all duration-300 flex flex-col gap-6 group" id="leader-card-carlos">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-[#E5E7EB]">
                {/* Academic Profile Picture Placeholder */}
                <div className="w-20 h-20 rounded-full border-2 border-[#C7A45D] overflow-hidden bg-[#0B1F3A] flex items-center justify-center relative shadow-md group-hover:scale-105 transition-transform shrink-0">
                  {/* Styled academic illustration */}
                  <span className="font-serif font-bold text-white text-3xl">CC</span>
                  {/* Golden overlay tag */}
                  <div className="absolute bottom-0 inset-x-0 bg-[#C7A45D] text-[9px] text-[#0B1F3A] py-0.5 uppercase tracking-widest font-mono text-center font-bold">ED</div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0B1F3A]">Dr. Clarita R. Carlos</h3>
                  <p className="text-[#C7A45D] text-xs font-mono uppercase tracking-wider mt-1">Executive Director</p>
                  <p className="text-[10px] text-[#64748B] font-mono mt-1">Former National Security Adviser (NEA) • UP Professor</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#1F2933] leading-relaxed font-light">
                <p>
                  Dr. Clarita R. Carlos serves as the principal intellectual director of StratSearch Foundation. A globally respected scholar and public thinker, she is a distinguished retired Professor of Political Science at the <strong className="font-semibold text-slate-800">University of the Philippines Diliman</strong>, an authority on defense strategy and deep foreign policy alignment, and an active geopolitical analyst.
                </p>
                <p>
                  She has authored seminal analytical publications assessing electoral, legislative, security, and administrative bureaucracy structures within local and ASEAN polities. 
                </p>
                <p>
                  A recipient of numerous scholarships, she was a <strong className="font-semibold text-slate-800">Fulbright Visiting Fellow</strong> researching Political Psychology at Cornell University and a Senior Fulbright scholar analyzing Comparative Foreign Policy Analysis at UCLA.
                </p>
              </div>

              {/* Verified Badge info */}
              <div className="mt-2 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xxs font-mono text-[#64748B]">
                <span>Credentials Verified</span>
                <span className="text-[#C7A45D] font-bold">UP Diliman / Fulbright Alumna</span>
              </div>

            </div>

            {/* Dennis M. Lalata - 6 cols */}
            <div className="md:col-span-6 border border-[#E5E7EB] hover:border-[#C7A45D]/30 p-6 sm:p-10 rounded-2xl bg-[#F8F7F2]/40 hover:shadow-lg transition-all duration-300 flex flex-col gap-6 group" id="leader-card-lalata">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-[#E5E7EB]">
                {/* Profile Placeholder */}
                <div className="w-20 h-20 rounded-full border-2 border-[#C7A45D] overflow-hidden bg-[#12355B] flex items-center justify-center relative shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <span className="font-serif font-bold text-white text-3xl">DL</span>
                  {/* Golden tag */}
                  <div className="absolute bottom-0 inset-x-0 bg-[#C7A45D] text-[9px] text-[#0B1F3A] py-0.5 uppercase tracking-widest font-mono text-center font-bold">PM</div>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0B1F3A]">Dennis M. Lalata</h3>
                  <p className="text-[#C7A45D] text-xs font-mono uppercase tracking-wider mt-1">Project & Program Manager</p>
                  <p className="text-[10px] text-[#64748B] font-mono mt-1">Senior Program Evaluator • UP Journalism Alumnus</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 text-xs sm:text-sm text-[#1F2933] leading-relaxed font-light">
                <p>
                  Mr. Dennis M. Lalata manages active operations, coordination, and inter-organizational contracts. Across two decades, he has successfully directed and mapped projects spanning the Philippine state landscape, including departments across the <strong className="font-semibold text-slate-800">Executive, Legislative, and Judiciary branches</strong>.
                </p>
                <p>
                  His work extends to coordinating research parameters with domestic corporations, international developmental groups, and NGO collectives, ensuring timelines, empirical metrics, and publication standards are meticulously met.
                </p>
                <p>
                  He completed his <strong className="font-semibold text-slate-800">A.B. Communication degree, Major in Journalism, Cum Laude</strong> from the University of the Philippines Diliman, focusing his early writing on political trends and electoral records.
                </p>
              </div>

              {/* Verified Badge info */}
              <div className="mt-2 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xxs font-mono text-[#64748B]">
                <span>Credentials Verified</span>
                <span className="text-[#C7A45D] font-bold">UP Diliman (Cum Laude)</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* PUBLICATIONS LIBRARY WITH SCHOLARLY SEARCH */}
      <section id="publications" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F7F2] border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#C7A45D] text-xs font-mono font-bold tracking-widest uppercase block mb-3">Academic Repositories</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0B1F3A] font-bold tracking-tight">
              Foundational Research Library
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A45D] mx-auto mt-4"></div>
            <p className="text-sm text-[#64748B] mt-4 font-light max-w-xl mx-auto">
              Search and filter SSFI's academic publications from 1996 to present. Access to full text can be requested via our secure educational copy request portal.
            </p>
          </div>

          {/* SEARCH & FILTER INTERFACES COMBINED */}
          <div className="bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-sm mb-10 flex flex-col gap-6">
            
            {/* Search Bar Line */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-3.5 text-[#64748B]/70" />
              <input
                id="search-input"
                type="text"
                placeholder="Search research titles, topics, or authors (e.g. 'electoral', 'ASEAN', 'Carlos')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] bg-[#F8F7F2]/25 focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C7A45D] placeholder:text-[#64748B]/60 transition"
                aria-label="Search publications"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Tabs Grid */}
            <div className="flex flex-col gap-4">
              
              {/* Category Filter Tab Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full">
                <span className="text-xxs font-mono uppercase tracking-wider text-[#64748B] shrink-0 font-bold">Research Area:</span>
                <div className="flex flex-wrap gap-1.5 w-full">
                  {uniqueCategories.map(cat => (
                    <button
                      key={cat}
                      id={`cat-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#0B1F3A] text-[#C7A45D]' 
                          : 'bg-[#F8F7F2] text-[#1F2933] hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status / Year Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full border-t border-slate-100 pt-4">
                <span className="text-xxs font-mono uppercase tracking-wider text-[#64748B] shrink-0 font-bold">Status:</span>
                <div className="flex gap-2">
                  {[
                    { id: 'All', label: 'All States' },
                    { id: 'In Press', label: '📖 In Press / Forthcoming (3)' },
                    { id: 'Published', label: '✅ Published Studies (10)' }
                  ].map(stat => (
                    <button
                      key={stat.id}
                      onClick={() => setSelectedStatus(stat.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                        selectedStatus === stat.id 
                          ? 'bg-amber-150 border border-[#C7A45D] text-[#0B1F3A]' 
                          : 'bg-slate-50 border border-[#E5E7EB] text-[#64748B] hover:bg-slate-150 cursor-pointer'
                      }`}
                    >
                      {stat.label}
                    </button>
                  ))}
                </div>
                
                {/* Result count indicators */}
                <div className="ml-auto text-xxs font-mono text-[#64748B]">
                  Found: <strong>{filteredPublications.length}</strong> publications
                </div>
              </div>

            </div>

          </div>

          {/* PUBLICATIONS DISPLAY GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="publications-grid">
            <AnimatePresence mode="popLayout">
              {filteredPublications.length > 0 ? (
                filteredPublications.map(pub => (
                  <motion.div
                    layout
                    key={pub.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 bg-white border border-[#E5E7EB] hover:border-[#C7A45D]/40 rounded-xl hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-3">
                      
                      {/* Publication Meta Top */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono tracking-wider font-semibold text-[#C7A45D] uppercase bg-[#C7A45D]/10 px-2.5 py-1 rounded-md">
                          {pub.categoryLabel}
                        </span>
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 px-2 py-0.5 rounded ${
                          pub.status === 'In Press' 
                            ? 'text-amber-700 bg-amber-50' 
                            : 'text-emerald-700 bg-emerald-50'
                        }`}>
                          <Calendar className="w-3 h-3" /> {pub.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif font-bold text-[#0B1F3A] leading-snug group-hover:text-[#C7A45D] transition-colors text-base">
                        {pub.title}
                      </h3>

                      {/* Author */}
                      <p className="text-xxs font-mono text-[#64748B]/90 italic">
                        Author/Convener: {pub.author}
                      </p>

                      {/* Short summary description */}
                      <p className="text-xs text-[#1F2933]/80 leading-relaxed font-light mt-1 border-t border-[#F8F7F2] pt-3">
                        {pub.description}
                      </p>

                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-[#F8F7F2] mt-5 pt-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#64748B]">
                        Identifier: SSFI-{pub.id.toUpperCase()}
                      </span>
                      <button 
                        onClick={() => setSelectedPaper(pub)}
                        id={`request-btn-${pub.id}`}
                        className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded transition ${
                          pub.status === 'In Press'
                            ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 cursor-pointer'
                            : 'bg-[#0B1F3A]/5 text-[#0B1F3A]/90 hover:bg-[#0B1F3A] hover:text-white cursor-pointer'
                        }`}
                      >
                        {pub.status === 'In Press' ? 'Notify on Press' : 'Request File'} <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-16 bg-white border border-[#E5E7EB] rounded-2xl">
                  <BookOpen className="w-12 h-12 text-[#64748B]/40 mx-auto mb-4" />
                  <h3 className="font-serif text-lg text-slate-800 font-bold">No research matching query</h3>
                  <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto font-light">
                    Your search yielded no publications. Consider broadening keywords (e.g., matching "electoral", "cooperation", "ASEAN", "studies").
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedStatus('All'); }}
                    className="mt-4 text-xs font-mono font-bold bg-[#0B1F3A]/5 hover:bg-[#0B1F3A] text-[#0B1F3A] hover:text-white px-4 py-2 rounded-lg transition"
                  >
                    Reset Active Filters
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Educational Use Notice */}
          <div className="mt-8 p-5 bg-[#FFFFFF] border-l-4 border-[#C7A45D] rounded-r-xl text-xs leading-relaxed text-[#64748B] max-w-5xl mx-auto shadow-sm flex items-start gap-4">
            <Info className="w-5 h-5 text-[#C7A45D] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Notice on Educational & State Distribution:</span>
              Through SSFI's science advocacy, physical/PDF publications are archived securely. Research is dispatched pro-bono for state departments, legislative members, scientific collectives, and graduate scholars upon verified requests validating usage terms.
            </div>
          </div>

        </div>
      </section>

      {/* ACTIVITIES & PUBLIC EVENTS SCHEDULER */}
      <section id="events" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C7A45D] text-xs font-mono font-bold tracking-widest uppercase block mb-3">Conferences & Forums</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0B1F3A] font-bold tracking-tight">
              Activities & Events
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A45D] mx-auto mt-4"></div>
            <p className="text-sm text-[#64748B] mt-4 font-light max-w-xl mx-auto">
              SSFI convenes stakeholder consultations, elite roundtables, and regional forums uniting experts across governmental, civil, and corporate sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Left explanation column */}
            <div className="md:col-span-5 flex flex-col justify-center gap-5">
              <h3 className="font-serif text-2xl text-[#0B1F3A]">Stakeholder Engagement</h3>
              <p className="text-xs sm:text-sm text-[#1F2933] leading-relaxed font-light">
                Our forums establish open channels for evidence-based science distribution, resolving operational questions before administrative policies are written. 
              </p>
              <p className="text-xs sm:text-sm text-[#1F2933] leading-relaxed font-light">
                Topics are selected proactively based on upcoming national legislative drafts, strategic defense adjustments, or regional economic pact deadlines.
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A]">
                <span>To propose partnerships:</span>
                <a href="#contact" onClick={(e) => navigateTo(e, 'contact')} className="text-[#C7A45D] hover:underline hover:text-amber-700">Contact secretariat</a>
              </div>
            </div>

            {/* Right card layout (professional announcement card) */}
            <div className="md:col-span-7 bg-[#F8F7F2] border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-sm">
              {/* background design contour lines */}
              <div className="absolute right-0 top-0 w-32 h-32 border-b border-l border-[#C7A45D]/10 rounded-bl-full"></div>
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0B1F3A] rounded-lg border border-[#C7A45D]/30 flex items-center justify-center text-[#C7A45D]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#0B1F3A]">Upcoming Events Planning</h4>
                    <span className="text-xxs font-mono text-[#64748B] block mt-0.5">Third Quarter, Academic Year 2026</span>
                  </div>
                </div>

                <div className="border-t border-[#E5E7EB] pt-6 flex flex-col gap-4">
                  <div className="p-4 bg-white rounded-lg border border-[#E5E7EB] flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                    <div>
                      <h5 className="text-xs font-semibold text-[#0B1F3A]">Roundtable: Child Domestic Labor Safeguard Guidelines</h5>
                      <p className="text-[10px] text-[#64748B]">To be announced formally inside general press releases.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-[#E5E7EB] flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                    <div>
                      <h5 className="text-xs font-semibold text-[#0B1F3A]">Symposium: Disaster Risk Adaptations in Municipal Arenas</h5>
                      <p className="text-[10px] text-[#64748B]">Schedule and keynote panelists forthcoming.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#E5E7EB] pt-4 text-xxs font-mono text-center text-[#64748B]">
                🚨 Inquiries and invitations will be published via ssfiphil@gmail.com
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CONTACT INFORMATION & FORM CLIENT SIDE */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F7F2]">
        <div className="max-w-6xl mx-auto">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#C7A45D] text-xs font-mono font-bold tracking-widest uppercase block mb-3">Partner Consultations</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0B1F3A] font-bold tracking-tight">
              Connect With SSFI Secretariat
            </h2>
            <div className="w-16 h-0.5 bg-[#C7A45D] mx-auto mt-4"></div>
            <p className="text-sm text-[#64748B] mt-4 font-light max-w-xl mx-auto">
              Please use our contact pathways for strategic advisory bids, curriculum collaboration initiatives, or program audit tenders.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Info Column - 5 cols */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              <div className="bg-[#0B1F3A] text-white p-8 rounded-2xl border border-[#C7A45D]/30 shadow-xl flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 w-44 h-44 transform translate-x-8 translate-y-8 pointer-events-none">
                  <MapPin className="w-full h-full" />
                </div>
                
                <h3 className="font-serif text-lg font-bold text-[#C7A45D] tracking-wide uppercase font-mono text-xs">Official Secretariat</h3>
                
                <div className="flex items-start gap-4 pb-4 border-b border-white/10">
                  <MapPin className="w-6 h-6 text-[#C7A45D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Central Head Office</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed mt-1">
                      12 Makadios St., Sikatuna Village,<br />
                      Quezon City, Philippines 1101
                    </p>
                    <span className="text-[10px] text-[#C7A45D] font-mono mt-2 block">National Capital Region (NCR)</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[#C7A45D] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Electronic Mail</h4>
                    <p className="text-sm text-amber-50 font-semibold leading-relaxed mt-1">
                      ssfiphil@gmail.com
                    </p>
                    <span className="text-[10px] text-[#64748B] font-mono mt-1 block">Response within 48 operations hours.</span>
                  </div>
                </div>
                
              </div>

              {/* Sikatuna Village Styled Map Placeholder */}
              <div className="border border-[#E5E7EB] bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#1F2933]">Quezon City Registry</span>
                  </div>
                  <span className="text-xxs font-mono text-[#64748B]">Sikatuna District Bounds</span>
                </div>
                {/* Abstract visual coordinate representation of Quezon City */}
                <div className="h-44 bg-[#F8F7F2] rounded-lg border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
                  {/* Styled geographical grids */}
                  <div className="absolute inset-x-0 top-1/4 h-px bg-[#0B1F3A]/5"></div>
                  <div className="absolute inset-x-0 top-2/4 h-px bg-[#0B1F3A]/5"></div>
                  <div className="absolute inset-x-0 top-3/4 h-px bg-[#0B1F3A]/5"></div>
                  <div className="absolute inset-y-0 left-1/4 w-px bg-[#0B1F3A]/5"></div>
                  <div className="absolute inset-y-0 left-2/4 w-px bg-[#0B1F3A]/5"></div>
                  <div className="absolute inset-y-0 left-3/4 w-px bg-[#0B1F3A]/5"></div>
                  
                  {/* Concentric location marker */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#0B1F3A]/10 border border-[#C7A45D] flex items-center justify-center shadow-lg transform hover:scale-110 transition">
                    <MapPin className="w-5 h-5 text-[#C7A45D]" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-ping"></span>
                  </div>

                  <span className="font-serif font-bold text-xs text-[#0B1F3A] mt-3 z-10">Makadios Street Precinct</span>
                  <p className="text-[10px] text-[#64748B] max-w-xs leading-relaxed mt-1 z-10">
                    Proximity parameters: Neighboring University of the Philippines Diliman and central governmental agency offices.
                  </p>
                </div>
                <a 
                  href="mailto:ssfiphil@gmail.com" 
                  className="text-center font-bold text-xs text-[#0B1F3A] hover:text-[#C7A45D] transition block mt-1"
                >
                  ✉ Direct Email: ssfiphil@gmail.com
                </a>
              </div>

            </div>

            {/* Right Form - 7 cols */}
            <div className="lg:col-span-7 bg-white border border-[#E5E7EB] p-8 sm:p-10 rounded-2xl shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#0B1F3A] mb-6 border-b border-[#F8F7F2] pb-4">
                Institutional Correspondence Form
              </h3>

              {contactSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl flex flex-col items-center text-center gap-4 animate-fade-in">
                  <CheckCircle className="w-12 h-12 text-emerald-600" />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-emerald-900">Correspondence Logged</h4>
                    <p className="text-xs text-emerald-700 mt-1 leading-relaxed max-w-md">
                      Your institutional transmission was filed in our Central Secretariat. A response will be coordinated via the registered email within 2 normal operation days.
                    </p>
                  </div>
                  <button 
                    onClick={() => setContactSubmitted(false)}
                    className="text-xs text-[#0B1F3A] hover:text-[#C7A45D] font-mono font-bold underline focus:outline-none"
                  >
                    Transmit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5 animate-focus-field">
                      <label htmlFor="name" className="text-xxs font-mono uppercase tracking-wider text-[#64748B] font-bold">Your Name / Title</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. Dean Sofia Santos, PhD"
                        className="p-3 border border-[#E5E7EB] rounded-lg text-xs bg-[#F8F7F2]/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A45D] transition"
                        aria-label="Your full name"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xxs font-mono uppercase tracking-wider text-[#64748B] font-bold">Institutional Email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="e.g. ssantos@up.edu.ph"
                        className="p-3 border border-[#E5E7EB] rounded-lg text-xs bg-[#F8F7F2]/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A45D] transition"
                        aria-label="Institutional email address"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xxs font-mono uppercase tracking-wider text-[#64748B] font-bold">Strategic Subject</label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="e.g. Proposal for Collaborative Program Evaluation Support"
                      className="p-3 border border-[#E5E7EB] rounded-lg text-xs bg-[#F8F7F2]/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A45D] transition"
                      aria-label="Subject of your message"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xxs font-mono uppercase tracking-wider text-[#64748B] font-bold">Correspondence Content</label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Please delineate detailed parameters of your policy query, organizational credentials, and collaboration intentions..."
                      className="p-3 border border-[#E5E7EB] rounded-lg text-xs bg-[#F8F7F2]/30 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A45D] transition resize-none"
                      aria-label="Message content"
                    />
                  </div>

                  <div className="text-[11px] font-normal leading-normal text-[#64748B] bg-[#F8F7F2] p-3.5 rounded-lg border border-[#E5E7EB]">
                    🔒 <strong>Privacy Covenant:</strong> StratSearch Foundation complies with secure document routing policies. Information inputted will solely map to the CENTRAL secretarial logs, never sold or routed to external entities.
                  </div>

                  <button
                    id="submit-contact"
                    type="submit"
                    disabled={contactLoading}
                    className="flex items-center justify-center gap-2 bg-[#0B1F3A] hover:bg-[#12355B] text-white font-bold py-3 px-5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow disabled:opacity-50"
                  >
                    {contactLoading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-white animate-spin"></span>
                        Transmitting...
                      </>
                    ) : (
                      <>
                        File Official Communication <Send className="w-3.5 h-3.5 text-[#C7A45D]" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0B1F3A] text-[#64748B] border-t border-[#C7A45D]/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Col 1 Wordmark description - 5 cols */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#FFFFFF]/10 border border-[#C7A45D] flex items-center justify-center text-[#C7A45D] font-serif font-bold text-xs">
                SS
              </div>
              <span className="font-serif text-white font-semibold text-base tracking-wide uppercase text-sm">
                StratSearch Foundation, Inc.
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-light leading-relaxed max-w-sm">
              StratSearch Foundation, Inc. is a non-profit, non-partisan SEC legacy think tank representing academic integrity, evidence-based development studies, and strategic cooperation in Southeast Asian polities since 1993.
            </p>
            <p className="text-[10px] text-[#64748B]/70 font-mono mt-1">
              Central Secretariat ID • Sec Registration No. CAPS-1993-4126
            </p>
          </div>

          {/* Col 2 Quick navigation - 3 cols */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-white/90 font-bold border-b border-white/5 pb-2">
              Central Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#about" onClick={(e) => navigateTo(e, 'about')} id="footer-link-about" className="hover:text-white transition">About SSFI</a>
              <a href="#mission" onClick={(e) => navigateTo(e, 'mission')} id="footer-link-mission" className="hover:text-white transition">Core Mission</a>
              <a href="#services" onClick={(e) => navigateTo(e, 'services')} id="footer-link-services" className="hover:text-white transition">Capabilities</a>
              <a href="#themes" onClick={(e) => navigateTo(e, 'themes')} id="footer-link-themes" className="hover:text-white transition">Researches</a>
              <a href="#leadership" onClick={(e) => navigateTo(e, 'leadership')} id="footer-link-leadership" className="hover:text-white transition">Leadership</a>
              <a href="#publications" onClick={(e) => navigateTo(e, 'publications')} id="footer-link-publications" className="hover:text-white transition">Publications</a>
              <a href="#events" onClick={(e) => navigateTo(e, 'events')} id="footer-link-events" className="hover:text-white transition">Forums</a>
              <a href="#contact" onClick={(e) => navigateTo(e, 'contact')} id="footer-link-contact" className="hover:text-white transition">Address Central</a>
            </div>
          </div>

          {/* Col 3 Contact info recap - 4 cols */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs uppercase tracking-widest font-mono text-white/90 font-bold border-b border-white/5 pb-2">
              Primary Communications
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#C7A45D] shrink-0" />
                <span className="leading-relaxed">12 Makadios St., Sikatuna Village, QC, Philippines</span>
              </div>
              <div className="flex gap-2 items-center mt-1">
                <Mail className="w-4 h-4 text-[#C7A45D] shrink-0" />
                <a href="mailto:ssfiphil@gmail.com" className="hover:text-white underline transition">ssfiphil@gmail.com</a>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#64748B]">Secure Mail Gateway</span>
              <span className="inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500" title="Central routing active"></span>
            </div>
          </div>

        </div>

        {/* Bottom Bar copyright & terms */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 StratSearch Foundation, Inc. (SSFI). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px]">Security Rule 2026.1 Compliance</span>
            <span className="text-[#C7A45D]/60">•</span>
            <span className="text-slate-400">Non-Profit Foundation Status</span>
          </div>
        </div>
      </footer>

      {/* FLOAT BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-30 p-3 bg-[#0B1F3A] hover:bg-[#12355B] text-white border border-[#C7A45D]/50 hover:border-[#C7A45D] rounded-full shadow-lg transition cursor-pointer"
            id="back-to-top"
          >
            <ChevronUp className="w-5 h-5 text-[#C7A45D]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* SCHOLAR REQUEST MODAL WINDOW */}
      <AnimatePresence>
        {selectedPaper && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPaper(null)}
              className="fixed inset-0 bg-black/60 z-50 pointer-events-auto"
            />
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-10 sm:top-1/2 sm:-translate-y-1/2 sm:max-w-xl mx-auto bg-white border border-[#E5E7EB] z-50 p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col gap-5 pointer-events-auto overflow-y-auto max-h-[85vh] no-scrollbar"
            >
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#0B1F3A]/5 text-[#C7A45D] rounded">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#0B1F3A] text-sm sm:text-base leading-tight">Educational File Dispatch Portal</h3>
                    <span className="text-[10px] font-mono text-[#64748B] block mt-0.5">Reference ID: SSFI-{selectedPaper.id.toUpperCase()}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPaper(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-[#64748B] transition focus:outline-none"
                  id="modal-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {requestSaved ? (
                <div className="py-8 text-center flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-emerald-50 rounded-full text-emerald-600 animate-pulse">
                    <Check className="w-10 h-10" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-slate-800">Request Successfully Routed</h4>
                  <p className="text-xs text-[#64748B] leading-relaxed max-w-sm font-light">
                    Your request credentials for <strong>"{selectedPaper.title}"</strong> have been registered in our Academic Secretariat database. The compiled document along with formal usage guidelines will dispatch to {requestForm.email}.
                  </p>
                  <p className="text-xxs font-mono text-[#C7A45D] uppercase tracking-wider font-bold">Closing Dispatcher Window...</p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="flex flex-col gap-4">
                  
                  <div className="p-4 bg-[#F8F7F2] rounded-lg border border-slate-200">
                    <h4 className="text-xxs font-mono text-[#C7A45D] uppercase tracking-wider font-bold">Target Intellectual Property</h4>
                    <p className="text-xs font-serif font-bold text-[#0B1F3A] mt-1 leading-snug">{selectedPaper.title}</p>
                    <div className="flex items-center gap-4 text-[10px] text-[#64748B] font-semibold uppercase mt-2">
                      <span>Status: {selectedPaper.status}</span>
                      <span>Year: {selectedPaper.year}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="req-name" className="text-xxs font-mono uppercase tracking-wider text-[#64748B] font-bold">Scholar/Representor Name</label>
                      <input
                        id="req-name"
                        type="text"
                        required
                        value={requestForm.name}
                        onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                        placeholder="e.g. Prof. Ricardo Perez"
                        className="p-2.5 border border-[#E5E7EB] rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A45D] transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="req-email" className="text-xxs font-mono uppercase tracking-wider text-[#64748B] font-bold">Educational/State Email</label>
                      <input
                        id="req-email"
                        type="email"
                        required
                        value={requestForm.email}
                        onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                        placeholder="e.g. rperez@up.edu.ph"
                        className="p-2.5 border border-[#E5E7EB] rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A45D] transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="req-affiliation" className="text-xxs font-mono uppercase tracking-wider text-[#64748B] font-bold">Academic Affiliation / Organization</label>
                    <input
                      id="req-affiliation"
                      type="text"
                      required
                      value={requestForm.affiliation}
                      onChange={(e) => setRequestForm({ ...requestForm, affiliation: e.target.value })}
                      placeholder="e.g. Department of Political Science, UP Diliman"
                      className="p-2.5 border border-[#E5E7EB] rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A45D] transition"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="req-purpose" className="text-xxs font-mono uppercase tracking-wider text-[#64748B] font-bold">Explicit Policy Research Intention</label>
                    <textarea
                      id="req-purpose"
                      required
                      rows={3}
                      value={requestForm.purpose}
                      onChange={(e) => setRequestForm({ ...requestForm, purpose: e.target.value })}
                      placeholder="Please trace exactly how this publication maps to educational curriculum design, policy proposal drafting, or agency consulting..."
                      className="p-2.5 border border-[#E5E7EB] rounded-lg text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C7A45D] transition resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      required
                      checked={requestForm.agreeToTerms}
                      onChange={(e) => setRequestForm({ ...requestForm, agreeToTerms: e.target.checked })}
                      className="mt-0.5"
                    />
                    <label htmlFor="agreeToTerms" className="text-[10px] text-[#64748B] leading-normal font-light">
                      I guarantee that retrieved documents will exclusively support scientific research, and academic advancement, and will comply with copyright standards of the StratSearch Foundation core panel.
                    </label>
                  </div>

                  <button
                    id="submit-request-btn"
                    type="submit"
                    className="mt-2 w-full flex items-center justify-center gap-2 bg-[#0B1F3A] hover:bg-[#12355B] text-[#FFFFFF] font-bold py-3 px-4 rounded-lg text-xs uppercase tracking-wider transition cursor-pointer"
                  >
                    File Copy Dispatch Request <FileText className="w-3.5 h-3.5 text-[#C7A45D]" />
                  </button>

                </form>
              )}

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
