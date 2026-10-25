/**
 * @file projects.js
 * @description Catálogo de proyectos destacados.
 * - Si un proyecto no tiene repositorio público, se asigna repoUrl: null
 *   para evitar enlaces rotos o comportamiento falso de navegación.
 */

export const PROJECT_FILTERS = ['Todos', 'JavaScript', 'PHP', 'Java', 'HTML5'];

export const PROJECTS = [
  {
    title: 'Sistema de Gestión de Asistencia',
    description:
      'Administración de registros mediante importación CSV, cálculo de tardanzas y reportes automatizados.',
    tech: ['PHP', 'JavaScript', 'MySQL'],
    repoUrl: null,
    isPrivate: true,
    demoUrl: null,
  },
  {
    title: 'Respawn Store',
    description:
      'Tienda web de consolas y accesorios con catálogo y diseño responsive optimizado para dispositivos móviles.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    repoUrl: 'https://github.com/MoshTC/respawn-store',
    isPrivate: false,
    demoUrl: null,
  },
  {
    title: 'Sistema de Matrícula Académica',
    description:
      'Gestión de alumnos, registros y consultas utilizando arquitectura por capas y programación orientada a objetos.',
    tech: ['Java', 'Swing', 'POO'],
    repoUrl: null,
    isPrivate: true,
    demoUrl: null,
  },
  {
    title: 'Galería Web Institucional',
    description:
      'Publicación de galerías fotográficas optimizadas mediante renderizado de estructuras JSON.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'JSON'],
    repoUrl: null,
    isPrivate: true,
    demoUrl: null,
  },
];
