# 01 — DIAGNÓSTICO DE ARQUITECTURA Y ESTADO INICIAL
**Proyecto:** Portafolio Web Profesional — Víctor Alfredo Tinoco Cárdenas  
**Fecha:** 2026-10-24  
**Evaluador:** Equipo de Arquitectura e Ingeniería Senior  

---

## 1. Arquitectura Detectada

El proyecto implementa una arquitectura **Jamstack Estática Minimalista (Zero-Build Static Architecture)**:

- **Frontend Core:** HTML5 semántico en un único documento de entrada (`index.html`).
- **Sistema de Diseño & Estilos:** Tailwind CSS servido mediante CDN oficial con extensión de tema personalizado en tiempo de ejecución, complementado con estilos CSS nativos (`css/style.css`) para animaciones y scrollbar.
- **Lógica e Interacción:** JavaScript Vanilla modularizado en dos capas:
  1. *Capa de Datos (`js/data.js`):* Desacoplamiento de la información profesional (CV, proyectos, habilidades) en objetos inmutables.
  2. *Capa de Presentación (`js/app.js`):* Manipulación del DOM, inicialización de eventos, renderizado condicional y observadores de intersección.
- **Activos Multimedia:** Documento binario PDF (`assets/cv-victor-tinoco.pdf`) y gráficos vectoriales SVG embebidos y como favicon (`assets/favicon.svg`).
- **Backend / Persistencia:** No existe servidor dinámico ni base de datos activa alojada en el cliente. La persistencia es estática en memoria.

---

## 2. Inventario de Archivos del Repositorio

| Archivo | Tamaño | Propósito | Estado Técnico |
| :--- | :---: | :--- | :--- |
| `index.html` | 16.9 KB | Estructura semántica, enlaces, layout y CDNs | Estable / Mejoras detectadas |
| `css/style.css` | 758 B | Animaciones `.reveal`, fuentes y scrollbar | Requiere optimización de `@import` |
| `js/data.js` | 4.9 KB | Fuente única de verdad de la información | Estructura limpia y consistente |
| `js/app.js` | 11.4 KB | Renderizado DOM, filtros, menú móvil y observer | Requiere sanitización de `innerHTML` |
| `assets/cv-victor-tinoco.pdf` | 64.7 KB | Currículum oficial descargable | Verificado e íntegro |
| `assets/favicon.svg` | 800 B | Identidad de marca (símbolo `</>`) | Óptimo formato vectorial |
| `.gitignore` | 250 B | Exclusiones para control de versiones | Adecuado |
| `README.md` | 5.5 KB | Documentación técnica del repositorio | Completo con badges y guías |

---

## 3. Puntos Fuertes Identificados

1. **Rendimiento Base Sobresaliente:** Al no depender de hidratación de frameworks pesados (React, Angular), el Time To First Byte (TTFB) y First Contentful Paint (FCP) son prácticamente instantáneos.
2. **Cero Dependencias de Compilación:** No requiere Node.js, `npm run build` ni mantenimiento de paquetes vulnerables en producción.
3. **Mantenibilidad:** La información del profesional está 100% desacoplada en `js/data.js`; cualquier cambio de texto o proyecto se realiza en un solo lugar sin tocar la vista HTML.
4. **Respaldo y Control de Versiones:** Repositorio Git limpio sincronizado con GitHub en la rama `main`.

---

## 4. Problemas Principales Detectados

1. **Seguridad Web:**
   - Enlaces con `target="_blank"` carecen del atributo explícito `noopener` (riesgo de Tabnabbing reverso).
   - Ausencia de Content-Security-Policy (CSP) para blindar el navegador frente a inyecciones de script.
   - Uso directo de `innerHTML` para renderizar datos sin funciones de escape HTML preventivas.
2. **Accesibilidad (WCAG 2.2 AA):**
   - El botón de menú móvil carece de atributos `aria-expanded` y `aria-controls`.
   - Falta un enlace visible al teclado para omitir navegación ("Skip to Content").
   - Falta de anillos de foco visibles (`focus-visible`) para navegación por teclado.
   - Salto de jerarquía en encabezados (de `h2` a `h4`).
3. **Rendimiento de Carga:**
   - La regla `@import` dentro de `style.css` bloquea el renderizado de la página al descargar Google Fonts.
   - Falta de `preconnect` hacia los dominios de fuentes y CDNs en el `<head>`.
4. **Experiencia de Usuario (UX):**
   - Al pulsar un ancla del menú, el navbar fijo de 64px tapa parcialmente el encabezado de la sección (falta `scroll-mt-20`).
   - Los botones de filtro no muestran un estado vacío si no hubiera coincidencias.
5. **SEO & Redes Sociales:**
   - Faltan metadatos Open Graph (`og:*`) y Twitter Cards para que el enlace se comparta con imagen y descripción enriquecida en LinkedIn y WhatsApp.
   - Ausencia de archivos estándar `robots.txt` y `sitemap.xml`.

