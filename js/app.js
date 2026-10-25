/**
 * @file app.js
 * @description Lógica interactiva del portafolio:
 * - Renderizado dinámico de proyectos y tecnologías desde data.js
 * - Filtro interactivo de proyectos
 * - Menú hamburguesa para dispositivos móviles
 * - Animaciones de entrada al hacer scroll (Intersection Observer)
 * - Inicialización de íconos Lucide
 */

document.addEventListener('DOMContentLoaded', () => {
  renderTechnologies();
  initProjectsFilter();
  renderProjects('Todos');
  renderExperience();
  initMobileMenu();
  initScrollAnimations();
  lucide.createIcons();
});

/* ==========================================================================
   1. RENDERIZADO DE TECNOLOGÍAS
   ========================================================================== */
function renderTechnologies() {
  const container = document.getElementById('tech-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.technologies
    .map(
      (tech) => `
      <span class="px-4 py-2 bg-card border border-neutral-800 rounded-lg text-sm text-gray-300 hover:border-accent/50 hover:text-white transition-colors cursor-default select-none">
        ${tech.name}
      </span>
    `
    )
    .join('');
}

/* ==========================================================================
   2. FILTROS Y PROYECTOS
   ========================================================================== */
const PROJECT_FILTERS = ['Todos', 'JavaScript', 'PHP', 'Java', 'HTML5'];
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

    // Actualizar estilos activos de los botones
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
        <h3 class="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
          ${p.title}
        </h3>
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
            <i data-lucide="lock" class="w-3.5 h-3.5 text-neutral-500"></i> Código institucional / privado
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
   3. RENDERIZADO DE EXPERIENCIA
   ========================================================================== */
function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.experience
    .map(
      (exp) => `
    <div class="relative pl-8 border-l-2 border-neutral-800">
      <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
        exp.isCurrent ? 'bg-accent' : 'bg-neutral-700'
      }"></div>
      <div class="bg-card p-6 rounded-xl border border-neutral-800">
        <span class="text-sm font-medium ${
          exp.isCurrent ? 'text-accent' : 'text-gray-500'
        }">
          ${exp.period}
        </span>
        <h3 class="text-lg font-bold text-white mt-1">
          ${exp.title}
        </h3>
        <p class="text-gray-400 text-sm mt-2 leading-relaxed">
          ${exp.description}
        </p>
      </div>
    </div>
  `
    )
    .join('');
}

/* ==========================================================================
   4. MENÚ MÓVIL
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
   5. ANIMACIONES SUAVES AL HACER SCROLL
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
