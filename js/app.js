/**
 * @file app.js
 * @description Lógica interactiva del portafolio:
 * - Renderizado fiel de experiencia, educación, proyectos y habilidades según el CV
 * - Filtro interactivo de proyectos
 * - Menú hamburguesa móvil
 * - Animaciones de scroll (Intersection Observer)
 * - Inicialización de íconos Lucide
 */

document.addEventListener('DOMContentLoaded', () => {
  renderSkillsCategories();
  initProjectsFilter();
  renderProjects('Todos');
  renderExperienceAndEducation();
  renderCompetencies();
  initMobileMenu();
  initScrollAnimations();
  lucide.createIcons();
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
          <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
          ${cat.category}
        </h3>
        <div class="flex flex-wrap gap-2">
          ${cat.skills
            .map(
              (s) => `
            <span class="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:border-neutral-700 transition-colors">
              ${s}
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
      class="filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        filter === activeFilter
          ? 'bg-accent text-white shadow-lg shadow-accent/20'
          : 'bg-card border border-neutral-800 text-gray-400 hover:text-white hover:border-neutral-600'
      }"
      data-filter="${filter}"
    >
      ${filter}
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
          'filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-accent text-white shadow-lg shadow-accent/20';
      } else {
        b.className =
          'filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-card border border-neutral-800 text-gray-400 hover:text-white hover:border-neutral-600';
      }
    });

    renderProjects(activeFilter);
    lucide.createIcons();
  });
}

function renderProjects(filter) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered =
    filter === 'Todos'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.tech.includes(filter));

  grid.innerHTML = filtered
    .map(
      (p) => `
    <div class="bg-card p-6 rounded-xl border border-neutral-800 hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2 mb-3">
          <h3 class="text-xl font-bold text-white group-hover:text-accent transition-colors">
            ${p.title}
          </h3>
          ${
            p.isInstitutional
              ? `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-950/60 border border-red-800/60 text-red-400 shrink-0">Institucional</span>`
              : `<span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-900 border border-neutral-800 text-gray-400 shrink-0">Proyecto</span>`
          }
        </div>
        <p class="text-gray-400 mb-6 text-sm leading-relaxed">
          ${p.description}
        </p>
        <div class="flex flex-wrap gap-2 mb-6">
          ${p.tech
            .map(
              (t) => `
            <span class="px-2 py-1 bg-neutral-900 text-gray-300 text-xs rounded border border-neutral-800">
              ${t}
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
            href="${p.repoUrl}"
            target="_blank"
            rel="noreferrer"
            class="text-sm font-medium text-white flex items-center gap-1.5 hover:text-accent transition-colors"
          >
            <i data-lucide="github" class="w-4 h-4"></i> Ver Repositorio
          </a>
        `
            : `
          <span class="text-xs text-neutral-400 flex items-center gap-1.5">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 text-accent"></i> Implementación Institucional / Privada
          </span>
        `
        }
        ${
          p.demoUrl
            ? `
          <a
            href="${p.demoUrl}"
            target="_blank"
            rel="noreferrer"
            class="text-sm font-medium text-white flex items-center gap-1 hover:text-accent transition-colors"
          >
            <i data-lucide="external-link" class="w-4 h-4"></i> Demo
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
      <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent ring-4 ring-background"></div>
      <div class="bg-card p-6 rounded-xl border border-neutral-800">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <span class="text-accent text-xs font-bold uppercase tracking-wider">${exp.company}</span>
          <span class="text-gray-500 text-xs font-medium">${exp.period}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-3">
          ${exp.role}
        </h3>
        <ul class="space-y-2 text-gray-400 text-sm">
          ${exp.items
            .map(
              (item) => `
            <li class="flex items-start gap-2">
              <span class="text-accent text-base leading-none">•</span>
              <span>${item}</span>
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
      <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-neutral-600 ring-4 ring-background"></div>
      <div class="bg-card p-6 rounded-xl border border-neutral-800">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <span class="text-gray-400 text-xs font-bold uppercase tracking-wider">${edu.institution}</span>
          <span class="text-gray-500 text-xs font-medium">${edu.period}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-2">
          ${edu.degree}
        </h3>
        <p class="text-gray-400 text-sm leading-relaxed">
          ${edu.description}
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
        <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-accent"></i>
        ${comp}
      </span>
    `
    )
    .join('');

  const langHTML = PORTFOLIO_DATA.languages
    .map(
      (l) => `
      <span class="px-3 py-1.5 bg-card border border-neutral-800 text-gray-300 text-xs rounded-lg font-medium flex items-center gap-1.5">
        <i data-lucide="globe" class="w-3.5 h-3.5 text-accent"></i>
        ${l.language}: <strong class="text-white">${l.level}</strong>
      </span>
    `
    )
    .join('');

  compContainer.innerHTML = compsHTML + langHTML;
}

/* ==========================================================================
   5. MENÚ MÓVIL
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   6. ANIMACIONES AL HACER SCROLL
   ========================================================================== */
function initScrollAnimations() {
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
