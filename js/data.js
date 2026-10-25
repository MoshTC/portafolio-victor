/**
 * @file data.js
 * @description Centraliza toda la información profesional del portafolio.
 * Basado directamente en el currículum de Víctor Alfredo Tinoco Cárdenas.
 */

const PORTFOLIO_DATA = {
  personal: {
    fullName: 'Víctor Alfredo Tinoco Cárdenas',
    firstName: 'Víctor',
    lastName: 'Tinoco',
    location: 'Bellavista, Callao',
    phone: '943 541 660',
    phoneLink: 'tel:+51943541660',
    whatsappLink: 'https://wa.me/51943541660',
    email: 'victortinoco0203@gmail.com',
    role: 'Estudiante de Ingeniería de Sistemas en Cibertec',
    tagline: 'Técnico Informático | Desarrollo Web & Soporte TI',
    headline: 'Transformo necesidades operativas en',
    headlineAccent: 'soluciones tecnológicas.',
    bio: 'Estudiante de Ingeniería de Sistemas en Cibertec y técnico informático con experiencia en soporte a usuarios, mantenimiento de equipos, redes y administración de plataformas institucionales. Conocimientos en Java, SQL, PHP, HTML, CSS, JavaScript y desarrollo de soluciones web. Interés en soporte TI, desarrollo de software y automatización de procesos.',
    cvPath: './assets/cv-victor-tinoco.pdf',
    github: 'https://github.com/MoshTC',
    linkedin: 'https://www.linkedin.com/in/victor-alfrendo-tinoco-cardenas-b3a55a22a/',
  },

  skillsCategories: [
    {
      category: 'Lenguajes & Tecnologías',
      skills: ['Java', 'SQL', 'PHP', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    },
    {
      category: 'Bases de Datos',
      skills: ['MySQL', 'SQL Server', 'phpMyAdmin'],
    },
    {
      category: 'Herramientas & Entornos',
      skills: ['Git / GitHub', 'Visual Studio Code', 'Eclipse IDE', 'NetBeans', 'cPanel', 'Microsoft Excel'],
    },
    {
      category: 'Soporte TI & Infraestructura',
      skills: ['Diagnóstico de equipos', 'Redes LAN & Conectividad', 'Mantenimiento Preventivo', 'Soporte a Usuarios'],
    },
  ],

  technologies: [
    { name: 'Java', category: 'Backend' },
    { name: 'PHP', category: 'Backend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'HTML5', category: 'Frontend' },
    { name: 'CSS3', category: 'Frontend' },
    { name: 'Bootstrap', category: 'Frontend' },
    { name: 'MySQL', category: 'Database' },
    { name: 'SQL Server', category: 'Database' },
    { name: 'phpMyAdmin', category: 'Database' },
    { name: 'Git & GitHub', category: 'Tools' },
    { name: 'cPanel', category: 'Tools' },
    { name: 'Redes LAN', category: 'Soporte' },
    { name: 'Soporte TI', category: 'Soporte' },
  ],

  projects: [
    {
      title: 'Sistema de Asistencia Institucional',
      description: 'Procesamiento de marcaciones, validación de datos, cálculo de tardanzas y generación de reportes administrativos mediante PHP, JavaScript y persistencia en MySQL.',
      tech: ['PHP', 'JavaScript', 'MySQL', 'phpMyAdmin'],
      repoUrl: null,
      isInstitutional: true,
      demoUrl: null,
    },
    {
      title: 'Respawn Store',
      description: 'Sitio web de comercio electrónico de consolas y accesorios con catálogo interactivo, diseño responsive adaptado a móviles con Bootstrap y control de versiones con Git/GitHub.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      repoUrl: 'https://github.com/MoshTC/respawn-store',
      isInstitutional: false,
      demoUrl: null,
    },
    {
      title: 'Sistema de Matrícula y Mantenimiento de Alumnos',
      description: 'Aplicación orientada a objetos desarrollada en Java con formularios Swing para operaciones completas de registro, actualización, mantenimiento y consulta de datos.',
      tech: ['Java', 'Swing', 'POO', 'SQL'],
      repoUrl: null,
      isInstitutional: false,
      demoUrl: null,
    },
  ],

  experience: [
    {
      company: 'Cuna Niño Jesús de Praga',
      role: 'Técnico Informático',
      period: '2026 – Actualidad',
      isCurrent: true,
      type: 'Laboral',
      items: [
        'Soporte técnico a computadoras, proyectores, conectividad de red y atención a usuarios de la institución.',
        'Administración y resolución de incidencias en plataformas institucionales, gestión de cuentas y accesos.',
        'Desarrollo y mantenimiento de soluciones internas, incluido un sistema de asistencia con PHP, JavaScript y MySQL, y actualización de contenido web.',
      ],
    },
  ],

  education: [
    {
      institution: 'CIBERTEC',
      degree: 'Ingeniería de Sistemas',
      period: 'En curso',
      type: 'Educación Superior',
      description: 'Formación académica integral en arquitectura de software, bases de datos relacionales, redes y gestión tecnológica.',
    },
  ],

  competencies: [
    'Resolución de problemas',
    'Pensamiento analítico',
    'Comunicación efectiva',
    'Organización metódica',
    'Trabajo en equipo',
  ],

  languages: [
    { language: 'Español', level: 'Nativo' },
    { language: 'Inglés', level: 'Básico' },
  ],
};
