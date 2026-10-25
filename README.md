<div align="center">

  <h1>Víctor Tinoco | Software & TI Portfolio</h1>

  <p>
    <strong>Portafolio personal de desarrollo de software, modelado de bases de datos y soporte TI.</strong>
  </p>

  <p>
    <a href="https://github.com/MoshTC/portafolio-victor">
      <img src="https://img.shields.io/badge/Status-Active-emerald?style=for-the-badge" alt="Status" />
    </a>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  </p>

  <p>
    <a href="#-visión-general">Visión General</a> •
    <a href="#-características">Características</a> •
    <a href="#-stack-tecnológico">Stack Tecnológico</a> •
    <a href="#-estructura-del-proyecto">Estructura</a> •
    <a href="#-despliegue">Despliegue</a> •
    <a href="#-contacto">Contacto</a>
  </p>

</div>

---

## 📌 Visión General

Sitio web profesional orientado a destacar habilidades técnicas, proyectos de software y experiencia en infraestructura TI. Construido bajo una arquitectura estática moderna (Jamstack minimalista), garantiza un tiempo de carga instantáneo (First Contentful Paint < 0.5s), consumo mínimo de recursos y compatibilidad universal sin necesidad de entornos de ejecución ni compiladores en el servidor.

---

## ✨ Características

- **Diseño Moderno & Minimalista:** Paleta de contraste alto basada en tonalidades neutras (`#000000`, `#171717`) con acentos vibrantes (`#EF4444`).
- **Arquitectura Data-Driven:** La información del sitio está desacoplada de la interfaz gráfica en un archivo central (`js/data.js`), facilitando el mantenimiento y la actualización continua.
- **Filtrado Dinámico de Proyectos:** Sistema de filtros en tiempo real por tecnologías (PHP, JavaScript, Java, HTML5, etc.).
- **Totalmente Responsive:** Experiencia fluida en dispositivos móviles, tablets y escritorios mediante menú adaptativo y grid responsivo.
- **Zero-Build Architecture:** Funcional de inmediato sin dependencias de Node.js o bundlers; compatible con cualquier servidor HTTP o CDN.
- **Optimizado para SEO:** Metadatos enriquecidos, Open Graph y semántica HTML5 adecuada.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Estructura** | HTML5 Semántico | Marcado accesible y estructura base del documento |
| **Estilos** | Tailwind CSS CDN | Sistema de diseño basado en utilidades y diseño responsive |
| **Lógica** | JavaScript (ES6+) | Renderizado reactivo de datos y filtrado interactivo |
| **Iconografía** | Lucide Icons | Conjunto de íconos vectoriales SVG ligeros y modernos |
| **Tipografía** | Inter (Google Fonts) | Fuente geométrica de alta legibilidad para interfaces de usuario |

---

## 📁 Estructura del Proyecto

```text
portafolio-victor/
│
├── index.html              # Punto de entrada HTML5 y estructura semántica
│
├── assets/                 # Recursos multimedia y documentos
│   ├── favicon.svg         # Identificador visual del sitio (SVG)
│   └── cv-victor-tinoco.pdf # Currículum Vitae descargable
│
├── css/
│   └── style.css           # Estilos complementarios, scrollbar y animaciones
│
├── js/
│   ├── data.js             # Capa de datos: proyectos, experiencia y tecnologías
│   └── app.js              # Capa de presentación: renderizado DOM y eventos
│
├── .gitignore              # Control de exclusiones para Git
└── README.md               # Documentación técnica del repositorio
```

---

## 🚀 Despliegue y Ejecución

### Ejecución Local

No requiere instalación de paquetes ni configuración de puertos:

1. Clone el repositorio:
   ```bash
   git clone https://github.com/MoshTC/portafolio-victor.git
   ```
2. Abra `index.html` en cualquier navegador web, o inicie con la extensión **Live Server** de VS Code.

### Despliegue en Servidores Web

Al ser un artefacto estático, puede desplegarse en segundos en:

- **GitHub Pages:**
  1. Diríjase a **Settings > Pages** en el repositorio.
  2. En **Branch**, seleccione `main` / `root` y guarde.
- **Servidores Tradicionales (Apache / Nginx / cPanel):**  
  Copie el contenido del directorio directamente a la carpeta pública (`public_html` o `/var/www/html`).
- **Plataformas Cloud (Vercel, Netlify, Cloudflare Pages):**  
  Conecte el repositorio sin necesidad de configurar *Build Command* ni *Output Directory*.

---

## 👤 Autor

**Víctor Alfrendo Tinoco Cárdenas**  
*Estudiante de Ingeniería de Sistemas | Desarrollo de Software & Soporte TI*

- **GitHub:** [@MoshTC](https://github.com/MoshTC)
- **LinkedIn:** [Víctor Tinoco](https://www.linkedin.com/in/victor-alfrendo-tinoco-cardenas-b3a55a22a/)

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia [MIT](https://opensource.org/licenses/MIT).

- **GitHub:** [@MoshTC](https://github.com/MoshTC)
- **LinkedIn:** [Víctor Tinoco](https://www.linkedin.com/in/victor-alfrendo-tinoco-cardenas-b3a55a22a/)

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia [MIT](https://opensource.org/licenses/MIT).

