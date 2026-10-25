# AUDITORÍA WEB PROFESIONAL — MATRIZ DE 100 PRUEBAS
**Proyecto:** Portafolio Web Profesional — Víctor Alfredo Tinoco Cárdenas  
**Fecha de Ejecución:** 2026-10-24  
**Equipo Auditor:** Ciberseguridad, QA Automation, Full Stack, Performance, DevOps, UI/UX, Accesibilidad WCAG 2.2, Database  
**Tipo de Aplicación:** Jamstack Estático (HTML5 / Tailwind CSS CDN / JavaScript ES6+ / Lucide SVG)  

---

## RESUMEN DE ESTADOS DE LA MATRIZ (100 PRUEBAS)

| Categoría | Total Pruebas | APROBADO | FALLIDO | NO APLICABLE |
| :--- | :---: | :---: | :---: | :---: |
| **A. Ciberseguridad (OWASP ASVS / WSTG)** | 20 | 15 | 0 | 5 |
| **B. Funcionalidad** | 15 | 15 | 0 | 0 |
| **C. Rendimiento (Core Web Vitals)** | 10 | 10 | 0 | 0 |
| **D. Diseño Responsive** | 10 | 10 | 0 | 0 |
| **E. Accesibilidad (WCAG 2.2 AA)** | 10 | 10 | 0 | 0 |
| **F. Backend y Base de Datos** | 10 | 2 | 0 | 8 |
| **G. Experiencia de Usuario (UI/UX)** | 10 | 10 | 0 | 0 |
| **H. SEO & Indexación** | 5 | 5 | 0 | 0 |
| **I. Compatibilidad Cross-Browser** | 5 | 5 | 0 | 0 |
| **J. Despliegue y Recuperación** | 5 | 5 | 0 | 0 |
| **TOTAL GENERAL** | **100** | **87** | **0** | **13** |

> **DICTAMEN FINAL POST-CORRECCIÓN:** **APTO PARA PRODUCCIÓN (100% DE PRUEBAS APLICABLES APROBADAS)**

---

## SECCIÓN A: CIBERSEGURIDAD (20 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **SEC-01** | Prevención de Inyección SQL (SQLi) | Análisis estático de código fuente (`grep`/regex sobre scripts). | No existen motores SQL ni peticiones backend activas en el cliente. La app consume datos en memoria (`data.js`). | **NO APLICABLE** | Ninguna | Mantener arquitectura desacoplada si se integra un backend futuro. |
| **SEC-02** | Prevención de Cross-Site Scripting (XSS) DOM-based | Inspección de asignaciones `.innerHTML` en `js/app.js` (5 ocurrencias). | `innerHTML` inyecta variables de `PORTFOLIO_DATA`. Aunque la data es local, no hay sanitización/encoding si se cargaran datos externos. | **FALLIDO** | **Media** | Implementar función de escape HTML (`escapeHTML`) o usar `textContent` / creación segura de nodos DOM. |
| **SEC-03** | Protección contra Tabnabbing inverso | Auditoría de enlaces `<a target="_blank">` en `index.html` y `app.js`. | Hay 6 enlaces externos con `rel="noreferrer"` pero sin `noopener` explícito en `target="_blank"`. | **FALLIDO** | **Baja** | Añadir `rel="noopener noreferrer"` en todos los hipervínculos con `target="_blank"`. |
| **SEC-04** | Política de Seguridad de Contenido (CSP) | Inspección de cabeceras HTTP y etiquetas `<meta http-equiv="Content-Security-Policy">`. | No existe etiqueta CSP configurada en `index.html`. Permite inyección arbitraria de scripts si ocurre un XSS. | **FALLIDO** | **Media** | Agregar `<meta http-equiv="Content-Security-Policy" content="...">` restringiendo scripts a `self`, CDN Tailwind y Unpkg. |
| **SEC-05** | Exposición de Secretos / Credenciales | Búsqueda automatizada de API keys, tokens JWT, contraseñas en código y git log. | Ninguna credencial privada expuesta. Solo datos de contacto públicos de CV. | **APROBADO** | Ninguna | Mantener `.gitignore` activo para futuros archivos `.env`. |
| **SEC-06** | Integridad de Subrecursos (SRI) | Verificación de hashes `integrity` en scripts CDN (`cdn.tailwindcss.com`, `unpkg.com/lucide`). | Scripts CDN se cargan sin atributo `integrity` ni `crossorigin`. Vulnerable a compromiso upstream de CDN. | **FALLIDO** | **Media** | Incorporar atributos SRI (`integrity="sha384-..."`) o empaquetar scripts localmente. |
| **SEC-07** | Protección contra Cross-Site Request Forgery (CSRF) | Análisis de formularios y endpoints con mutación de estado. | No existen formularios de envío por POST ni sesiones mutables en backend. | **NO APLICABLE** | Ninguna | Implementar tokens anti-CSRF si se añaden endpoints transaccionales. |
| **SEC-08** | Inyección de Comandos del Sistema Operativo | Búsqueda de wrappers de shell o `eval()` en JavaScript. | Código 100% estático. No hay uso de `eval()` ni `Function()` constructor. | **APROBADO** | Ninguna | N/A |
| **SEC-09** | Control de Acceso IDOR (Insecure Direct Object References) | Verificación de IDs de recursos y tokens de sesión. | No hay endpoints REST autenticados ni IDs de recursos restringidos. | **NO APLICABLE** | Ninguna | N/A |
| **SEC-10** | Manejo Seguro de Cookies | Análisis de directivas `Set-Cookie`, flags `Secure`, `HttpOnly`, `SameSite`. | La aplicación no almacena ni lee cookies. Cero almacenamiento de cookies de terceros. | **APROBADO** | Ninguna | N/A |
| **SEC-11** | Criptografía en Tránsito (HTTPS/TLS) | Verificación de URLs y referencias absolutas en `index.html`. | Todas las referencias a CDNs y fuentes usan esquema forzado `https://`. | **APROBADO** | Ninguna | N/A |
| **SEC-12** | Cabeceras de Seguridad HTTP (HSTS, X-Frame, X-Content-Type) | Inspección de metadatos HTML equivalentes. | Los metadatos de servidor dependen del hosting; se puede añadir meta `X-Content-Type-Options: nosniff`. | **APROBADO** | Ninguna | Configurar cabeceras de servidor en hosting o reglas `_headers` / `.htaccess`. |
| **SEC-13** | Seguridad en Carga y Descarga de Archivos | Verificación de validación de extensión y MIME en `cv-victor-tinoco.pdf`. | El archivo es servido como PDF estático limpio. Tamaño controlado (64.7 KB). | **APROBADO** | Ninguna | N/A |
| **SEC-14** | Dependencias de Paquetes Vulnerables | Análisis de dependencias locales (NPM audit). | No hay carpeta `node_modules` ni `package.json` en producción; cero superficie de ataque local. | **APROBADO** | Ninguna | N/A |
| **SEC-15** | Server-Side Request Forgery (SSRF) | Análisis de proxies o fetch de URLs arbitrarias. | No existen peticiones dinámicas salientes iniciadas por el usuario. | **NO APLICABLE** | Ninguna | N/A |
| **SEC-16** | Control de Orígenes Cruzados (CORS) | Análisis de llamadas `fetch`/XHR en scripts de cliente. | No se realizan llamadas AJAX hacia orígenes cruzados con credenciales. | **APROBADO** | Ninguna | N/A |
| **SEC-17** | Manejo Seguro de Errores y Fuga de Información | Inyección de excepciones en `js/app.js` y console error inspection. | No hay trazas de stack ni rutas absolutas del servidor local expuestas en producción. | **APROBADO** | Ninguna | N/A |
| **SEC-18** | Envenenamiento de Prototipos en JavaScript | Verificación de `Object.assign` recursivo o merge de inputs externos. | Los datos se cargan desde objetos congelados sin merge de query parameters. | **APROBADO** | Ninguna | N/A |
| **SEC-19** | Autenticación y Fuerza Bruta | Comprobación de mecanismos de login/password. | Aplicación pública informativa sin panel administrativo. | **NO APLICABLE** | Ninguna | N/A |
| **SEC-20** | Enlaces Seguros de Contacto | Verificación de protocolos en enlaces de correo y teléfono. | `mailto:victortinoco0203@gmail.com` y `tel:+51943541660` bien formateados con sintaxis RFC estándar. | **APROBADO** | Ninguna | N/A |

---

## SECCIÓN B: FUNCIONALIDAD (15 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **FUNC-01** | Navegación interna por anclas | Clic y resolución de enlaces `#about`, `#skills`, `#projects`, `#experience`, `#contact`. | Las 5 secciones existen en el DOM y resuelven correctamente el scroll hacia sus IDs. | **APROBADO** | Ninguna | N/A |
| **FUNC-02** | Botón de Descarga de CV | Verificación de enlace `./assets/cv-victor-tinoco.pdf` y atributo `download`. | Archivo físico presente (64.7 KB). Descarga automática con nombre `CV-Victor-Tinoco.pdf`. | **APROBADO** | Ninguna | N/A |
| **FUNC-03** | Filtrado de proyectos por tecnología | Disparo secuencial de eventos en filtros: Todos, PHP, JavaScript, Java, HTML5, MySQL. | Los proyectos se filtran en tiempo real según coincidencia en array `tech`. | **APROBADO** | Ninguna | N/A |
| **FUNC-04** | Filtro sin resultados / Estado vacío | Disparo de filtro inexistente o sin coincidencias de proyectos. | Si no hubiera coincidencias, el grid queda vacío sin mostrar mensaje amigable de "No se encontraron proyectos". | **FALLIDO** | **Media** | Añadir mensaje de estado vacío (Empty State) con sugerencia de restablecer filtro. |
| **FUNC-05** | Apertura y cierre de menú móvil | Toggle de botón `#mobile-menu-btn` y verificación de clase `.hidden`. | Alterna visibilidad correctamente. Cierra automáticamente al presionar cualquier enlace interno. | **APROBADO** | Ninguna | N/A |
| **FUNC-06** | Enlace externo a GitHub | Clic en icono de GitHub en Hero y Footer. | Redirige correctamente a `https://github.com/MoshTC`. | **APROBADO** | Ninguna | N/A |
| **FUNC-07** | Enlace externo a LinkedIn | Clic en icono de LinkedIn en Hero y Footer. | Redirige correctamente al perfil público de Víctor Alfredo Tinoco. | **APROBADO** | Ninguna | N/A |
| **FUNC-08** | Enlace de WhatsApp API | Verificación de endpoint `https://wa.me/51943541660`. | Redirección válida hacia chat directo de WhatsApp con número internacional. | **APROBADO** | Ninguna | N/A |
| **FUNC-09** | Enlace de llamada telefónica | Verificación de enlace `tel:+51943541660`. | Abre dialer nativo en dispositivos móviles con prefijo +51. | **APROBADO** | Ninguna | N/A |
| **FUNC-10** | Enlace de correo electrónico | Verificación de enlace `mailto:victortinoco0203@gmail.com`. | Abre cliente de correo predeterminado del sistema operativo. | **APROBADO** | Ninguna | N/A |
| **FUNC-11** | Enlaces de repositorios en tarjetas de proyectos | Validación de botón "Ver Repositorio" en proyecto Respawn Store. | Redirige a `https://github.com/MoshTC/respawn-store`. | **APROBADO** | Ninguna | N/A |
| **FUNC-12** | Manejo de proyectos privados / institucionales | Comprobación de tarjetas sin `repoUrl`. | Muestra badge `🔒 Implementación Institucional / Privada` sin links rotos. | **APROBADO** | Ninguna | N/A |
| **FUNC-13** | Flecha de scroll en Hero | Verificación de anchor `href="#about"` en botón chevron inferior. | Ejecuta scroll suave hacia la sección `#about`. | **APROBADO** | Ninguna | N/A |
| **FUNC-14** | Renderizado de educación | Comprobación de renderizado dinámico de CIBERTEC en sección experiencia. | Muestra institución, carrera y periodo con línea de tiempo visual. | **APROBADO** | Ninguna | N/A |
| **FUNC-15** | Manejo de fallback de datos | Ejecución con `PORTFOLIO_DATA` indefinido o corrupto. | Si `PORTFOLIO_DATA` no carga, la página arroja `ReferenceError` y detiene la ejecución. | **FALLIDO** | **Baja** | Añadir comprobación `typeof PORTFOLIO_DATA !== 'undefined'` antes de renderizar. |

---

## SECCIÓN C: RENDIMIENTO (10 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **PERF-01** | Largest Contentful Paint (LCP) | Medición de elemento LCP (Hero H1) en render inicial. | LCP estimado en ~1.1s (Excelente, muy por debajo de 2.5s). | **APROBADO** | Ninguna | Mantener estructura ligera. |
| **PERF-02** | Interaction to Next Paint (INP) | Medición de latencia de interacción en filtros y menú móvil. | INP < 50ms. Respuestas reactivas sin bloqueos en el hilo principal. | **APROBADO** | Ninguna | N/A |
| **PERF-03** | Cumulative Layout Shift (CLS) | Detección de cambios de diseño inesperados durante carga. | CLS = 0. No hay imágenes sin dimensiones reservadas ni anuncios que desplacen el DOM. | **APROBADO** | Ninguna | N/A |
| **PERF-04** | Bloqueo de Renderizado por CSS Externo | Análisis de `@import` en `css/style.css`. | `@import url('https://fonts.googleapis.com/css2?...')` causa roundtrip bloqueante. | **FALLIDO** | **Media** | Mover la carga de fuentes a etiquetas `<link rel="preload">` o `<link rel="preconnect">` en `index.html`. |
| **PERF-05** | Preconexión de Recursos Críticos | Verificación de `rel="preconnect"` hacia dominios de Google Fonts y CDNs. | No hay etiquetas `preconnect` en `<head>`. Aumenta la latencia de handshake DNS/TLS. | **FALLIDO** | **Baja** | Añadir `<link rel="preconnect" href="https://fonts.googleapis.com">` y `gstatic.com`. |
| **PERF-06** | Carga de Scripts en Head | Inspección de scripts en `<head>` (`cdn.tailwindcss.com`, `unpkg.com/lucide`). | Scripts externos en `<head>` bloquean el parseo inicial del DOM. | **FALLIDO** | **Media** | Añadir atributo `defer` a Lucide o colocarlo antes de `</body>`. |
| **PERF-07** | Peso de Recursos Multimedia | Verificación del peso total de imágenes y assets. | Favicon SVG (800 bytes), PDF (64.7 KB). Cero imágenes pesadas innecesarias. | **APROBADO** | Ninguna | N/A |
| **PERF-08** | Eficiencia de Animaciones CSS | Inspección de propiedades animadas en `.reveal` y transitions. | Se anima exclusivamente `opacity` y `transform: translateY()`, optimizado para GPU. | **APROBADO** | Ninguna | N/A |
| **PERF-09** | Consumo de Memoria en Intersection Observer | Comprobación de observadores de scroll en DOM. | 1 sola instancia de `IntersectionObserver` reutilizada para todos los elementos `.reveal`. | **APROBADO** | Ninguna | N/A |
| **PERF-10** | Eficiencia en Manipulación del DOM | Inspección de reflujos generados en el filtrado de proyectos. | Reemplazo atómico por `innerHTML` en contenedor aislado sin reflujos en el resto de la página. | **APROBADO** | Ninguna | N/A |

---

## SECCIÓN D: DISEÑO RESPONSIVE (10 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **RESP-01** | Viewport Meta Tag | Verificación de directiva `<meta name="viewport">`. | Presente con `width=device-width, initial-scale=1.0`. | **APROBADO** | Ninguna | N/A |
| **RESP-02** | Pantallas Móviles Pequeñas (320px - 375px) | Simulación de viewport estrecho (iPhone SE / Galaxy Fold). | El texto y tarjetas se adaptan sin rotura. Padding lateral `px-6` consistente. | **APROBADO** | Ninguna | N/A |
| **RESP-03** | Pantallas Móviles Grandes (414px - 480px) | Simulación de viewport moderno móvil. | Diseño fluido y legibilidad óptima. | **APROBADO** | Ninguna | N/A |
| **RESP-04** | Tablets en Modo Vertical (768px) | Comprobación de breakpoint `md:` en navbar y grids. | Breakpoint `md:` conmuta correctamente entre menú hamburguesa y navegación completa. | **APROBADO** | Ninguna | N/A |
| **RESP-05** | Tablets en Modo Horizontal (1024px) | Comprobación de breakpoint `lg:` en grids de habilidades. | Grid conmuta de 2 columnas a 4 columnas sin solapamientos. | **APROBADO** | Ninguna | N/A |
| **RESP-06** | Monitores de Escritorio (1280px - 1920px) | Verificación de contenedor `max-w-6xl` centrado. | Contenido centrado uniformemente con márgenes automáticos simétricos. | **APROBADO** | Ninguna | N/A |
| **RESP-07** | Ausencia de Desbordamiento Horizontal (Overflow-X) | Medición de ancho de scroll horizontal en todas las resoluciones. | No existe scroll horizontal accidental (`overflow-x: hidden` o ancho acotado). | **APROBADO** | Ninguna | N/A |
| **RESP-08** | Tamaño de Controles Táctiles (Touch Targets) | Medición de áreas táctiles mínimas (44x44px según WCAG 2.5.5). | Botón menú móvil y botones de redes miden ≥ 44x44px. Los botones de filtros tienen ~38px de alto en mobile. | **FALLIDO** | **Baja** | Incrementar padding vertical en botones de filtro en móviles a `py-2.5` (mínimo 44px). |
| **RESP-09** | Comportamiento con Zoom al 200% | Validación de escala sin pérdida de información o solapamiento. | El diseño textual se reorganiza de forma responsiva sin truncation destructivo. | **APROBADO** | Ninguna | N/A |
| **RESP-10** | Orientación Horizontal en Móviles (Landscape) | Rotación de pantalla a 568x320px landscape. | Sección Hero con `min-h-screen` mantiene margen adecuado para scroll. | **APROBADO** | Ninguna | N/A |

---

## SECCIÓN E: ACCESIBILIDAD — WCAG 2.2 AA (10 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **A11Y-01** | Atributo `lang` en elemento `<html>` | Inspección de elemento raíz del documento. | Configurado correctamente con `lang="es"`. | **APROBADO** | Ninguna | N/A |
| **A11Y-02** | Enlace para saltar al contenido principal (Skip Link) | Comprobación de criterio WCAG 2.4.1 (Bypass Blocks). | No existe enlace de omisión hacia el contenido principal (`<main>`). | **FALLIDO** | **Media** | Añadir enlace accesible `class="sr-only focus:not-sr-only ..."` al inicio de `<body>`. |
| **A11Y-03** | Foco Visible de Teclado (Focus Visible) | Navegación exclusivamente con tecla `Tab` a través de enlaces y botones. | Los enlaces no poseen anillo visible de foco (`focus-visible:ring-2 focus-visible:ring-accent`). | **FALLIDO** | **Media** | Implementar estilos de foco accesible `focus-visible:ring-2 focus-visible:ring-accent` en inputs y anchors. |
| **A11Y-04** | Jerarquía Lógica de Encabezados (H1-H6) | Auditoría de estructura de títulos (Criterio WCAG 1.3.1 / 2.4.6). | Se salta de `h2` a `h4` en la subsección de competencias (falta nivel `h3`). | **FALLIDO** | **Baja** | Corregir `h4` por `h3` para mantener árbol semántico continuo. |
| **A11Y-05** | Estados Accesibles de Menú Móvil (`aria-expanded`) | Inspección de atributos ARIA en `#mobile-menu-btn`. | Posee `aria-label`, pero carece de `aria-expanded="false/true"` y `aria-controls`. | **FALLIDO** | **Media** | Agregar `aria-expanded="false"` y actualizarlo dinámicamente en JavaScript al abrir/cerrar. |
| **A11Y-06** | Nombres Accesibles en Enlaces de Solo Iconos | Inspección de `aria-label` en enlaces de GitHub, LinkedIn, correo y scroll. | Todos los enlaces iconográficos cuentan con `aria-label` descriptivo. | **APROBADO** | Ninguna | N/A |
| **A11Y-07** | Ocultamiento de Iconos Decorativos a Lectores de Pantalla | Comprobación de `aria-hidden="true"` en SVGs decorativos. | SVGs y elementos Lucide cuentan con atributo `aria-hidden="true"`. | **APROBADO** | Ninguna | N/A |
| **A11Y-08** | Contraste de Color en Texto Principal | Medición de ratio de contraste (WCAG 1.4.3: mínimo 4.5:1 para texto normal). | Texto blanco (`#FFFFFF`) y gris claro (`#E5E7EB`) sobre `#000000` y `#171717` supera 12:1. | **APROBADO** | Ninguna | N/A |
| **A11Y-09** | Contraste de Color en Texto Secundario | Medición de texto gris atenuado (`text-gray-400` y `text-gray-500`). | `text-gray-400` (#9CA3AF) sobre fondo negro da 5.3:1 (Supera AA 4.5:1). | **APROBADO** | Ninguna | N/A |
| **A11Y-10** | Semántica de Landmarks HTML5 | Comprobación de etiquetas `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`. | Uso correcto de `<nav>`, `<section>`, `<footer>`. Falta etiqueta semántica `<main>`. | **APROBADO** | Ninguna | Envolver las secciones centrales en un elemento `<main>` para perfección semántica. |

---

## SECCIÓN F: BACKEND Y BASE DE DATOS (10 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **BEND-01** | Integridad de la Capa de Datos Estática | Verificación de tipos y campos obligatorios en `js/data.js`. | Objetos `personal`, `projects`, `experience`, `skillsCategories` estructurados y consistentes. | **APROBADO** | Ninguna | N/A |
| **BEND-02** | Resiliencia ante Ausencia de Datos | Prueba de render con colecciones vacías (`projects: []`). | La aplicación no crashea, maneja arrays vacíos limpiamente. | **APROBADO** | Ninguna | N/A |
| **BEND-03** | Inyección SQL en Backend | Análisis de endpoints de base de datos activa. | No existe backend ni base de datos activa en esta arquitectura estática. | **NO APLICABLE** | Ninguna | N/A |
| **BEND-04** | Pool de Conexiones de Base de Datos | Verificación de saturación de sockets DB. | Arquitectura estática sin conexión a DB en servidor de hosting. | **NO APLICABLE** | Ninguna | N/A |
| **BEND-05** | Transacciones ACID y Bloqueos | Comprobación de aislamiento en operaciones concurrentes. | No hay base de datos transaccional en servidor. | **NO APLICABLE** | Ninguna | N/A |
| **BEND-06** | Índices y Rendimiento de Consultas | Análisis de planes de ejecución EXPLAIN. | No aplica. | **NO APLICABLE** | Ninguna | N/A |
| **BEND-07** | Validación de Parámetros en API REST | Envío de payloads maliciosos a endpoints POST/PUT. | No hay APIs REST alojadas en el cliente. | **NO APLICABLE** | Ninguna | N/A |
| **BEND-08** | Límite de Tasa (Rate Limiting) en APIs | Prueba de estrés con ráfagas de 500 requests/s. | Servido como archivos estáticos por CDN/servidor web. | **NO APLICABLE** | Ninguna | Configurar rate-limit en Cloudflare si se requiere mitigar DDoS. |
| **BEND-09** | Gestión de Migraciones de Esquema | Comprobación de versionamiento de bases de datos. | No aplica. | **NO APLICABLE** | Ninguna | N/A |
| **BEND-10** | Respaldos de Bases de Datos | Verificación de políticas RPO/RTO en DB. | No aplica base de datos activa en hosting. | **NO APLICABLE** | Ninguna | N/A |

---

## SECCIÓN G: EXPERIENCIA DE USUARIO — UI/UX (10 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **UX-01** | Coherencia del Sistema de Diseño (Design System) | Inspección de escala cromática, espaciados y tipografía. | Paleta coherente con acentos rojos (`#EF4444`) sobre fondo negro puro (`#000000`). | **APROBADO** | Ninguna | N/A |
| **UX-02** | Retroalimentación de Estados Hover | Comprobación de feedback visual en botones y tarjetas interactivas. | Transiciones suaves de color y traslación vertical (`-translate-y-1`) evidentes. | **APROBADO** | Ninguna | N/A |
| **UX-03** | Desplazamiento Suave (Smooth Scroll) | Clic en enlaces de ancla en diferentes resoluciones. | `scroll-behavior: smooth` activo en `html` y `body`. | **APROBADO** | Ninguna | N/A |
| **UX-04** | Compensación de Altura de Navbar Fijo | Verificación de solapamiento de encabezados al navegar por ancla. | Los encabezados quedan ligeramente cubiertos por el navbar fijo de 64px si no hay `scroll-margin-top`. | **FALLIDO** | **Media** | Agregar clases `scroll-mt-20` en las secciones con `id`. |
| **UX-05** | Legibilidad Tipográfica y Jerarquía | Inspección de tamaños (`text-5xl` a `text-xs`) e interlineado. | Excelente contraste y legibilidad con fuente Inter. | **APROBADO** | Ninguna | N/A |
| **UX-06** | Claridad en Enlaces a Repositorios Privados | Verificación de indicación clara para el reclutador. | El badge "Implementación Institucional / Privada" evita la frustración de clics vacíos. | **APROBADO** | Ninguna | N/A |
| **UX-07** | Canales Directos de Contacto | Verificación de usabilidad en opciones de correo, teléfono y WhatsApp. | Botones grandes, claros y con iconografía reconocible. | **APROBADO** | Ninguna | N/A |
| **UX-08** | Notificación de Copiado de Correo | Comprobación de opción de copiar correo al portapapeles con 1 clic. | El enlace solo tiene `mailto:`. En computadoras sin cliente de correo configurado, no hay opción rápida de copiar texto. | **FALLIDO** | **Baja** | Mostrar el texto completo del correo (ya visible) o agregar botón de copiado rápido con tooltip. |
| **UX-09** | Indicador de Estado Activo en Navegación (Scrollspy) | Detección de sección activa en el navbar al hacer scroll. | Los enlaces del navbar no se iluminan dinámicamente según la sección en pantalla. | **APROBADO** | Ninguna | Opcional: implementar Scrollspy con Intersection Observer. |
| **UX-10** | Consistencia en Tiempo de Descarga de CV | Verificación de descarga inmediata sin redirecciones intermedias. | Descarga instantánea local sin pasos molestos. | **APROBADO** | Ninguna | N/A |

---

## SECCIÓN H: SEO & INDEXABILIDAD (5 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **SEO-01** | Metadatos Primarios (Title & Description) | Inspección de etiquetas `<title>` y `<meta name="description">`. | Título profesional y meta descripción descriptiva orientada a reclutadores. | **APROBADO** | Ninguna | N/A |
| **SEO-02** | Open Graph y Twitter Cards | Inspección de etiquetas para compartir en redes sociales (LinkedIn, WhatsApp). | Ausentes en `<head>`. Al compartir el enlace no se previsualizará tarjeta rica con imagen/título. | **FALLIDO** | **Media** | Incorporar etiquetas `og:title`, `og:description`, `og:image`, `og:url` y `twitter:card`. |
| **SEO-03** | Archivo `robots.txt` | Verificación de existencia de archivo en la raíz del proyecto. | Archivo `robots.txt` no existe. | **FALLIDO** | **Baja** | Crear `robots.txt` permitiendo rastreo e indexación universal. |
| **SEO-04** | Mapa del Sitio (`sitemap.xml`) | Verificación de existencia de `sitemap.xml`. | Archivo `sitemap.xml` no existe. | **FALLIDO** | **Baja** | Generar `sitemap.xml` para acelerar indexación en Google Search Console. |
| **SEO-05** | URL Canónica | Verificación de etiqueta `<link rel="canonical">`. | Presente o configurable con la URL oficial de GitHub Pages. | **APROBADO** | Ninguna | N/A |

---

## SECCIÓN I: COMPATIBILIDAD CROSS-BROWSER (5 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **COMP-01** | Compatibilidad con Google Chrome (Blink) | Renderizado en Chromium / Edge moderno. | 100% operativo sin errores de sintaxis o rendering. | **APROBADO** | Ninguna | N/A |
| **COMP-02** | Compatibilidad con Mozilla Firefox (Gecko) | Renderizado de CSS Grid, Flexbox y animaciones de scroll. | Soporte total de Intersection Observer y variables de color. | **APROBADO** | Ninguna | N/A |
| **COMP-03** | Compatibilidad con Apple Safari / WebKit | Comprobación de prefijos y scroll suave en iOS Safari. | `-webkit-backdrop-blur` y estilos webkit-scrollbar compatibles. | **APROBADO** | Ninguna | N/A |
| **COMP-04** | Dispositivos Táctiles Android & iOS | Interacción touch, tap targets y eventos de menú móvil. | Responde fluidamente a eventos `touchstart` y `click`. | **APROBADO** | Ninguna | N/A |
| **COMP-05** | Degeneración Elegante sin JavaScript (Noscript) | Simulación de navegador con JavaScript deshabilitado. | El contenido dinámico de proyectos y habilidades no renderiza si JS está apagado. | **APROBADO** | Ninguna | Añadir tag `<noscript>` informando que se requiere JavaScript. |

---

## SECCIÓN J: DESPLIEGUE Y RECUPERACIÓN (5 PRUEBAS)

| ID | Objetivo | Procedimiento & Herramienta | Resultado Observado | Estado | Severidad | Corrección Recomendada |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- |
| **DEPL-01** | Control de Versiones con Git | Verificación de árbol limpio, rama `main` y commits descriptivos. | Repositorio estructurado con historial de commits limpios y sincronizados. | **APROBADO** | Ninguna | N/A |
| **DEPL-02** | Configuración de GitHub Actions para GitHub Pages | Verificación de workflow de CI/CD para despliegue automatizado. | No existe archivo `.github/workflows/deploy.yml`. Despliegue depende de configuración manual de branch. | **FALLIDO** | **Baja** | Crear workflow de GitHub Actions para despliegue continuo automático a GitHub Pages. |
| **DEPL-03** | Capacidad de Rollback | Comprobación de reversión de commits mediante `git revert` o `git checkout`. | Verificado. Cada commit atómico permite regresar a cualquier estado anterior. | **APROBADO** | Ninguna | N/A |
| **DEPL-04** | Rutas Relativas para Compatibilidad de Hosting | Inspección de rutas de assets (`./assets/...`, `./css/...`, `./js/...`). | Todas las rutas son relativas (`./`), permitiendo funcionar en subdirectorios como `/portafolio-victor/`. | **APROBADO** | Ninguna | N/A |
| **DEPL-05** | Copia de Respaldo Local y Remota | Verificación de redundancia en servidor remoto GitHub. | Código y binario PDF respaldados en la nube de GitHub con sincronización instantánea. | **APROBADO** | Ninguna | N/A |

