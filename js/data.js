/**
 * @file data.js
 * @description Centraliza toda la información del portafolio.
 * Para modificar cualquier texto, proyecto o tecnología, edita solo este archivo.
 */

const PORTFOLIO_DATA = {
  personal: {
    firstName: 'Víctor',
    lastName: 'Tinoco',
    role: 'Estudiante de Ingeniería de Sistemas',
    tagline: 'Desarrollo de Software & Soporte TI',
    headline: 'Transformo problemas reales en',
    headlineAccent: 'soluciones tecnológicas.',
    bio: 'Desarrollo aplicaciones web, trabajo con bases de datos y automatizo procesos combinando programación y experiencia práctica.',
    email: 'tu-correo@email.com', // Modifica por tu correo real
    cvPath: './assets/cv-victor-tinoco.pdf',
    github: 'https://github.com/MoshTC',
    linkedin: 'https://www.linkedin.com/in/victor-alfrendo-tinoco-cardenas-b3a55a22a/',
  },

  technologies: [
    { name: 'HTML5', category: 'Frontend' },
    { name: 'CSS3', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'Bootstrap', category: 'Frontend' },
    { name: 'Java', category: 'Backend' },
    { name: 'PHP', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'MySQL', category: 'Database' },
    { name: 'SQL Server', category: 'Database' },
    { name: 'Git & GitHub', category: 'Tools' },
    { name: 'Linux / Windows', category: 'Tools' },
  ],

  projects: [
    {
      title: 'Sistema de Gestión de Asistencia',
      description: 'Administración de registros mediante importación CSV, cálculo de tardanzas y reportes automatizados.',
      tech: ['PHP', 'JavaScript', 'MySQL'],
      repoUrl: null, // Privado / Institucional
      demoUrl: null,
    },
    {
      title: 'Respawn Store',
      description: 'Tienda web de consolas y accesorios con catálogo y diseño responsive adaptado a móviles.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      repoUrl: 'https://github.com/MoshTC/respawn-store',
      demoUrl: null,
    },
    {
      title: 'Sistema de Matrícula Académica',
      description: 'Gestión de alumnos, registros y consultas utilizando arquitectura orientada a objetos.',
      tech: ['Java', 'Swing', 'POO'],
      repoUrl: null,
      demoUrl: null,
    },
    {
      title: 'Galería Web Institucional',
      description: 'Publicación de galerías fotográficas optimizadas mediante renderizado de estructuras JSON.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'JSON'],
      repoUrl: null,
      demoUrl: null,
    },
  ],

  experience: [
    {
      period: '2024 - Presente',
      title: 'Soporte Técnico TI',
      description: 'Mantenimiento preventivo y correctivo de equipos, configuración de redes y soporte a usuarios en entornos institucionales.',
      isCurrent: true,
    },
    {
      period: '2023 - 2024',
      title: 'Desarrollo de Proyectos Académicos',
      description: 'Creación de sistemas de gestión, tiendas web y aplicaciones de escritorio como parte de la formación universitaria.',
      isCurrent: false,
    },
  ],
};
