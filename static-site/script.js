/**
 * StratSearch Foundation, Inc. (SSFI)
 * Standalone Static Site Interactivity Controller
 * 
 * Manages:
 * - Lucide Icon Rendering
 * - Sticky Header Scroll Changes
 * - Navigation Intersection Observers (Active States)
 * - Mobile Drawer Toggles
 * - Publications Live Filter / Global Search Engine
 * - Dynamic Copy Request Dialog Windows
 * - Contact Secretariat Email Transmitter Simulation
 */

// Full Publications database source matching React state exactly
const publications = [
  {
    id: 'pub1',
    title: 'Disaster Management in the Philippines',
    year: 'In Press',
    status: 'In Press',
    category: 'Resilience',
    categoryLabel: 'Disaster Risk & Resilience',
    author: 'StratSearch Foundation Core Research Panel',
    description: 'An exhaustive assessment of vulnerability indices, regional response logistics, and recommendations for community-based adaptation mechanisms.'
  },
  {
    id: 'pub2',
    title: 'Rapid Situational Analysis on Child Domestic Work',
    year: 'In Press',
    status: 'In Press',
    category: 'Social',
    categoryLabel: 'Labor & Social Protection',
    author: 'StratSearch Social Policy Division',
    description: 'A rapid situational audit analyzing employment conditions, domestic work vulnerabilities, and legal enforcement caps across national urban spaces.'
  },
  {
    id: 'pub3',
    title: 'Qualitative Research on Employment Arrangements, Practices and Working Conditions in Domestic Work in the Philippines',
    year: 'In Press',
    status: 'In Press',
    category: 'Social',
    categoryLabel: 'Labor & Social Protection',
    author: 'SSFI Research Workgroup on Labor Dynamics',
    description: 'A deep-dive research framework documenting informal protocols, welfare access, and institutional shortcomings of domestic helpers.'
  },
  {
    id: 'pub4',
    title: 'Towards an ASEAN Parliament: Challenges and Prospects',
    year: '2018',
    status: 'Published',
    category: 'ASEAN',
    categoryLabel: 'ASEAN & Regional Cooperation',
    author: 'Dr. Clarita R. Carlos et al.',
    description: 'A comprehensive feasibility review considering legislative integration, transnational sovereignty constraints, and comparative parliamentary structures.'
  },
  {
    id: 'pub5',
    title: 'Population Ageing in the Philippines: Issues and Challenges',
    year: '2017',
    status: 'Published',
    category: 'Social',
    categoryLabel: 'Labor & Social Protection',
    author: 'StratSearch Commission on Social Demographics',
    description: 'Analyzing demographic trajectories, financial security in older cohorts, and pension infrastructure limits to build adaptive policies.'
  },
  {
    id: 'pub6',
    title: 'Democratic Deficits in the Philippines: What is to be done?',
    year: '2010',
    status: 'Published',
    category: 'Governance',
    categoryLabel: 'Governance & Institutional Reform',
    author: 'Dr. Clarita R. Carlos',
    description: 'Analyzing bureaucratic clientelism, structural institutional flaws, and clear strategic roadmaps for public accountability in local spaces.'
  },
  {
    id: 'pub7',
    title: 'Towards Bureaucratic Reform: Issues and Challenges',
    year: '2004',
    status: 'Published',
    category: 'Electoral',
    categoryLabel: 'Electoral & Bureaucratic Reform',
    author: 'Dr. Clarita R. Carlos',
    description: 'Identifying structural issues, career path reforms, and performance-based reward paradigms inside Philippine Civil Service organs.'
  },
  {
    id: 'pub8',
    title: 'History of Electoral Reforms in the Philippines: Pre-Spanish to 1998',
    year: '1998',
    status: 'Published',
    category: 'Electoral',
    categoryLabel: 'Electoral & Bureaucratic Reform',
    author: 'SSFI Electoral Policy Panel',
    description: 'An authoritative historical compendium detailing legal frameworks, franchise development, and voting mechanisms since the pre-colonial era.'
  },
  {
    id: 'pub9',
    title: 'Selected Election Cases in the Philippines: From the Supreme Court and Electoral Tribunals',
    year: '1998',
    status: 'Published',
    category: 'Electoral',
    categoryLabel: 'Electoral & Bureaucratic Reform',
    author: 'StratSearch Legal & Jurisprudential Division',
    description: 'An organized selection of foundational legal doctrines, election challenges, and judicial decisions forming electoral precedent.'
  },
  {
    id: 'pub10',
    title: 'Elections in the Philippines from Pre-colonial Period to the Present',
    year: '1996',
    status: 'Published',
    category: 'Electoral',
    categoryLabel: 'Electoral & Bureaucratic Reform',
    author: 'Dr. Clarita R. Carlos & SSFI Scholars',
    description: 'Examining political agency, shifting social movements, patronage networks, and structural shifts from initial voting to electronic transition.'
  },
  {
    id: 'pub11',
    title: 'The Philippines in ASEAN: An Assessment of 27 Years of Cooperation in Selected Functional Areas',
    year: '1996',
    status: 'Published',
    category: 'ASEAN',
    categoryLabel: 'ASEAN & Regional Cooperation',
    author: 'StratSearch Research Team on South East Asian Polity',
    description: 'Evaluating trade policies, defense cooperation, and diplomatic milestones across three decades of Philippine membership in the bloc.'
  },
  {
    id: 'pub12',
    title: 'Political Parties in the Philippines from 1900 to the Present',
    year: '1996',
    status: 'Published',
    category: 'Governance',
    categoryLabel: 'Governance & Institutional Reform',
    author: 'Dr. Clarita R. Carlos',
    description: 'An in-depth empirical work outlining party system instability, programmatic party design deficits, and recommendations to strengthen democracy.'
  },
  {
    id: 'pub13',
    title: 'Chronicle of the 1998 Elections in the Philippines',
    year: '1996',
    status: 'Published',
    category: 'Electoral',
    categoryLabel: 'Electoral & Bureaucratic Reform',
    author: 'Dennis M. Lalata & Historical Team',
    description: 'A structural snapshot of campaign financing, party switching, candidates, and media narratives shaping the seminal 1998 nationwide ballot.'
  }
];

// Active State holding for Category and Search query
let activeCategory = 'All';
let activeSearchText = '';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render all icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Sticky Header transition
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-primaryNavy/95', 'backdrop-blur-md', 'shadow-lg', 'py-3');
      header.classList.remove('py-5');
    } else {
      header.classList.remove('bg-primaryNavy/95', 'backdrop-blur-md', 'shadow-lg', 'py-3');
      header.classList.add('py-5');
    }
  });

  // 3. Setup Navigation links highlight intersection observers
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('text-accentGold', 'border-b', 'border-accentGold');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-accentGold');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(sec => observer.observe(sec));

  // 4. Mobile Menu toggle drawer mechanisms
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openDrawer = () => {
    mobileDrawer.classList.remove('hidden');
    drawerBackdrop.classList.remove('hidden');
    setTimeout(() => {
      mobileDrawer.classList.remove('translate-x-full');
      drawerBackdrop.classList.add('opacity-100');
    }, 10);
  };

  const closeDrawer = () => {
    mobileDrawer.classList.add('translate-x-full');
    drawerBackdrop.classList.remove('opacity-100');
    setTimeout(() => {
      mobileDrawer.classList.add('hidden');
      drawerBackdrop.classList.add('hidden');
    }, 300);
  };

  hamburgerBtn.addEventListener('click', openDrawer);
  closeDrawerBtn.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 5. Initialize search input listeners
  const searchInput = document.getElementById('pub-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchText = e.target.value.trim().toLowerCase();
      renderPublicationsGrid();
    });
  }

  // Initial draw
  renderPublicationsGrid();
});

// Category filtration handler trigger
function filterPublications(categoryValue) {
  activeCategory = categoryValue;
  
  // Toggle visual styles on buttons
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.classList.remove('bg-primaryNavy', 'text-accentGold');
    btn.classList.add('bg-warmBg', 'text-charcoal', 'hover:bg-slate-200');
  });

  // Add highlight to current selected
  const activeBtn = Array.from(tabBtns).find(btn => btn.textContent.includes(categoryValue === 'ASEAN' ? 'ASEAN' : categoryValue === 'Electoral' ? 'Electoral' : categoryValue));
  if (activeBtn) {
    activeBtn.classList.remove('bg-warmBg', 'text-charcoal', 'hover:bg-slate-200');
    activeBtn.classList.add('bg-primaryNavy', 'text-accentGold');
  }

  renderPublicationsGrid();
}

// Draw list cards dynamically inside pubs-grid
function renderPublicationsGrid() {
  const grid = document.getElementById('pubs-grid');
  if (!grid) return;

  const filtered = publications.filter(pub => {
    // Search query matches
    const searchMatch = !activeSearchText || 
                        pub.title.toLowerCase().includes(activeSearchText) ||
                        pub.author.toLowerCase().includes(activeSearchText) ||
                        pub.description.toLowerCase().includes(activeSearchText);

    // Tab Category matches
    const categoryMatch = activeCategory === 'All' || 
                          pub.category.toLowerCase().includes(activeCategory.toLowerCase());

    return searchMatch && categoryMatch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-1 md:col-span-2 text-center py-16 bg-white border border-slate-200 rounded-2xl">
        <i data-lucide="book-open" class="w-12 h-12 text-slate-300 mx-auto mb-4"></i>
        <h3 class="font-serif text-lg text-slate-800 font-bold">No research matching criteria</h3>
        <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-light">Your query did not return any historical books or analyses. Try refining terms.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  grid.innerHTML = filtered.map(pub => {
    const isPress = pub.status === 'In Press';
    const statusBg = isPress ? 'bg-amber-55' : 'bg-emerald-50';
    const statusText = isPress ? 'text-amber-800' : 'text-emerald-800';
    const actionClass = isPress 
      ? 'bg-amber-50 text-amber-800 hover:bg-amber-100' 
      : 'bg-primaryNavy/5 text-primaryNavy hover:bg-primaryNavy hover:text-white';

    return `
      <div class="p-6 bg-white border border-slate-200 hover:border-accentGold/40 rounded-xl hover:shadow-md transition duration-300 flex flex-col justify-between pub-card animate-fade-in">
        <div class="flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono tracking-wider font-semibold text-accentGold uppercase bg-accentGold/10 px-2.5 py-1 rounded-md">
              ${pub.categoryLabel}
            </span>
            <span class="pub-meta text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 px-2 py-0.5 rounded ${statusBg} ${statusText}">
              <i data-lucide="calendar" class="w-3 h-3 inline"></i> ${pub.year}
            </span>
          </div>

          <h3 class="font-serif font-bold text-primaryNavy leading-snug text-base">
            ${pub.title}
          </h3>

          <p class="text-[10px] font-mono text-slate-400 italic">
            Author/Convener: ${pub.author}
          </p>

          <p class="text-xs text-charcoal/80 leading-relaxed font-light mt-1 border-t border-slate-50 pt-3">
            ${pub.description}
          </p>
        </div>

        <div class="border-t border-slate-50 mt-5 pt-4 flex items-center justify-between">
          <span class="text-[10px] font-mono text-slate-400 no-print">
            Identifier: SSFI-${pub.id.toUpperCase()}
          </span>
          <button onclick="openRequestModal('${pub.id}')" class="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded transition ${actionClass} no-print">
            ${isPress ? 'Notify' : 'Request'} <i data-lucide="external-link" class="w-3 h-3"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 6. Request Modal operations
function openRequestModal(pubId) {
  const pub = publications.find(p => p.id === pubId);
  if (!pub) return;

  const modal = document.getElementById('request-modal');
  const mainTitleOutput = document.getElementById('modal-pub-title');
  const successDiv = document.getElementById('modal-success');
  const form = document.getElementById('modal-form');

  mainTitleOutput.textContent = pub.title;
  successDiv.classList.add('hidden');
  form.classList.remove('hidden');

  modal.classList.remove('hidden');
  
  // Close triggers
  const closeModal = () => modal.classList.add('hidden');
  document.getElementById('modal-close').onclick = closeModal;
  document.getElementById('modal-backdrop').onclick = closeModal;
}

function submitRequest(e) {
  e.preventDefault();
  const form = document.getElementById('modal-form');
  const successDiv = document.getElementById('modal-success');

  form.classList.add('hidden');
  successDiv.classList.remove('hidden');
  successDiv.classList.add('flex');

  setTimeout(() => {
    document.getElementById('request-modal').classList.add('hidden');
  }, 3500);
}

// 7. Contact Secretariat transmission simulator
function submitContact(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');

  form.classList.add('hidden');
  success.classList.remove('hidden');
  success.classList.add('flex');

  setTimeout(() => {
    form.classList.remove('hidden');
    success.classList.add('hidden');
    success.classList.remove('flex');
    form.reset();
  }, 4000);
}
