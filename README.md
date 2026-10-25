# Portafolio — Víctor Tinoco

Portafolio personal construido con React, Tailwind CSS y Framer Motion.

## 🚀 Inicio rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 📁 Estructura del proyecto

```
src/
├── assets/                  # Imágenes, íconos y archivos estáticos
├── components/
│   ├── common/              # Componentes reutilizables (SectionHeading, SocialIcon)
│   ├── layout/              # Estructura de página (Navbar, Footer)
│   └── sections/            # Secciones de contenido (Hero, About, Projects...)
├── data/                    # Datos estáticos desacoplados de la UI
│   ├── personal.js          # Información personal y enlaces sociales
│   ├── navigation.js        # Links del navbar
│   ├── technologies.js      # Stack tecnológico
│   ├── projects.js          # Catálogo de proyectos
│   ├── experience.js        # Experiencia profesional
│   └── index.js             # Barrel file (re-exportaciones)
├── hooks/                   # Custom React hooks
├── utils/                   # Funciones utilitarias
├── styles/                  # Estilos globales (Tailwind)
├── App.jsx                  # Componente raíz (orquestador)
└── main.jsx                 # Punto de entrada de React
```

## ✏️ Personalización

Para actualizar tu información personal, edita **únicamente** el archivo `src/data/personal.js`:

```js
export const PERSONAL = {
  firstName: 'Víctor',
  lastName: 'Tinoco',
  email: 'tu-correo@email.com', // ← Cambia esto
  // ...
};
```

Para agregar proyectos, edita `src/data/projects.js`.

## 🛠️ Stack

- **React 18** — UI declarativa con componentes
- **Vite** — Bundler ultrarrápido
- **Tailwind CSS 3** — Utilidades CSS
- **Framer Motion** — Animaciones fluidas
- **Lucide React** — Íconos SVG

## 📦 Deploy

```bash
npm run build
# Sube la carpeta dist/ a Netlify, Vercel o GitHub Pages
```

