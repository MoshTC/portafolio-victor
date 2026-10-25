/**
 * @file app.js
 * @description Lógica interactiva del portafolio:
 * - Sanitización preventiva de cadenas contra XSS
 * - Renderizado fiel de experiencia, educación, proyectos y habilidades según el CV
 * - Filtro interactivo de proyectos con soporte de Estado Vacío
 * - Menú hamburguesa móvil accesible con aria-expanded sincronizado
 * - Animaciones de scroll (Intersection Observer)
 * - Inicialización de íconos Lucide
 */

/**
 * Sanitiza cadenas de texto para prevenir inyecciones HTML / DOM-based XSS (OWASP ASVS L1).
 * @param {string} str 
 * @returns {string}
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[m]);
}

document.addEventListener('DOMContentLoaded', () => {
  // Validación de resiliencia de datos
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('Error: PORTFOLIO_DATA no está disponible.');
    return;
  }

  renderSkillsCategories();
  initProjectsFilter();
  renderProjects('Todos');
  renderExperienceAndEducation();
  renderCompetencies();
  initMobileMenu();
  initScrollAnimations();
  initCvDownloadAnimation();
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }
});

/* ==========================================================================
   1. HABILIDADES AGRUPADAS (SEGÚN CV)
   ========================================================================== */
function renderSkillsCategories() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.skillsCategories
    .map(
      (cat) => `
      <div class="bg-card p-6 rounded-xl border border-neutral-800 hover:border-accent/40 transition-colors">
        <h3 class="text-sm font-semibold text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true"></span>
          ${escapeHTML(cat.category)}
        </h3>
        <div class="flex flex-wrap gap-2">
          ${cat.skills
            .map(
              (s) => `
            <span class="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:border-neutral-700 transition-colors">
              ${escapeHTML(s)}
            </span>
          `
            )
            .join('')}
        </div>
      </div>
    `
    )
    .join('');
}

/* ==========================================================================
   2. FILTROS Y PROYECTOS
   ========================================================================== */
const PROJECT_FILTERS = ['Todos', 'PHP', 'JavaScript', 'Java', 'HTML5', 'MySQL'];
let activeFilter = 'Todos';

function initProjectsFilter() {
  const filterContainer = document.getElementById('project-filters');
  if (!filterContainer) return;

  filterContainer.innerHTML = PROJECT_FILTERS.map(
    (filter) => `
    <button
      class="filter-btn px-4 py-2.5 rounded-lg text-sm font-medium transition-colors select-none ${
        filter === activeFilter
          ? 'bg-accent text-white shadow-lg shadow-accent/20'
          : 'bg-card border border-neutral-800 text-gray-400 hover:text-white hover:border-neutral-600'
      }"
      data-filter="${escapeHTML(filter)}"
    >
      ${escapeHTML(filter)}
    </button>
  `
  ).join('');

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    activeFilter = btn.dataset.filter;

    document.querySelectorAll('.filter-btn').forEach((b) => {
      if (b.dataset.filter === activeFilter) {
        b.className =
          'filter-btn px-4 py-2.5 rounded-lg text-sm font-medium transition-colors select-none bg-accent text-white shadow-lg shadow-accent/20';
      } else {
        b.className =
          'filter-btn px-4 py-2.5 rounded-lg text-sm font-medium transition-colors select-none bg-card border border-neutral-800 text-gray-400 hover:text-white hover:border-neutral-600';
      }
    });

    renderProjects(activeFilter);
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  });
}

function renderProjects(filter) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered =
    filter === 'Todos'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.tech.includes(filter));

  // Manejo de Estado Vacío (Empty State)
  if (!filtered || filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center bg-card/40 rounded-xl border border-neutral-800/80 p-8">
        <i data-lucide="folder-search" class="w-10 h-10 text-neutral-500 mx-auto mb-3" aria-hidden="true"></i>
        <h3 class="text-base font-semibold text-white mb-1">No se encontraron proyectos</h3>
        <p class="text-sm text-gray-400 mb-6">No hay proyectos etiquetados bajo la categoría "${escapeHTML(filter)}".</p>
        <button
          onclick="resetProjectFilters()"
          class="px-5 py-2.5 bg-accent hover:bg-accentHover text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-accent/20"
        >
          Ver todos los proyectos
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (p) => `
    <div class="bg-card p-6 rounded-xl border border-neutral-800 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <h3 class="text-xl font-bold text-white group-hover:text-accent transition-colors">
            ${escapeHTML(p.title)}
          </h3>
          ${
            p.isInstitutional
              ? `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-950/60 border border-red-800/60 text-red-400 shrink-0">Institucional</span>`
              : `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-900 border border-neutral-800 text-gray-400 shrink-0">Proyecto</span>`
          }
        </div>
        <p class="text-gray-400 mb-6 text-sm leading-relaxed">
          ${escapeHTML(p.description)}
        </p>
        <div class="flex flex-wrap gap-2 mb-6">
          ${p.tech
            .map(
              (t) => `
            <span class="px-2 py-1 bg-neutral-900 text-gray-300 text-xs rounded border border-neutral-800">
              ${escapeHTML(t)}
            </span>
          `
            )
            .join('')}
        </div>
      </div>
      <div class="flex items-center gap-4 pt-4 border-t border-neutral-800/60">
        ${
          p.repoUrl
            ? `
          <a
            href="${escapeHTML(p.repoUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-white flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            Ver Repositorio
          </a>
        `
            : `
          <span class="text-xs text-neutral-400 flex items-center gap-1.5">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-accent" aria-hidden="true"></i> Implementación Institucional / Privada
          </span>
        `
        }
        ${
          p.demoUrl
            ? `
          <a
            href="${escapeHTML(p.demoUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm font-medium text-white flex items-center gap-1 hover:text-accent transition-colors"
          >
            <i data-lucide="external-link" class="w-4 h-4" aria-hidden="true"></i> Demo
          </a>
        `
            : ''
        }
      </div>
    </div>
  `
    )
    .join('');
}

/**
 * Restablece el filtro activo al estado inicial 'Todos'.
 */
function resetProjectFilters() {
  const allBtn = document.querySelector('.filter-btn[data-filter="Todos"]');
  if (allBtn) {
    allBtn.click();
  }
}

/* ==========================================================================
   3. EXPERIENCIA LABORAL & EDUCACIÓN (DEL CV)
   ========================================================================== */
function renderExperienceAndEducation() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  const expHTML = PORTFOLIO_DATA.experience
    .map(
      (exp) => `
    <div class="relative pl-8 border-l-2 border-neutral-800">
      <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent ring-4 ring-background" aria-hidden="true"></div>
      <div class="bg-card p-6 rounded-xl border border-neutral-800">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <span class="text-accent text-xs font-bold uppercase tracking-wider">${escapeHTML(exp.company)}</span>
          <span class="text-gray-500 text-xs font-medium">${escapeHTML(exp.period)}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-3">
          ${escapeHTML(exp.role)}
        </h3>
        <ul class="space-y-2 text-gray-400 text-sm">
          ${exp.items
            .map(
              (item) => `
            <li class="flex items-start gap-2">
              <span class="text-accent text-base leading-none" aria-hidden="true">•</span>
              <span>${escapeHTML(item)}</span>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>
    </div>
  `
    )
    .join('');

  const eduHTML = PORTFOLIO_DATA.education
    .map(
      (edu) => `
    <div class="relative pl-8 border-l-2 border-neutral-800 mt-8">
      <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-neutral-600 ring-4 ring-background" aria-hidden="true"></div>
      <div class="bg-card p-6 rounded-xl border border-neutral-800">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <span class="text-gray-400 text-xs font-bold uppercase tracking-wider">${escapeHTML(edu.institution)}</span>
          <span class="text-gray-500 text-xs font-medium">${escapeHTML(edu.period)}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-2">
          ${escapeHTML(edu.degree)}
        </h3>
        <p class="text-gray-400 text-sm leading-relaxed">
          ${escapeHTML(edu.description)}
        </p>
      </div>
    </div>
  `
    )
    .join('');

  container.innerHTML = expHTML + eduHTML;
}

/* ==========================================================================
   4. COMPETENCIAS E IDIOMAS (DEL CV)
   ========================================================================== */
function renderCompetencies() {
  const compContainer = document.getElementById('competencies-container');
  if (!compContainer) return;

  const compsHTML = PORTFOLIO_DATA.competencies
    .map(
      (comp) => `
      <span class="px-3 py-1.5 bg-card border border-neutral-800 text-gray-300 text-xs rounded-lg font-medium flex items-center gap-1.5">
        <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-accent" aria-hidden="true"></i>
        ${escapeHTML(comp)}
      </span>
    `
    )
    .join('');

  const langHTML = PORTFOLIO_DATA.languages
    .map(
      (l) => `
      <span class="px-3 py-1.5 bg-card border border-neutral-800 text-gray-300 text-xs rounded-lg font-medium flex items-center gap-1.5">
        <i data-lucide="globe" class="w-3.5 h-3.5 text-accent" aria-hidden="true"></i>
        ${escapeHTML(l.language)}: <strong class="text-white">${escapeHTML(l.level)}</strong>
      </span>
    `
    )
    .join('');

  compContainer.innerHTML = compsHTML + langHTML;
}

/* ==========================================================================
   5. MENÚ MÓVIL ACCESIBLE (WCAG 2.2 AA)
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!toggleBtn || !menu) return;

  function updateAriaState(isOpen) {
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyHidden = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    updateAriaState(isCurrentlyHidden);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      updateAriaState(false);
    });
  });
}

/* ==========================================================================
   6. ANIMACIONES AL HACER SCROLL
   ========================================================================== */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* ==========================================================================
   7. ANIMACIÓN DEL BOTÓN DESCARGAR CV (INSPIRADA EN MILAN RARING)
   ========================================================================== */
function initCvDownloadAnimation() {
  const btn = document.getElementById('cv-download-btn');
  if (!btn) return;

  const textNode = btn.querySelector('.cv-text');
  const progressLine = btn.querySelector('.cv-progress-line');
  let isAnimating = false;

  btn.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    // Fase 1: Descargando (flecha animada y barra de progreso inferior)
    btn.classList.add('is-downloading');
    if (textNode) textNode.textContent = 'Descargando...';

    // Fase 2: Éxito (Check ✓ animado y confirmación) tras 1.2 segundos
    setTimeout(() => {
      btn.classList.remove('is-downloading');
      btn.classList.add('is-success');

      // Fase 3: Regreso suave a reposo tras 2.2 segundos
      setTimeout(() => {
        btn.classList.remove('is-success');
        if (textNode) textNode.textContent = 'Descargar CV';

        // Reset de la barra de progreso sin animación inversa
        if (progressLine) {
          progressLine.style.transition = 'none';
          progressLine.style.width = '0%';
          setTimeout(() => {
            progressLine.style.transition = '';
            isAnimating = false;
          }, 60);
        } else {
          isAnimating = false;
        }
      }, 2200);
    }, 1200);
  });
}

