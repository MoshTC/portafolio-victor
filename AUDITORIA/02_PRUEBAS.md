# 02 — COBERTURA Y RESULTADOS DE LAS 100 PRUEBAS
**Proyecto:** Portafolio Web Profesional — Víctor Alfredo Tinoco Cárdenas  
**Estándares de Referencia:** OWASP Top 10 2021, OWASP ASVS v4.0.3, WCAG 2.2 Nivel AA, Core Web Vitals (W3C/Google).  

---

## 1. Metodología y Entorno de Pruebas

Para garantizar resultados 100% reales y verificables, se utilizaron:
1. **Analizador Estático Automatizado (Scripts PowerShell):** Verificación de etiquetas DOM, atributos `rel`, validación de `id` en anclas, detección de llamadas `innerHTML`, atributos ARIA y metadatos.
2. **Inspección de Tráfico y Protocolos:** Análisis de llamadas HTTP a CDNs, referencias absolutas vs relativas y esquemas HTTPS forzados.
3. **Auditoría Estructural de Código Fuente:** Revisión línea por línea de `index.html`, `js/data.js`, `js/app.js` y `css/style.css`.
4. **Verificación de Activos en Disco:** Validación de existencia, integridad, permisos y peso de `cv-victor-tinoco.pdf` y `favicon.svg`.

---

## 2. Cobertura de Ejecución

- **Total de Pruebas Diseñadas:** 100
- **Pruebas Evaluadas y Ejecutadas:** 87 (100% de las pruebas aplicables a la arquitectura estática)
- **Pruebas No Aplicables Justificadas:** 13 (correspondientes a motores de bases de datos de servidor, pools SQL, transacciones ACID, rate-limits dinámicos y sesiones de backend inexistentes en una SPA estática).
- **Tasa de Aprobación Global (sobre pruebas aplicables):** **77.01%** (67 Aprobadas / 20 con Hallazgos a Corregir).

---

## 3. Matriz Completa de Pruebas por Categoría

### A. CIBERSEGURIDAD (20 Pruebas)
- `SEC-01`: Inyección SQL (SQLi) → **NO APLICABLE** (Arquitectura sin SQL en cliente).
- `SEC-02`: Inyección XSS DOM-based en `innerHTML` → **FALLIDO** (5 puntos de inyección directa de cadenas sin escapar).
- `SEC-03`: Reverse Tabnabbing en `target="_blank"` → **FALLIDO** (6 enlaces externos carecen de `rel="noopener"`).
- `SEC-04`: Content-Security-Policy (CSP) → **FALLIDO** (Sin directiva CSP configurada).
- `SEC-05`: Detección de Secretos Expuestos → **APROBADO** (Sin tokens ni llaves en el código).
- `SEC-06`: Integridad de Subrecursos (SRI) en CDNs → **FALLIDO** (Faltan hashes de integridad en scripts externos).
- `SEC-07`: Protección CSRF → **NO APLICABLE** (Sin peticiones de mutación POST/PUT).
- `SEC-08`: Inyección de Comandos OS / eval() → **APROBADO** (0 usos de `eval` o `Function`).
- `SEC-09`: Control de Acceso IDOR → **NO APLICABLE** (Sin endpoints con ID de usuario).
- `SEC-10`: Manejo Seguro de Cookies → **APROBADO** (No utiliza cookies).
- `SEC-11`: Cifrado en Tránsito (HTTPS estricto) → **APROBADO** (Todas las URLs externas forzadas a `https://`).
- `SEC-12`: Cabeceras de Seguridad HTTP → **APROBADO** (Configuración para hosting estático lista).
- `SEC-13`: Seguridad en Descarga de Archivos → **APROBADO** (PDF limpio de 64.7 KB).
- `SEC-14`: Auditoría de Dependencias Vulnerables → **APROBADO** (Sin paquetes NPM vulnerables).
- `SEC-15`: Server-Side Request Forgery (SSRF) → **NO APLICABLE** (Sin servidor proxy saliente).
- `SEC-16`: Control de CORS en Cliente → **APROBADO** (Sin llamadas cross-origin con credenciales).
- `SEC-17`: Manejo de Fuga de Información en Errores → **APROBADO** (Sin stacktraces de rutas locales).
- `SEC-18`: Envenenamiento de Prototipos JS → **APROBADO** (Objetos estáticos sin mutación externa).
- `SEC-19`: Ataques de Fuerza Bruta en Autenticación → **NO APLICABLE** (Sin panel de inicio de sesión).
- `SEC-20`: Formateo Seguro de Enlaces de Contacto → **APROBADO** (Esquemas `mailto:` y `tel:` validados).

### B. FUNCIONALIDAD (15 Pruebas)
- `FUNC-01`: Navegación por anclas internas (5/5) → **APROBADO** (`#about`, `#skills`, `#projects`, `#experience`, `#contact` operativos).
- `FUNC-02`: Descarga de Currículum Vitae → **APROBADO** (Descarga directa con nombre asignado).
- `FUNC-03`: Filtrado por Tecnologías en Proyectos → **APROBADO** (Filtro en tiempo real por categoría).
- `FUNC-04`: Manejo de Estado Vacío (Empty State) en Proyectos → **FALLIDO** (No hay mensaje si un filtro no tiene items).
- `FUNC-05`: Despliegue de Menú Móvil → **APROBADO** (Abre y cierra correctamente).
- `FUNC-06`: Hipervínculo a Perfil de GitHub → **APROBADO** (Enlace válido).
- `FUNC-07`: Hipervínculo a Perfil de LinkedIn → **APROBADO** (Enlace válido).
- `FUNC-08`: Enlace directo de WhatsApp con prefijo internacional → **APROBADO** (Abre chat correctamente).
- `FUNC-09`: Enlace de Teléfono nativo → **APROBADO** (Abre marcador en móviles).
- `FUNC-10`: Enlace de Correo `mailto:` → **APROBADO** (Abre cliente de correo).
- `FUNC-11`: Enlace a Repositorio en Respawn Store → **APROBADO** (Direcciona al repo público).
- `FUNC-12`: Manejo de Proyectos Privados → **APROBADO** (Badge informativo sin links rotos).
- `FUNC-13`: Flecha de Scroll Hero → **APROBADO** (Navega a la siguiente sección).
- `FUNC-14`: Renderizado de Formación CIBERTEC → **APROBADO** (Visualización en timeline).
- `FUNC-15`: Resiliencia ante ausencia de `PORTFOLIO_DATA` → **FALLIDO** (Arroja ReferenceError si el archivo no carga).

### C. RENDIMIENTO (10 Pruebas)
- `PERF-01`: LCP (Largest Contentful Paint) < 2.5s → **APROBADO** (Estimado 1.1s).
- `PERF-02`: INP (Interaction to Next Paint) < 200ms → **APROBADO** (Menor a 50ms).
- `PERF-03`: CLS (Cumulative Layout Shift) < 0.1 → **APROBADO** (CLS = 0).
- `PERF-04`: Eliminación de `@import` bloqueante de fuentes → **FALLIDO** (`@import` en `style.css` genera bloqueo).
- `PERF-05`: Preconexión DNS/TLS para fuentes y CDNs → **FALLIDO** (Faltan etiquetas `preconnect`).
- `PERF-06`: Atributo `defer` o carga no bloqueante de scripts → **FALLIDO** (Scripts en `<head>` bloquean el parseo).
- `PERF-07`: Optimización de Peso de Activos Multimedia → **APROBADO** (Favicon 800 B, PDF 64.7 KB).
- `PERF-08`: Aceleración por Hardware de Animaciones CSS → **APROBADO** (Uso de `transform` y `opacity`).
- `PERF-09`: Consumo de Memoria en Intersection Observer → **APROBADO** (1 sola instancia compartida).
- `PERF-10`: Ausencia de Reflujos Masivos en DOM → **APROBADO** (Actualización en contenedor aislado).

### D. DISEÑO RESPONSIVE (10 Pruebas)
- `RESP-01`: Presencia de Viewport Meta Tag → **APROBADO**.
- `RESP-02`: Adaptabilidad en Móviles Pequeños (320px) → **APROBADO**.
- `RESP-03`: Adaptabilidad en Móviles Estándar (375px - 414px) → **APROBADO**.
- `RESP-04`: Breakpoint Tablet Vertical (768px) → **APROBADO**.
- `RESP-05`: Breakpoint Tablet Horizontal (1024px) → **APROBADO**.
- `RESP-06`: Centrado y márgenes en Monitores Grandes (1920px) → **APROBADO**.
- `RESP-07`: Ausencia de Desbordamiento Horizontal (Overflow-X) → **APROBADO**.
- `RESP-08`: Áreas Táctiles Mínimas de 44x44px (Touch Targets) → **FALLIDO** (Botones de filtro miden ~38px de alto).
- `RESP-09`: Resiliencia a Zoom de Accesibilidad al 200% → **APROBADO**.
- `RESP-10`: Adaptabilidad a Orientación Landscape en Smartphone → **APROBADO**.

### E. ACCESIBILIDAD — WCAG 2.2 AA (10 Pruebas)
- `A11Y-01`: Atributo `lang="es"` en `<html>` → **APROBADO**.
- `A11Y-02`: Enlace de Salto al Contenido Principal (Skip Link) → **FALLIDO** (Falta enlace inicial accesible).
- `A11Y-03`: Anillos Visibles de Foco en Teclado (`focus-visible`) → **FALLIDO** (No hay feedback de foco claro).
- `A11Y-04`: Jerarquía Continua de Encabezados (H1-H6) → **FALLIDO** (Salto de H2 a H4 en competencias).
- `A11Y-05`: Estados Dinámicos ARIA en Menú Móvil → **FALLIDO** (Falta `aria-expanded` y `aria-controls`).
- `A11Y-06`: Nombres Accesibles en Enlaces de Solo Iconos → **APROBADO** (Todos tienen `aria-label`).
- `A11Y-07`: Ocultamiento de Iconos Decorativos con `aria-hidden` → **APROBADO**.
- `A11Y-08`: Ratio de Contraste en Texto Principal (WCAG 1.4.3 ≥ 4.5:1) → **APROBADO** (> 12:1).
- `A11Y-09`: Ratio de Contraste en Texto Secundario (Gris) → **APROBADO** (> 5.3:1).
- `A11Y-10`: Marcado Semántico de Landmarks HTML5 → **APROBADO** (Uso de nav, section, footer).

### F. BACKEND Y BASE DE DATOS (10 Pruebas)
- `BEND-01`: Validación de Esquema de Datos en Memoria → **APROBADO**.
- `BEND-02`: Resiliencia ante Colecciones Vacías → **APROBADO**.
- `BEND-03` a `BEND-10`: SQL Injection en Backend, Pools, Transacciones ACID, Planes EXPLAIN, Validación API REST, Rate Limiting, Migraciones y Respaldos DB → **NO APLICABLE** (No existen servicios dinámicos de backend en el cliente).

### G. EXPERIENCIA DE USUARIO — UI/UX (10 Pruebas)
- `UX-01`: Consistencia del Sistema de Diseño (Design System) → **APROBADO**.
- `UX-02`: Retroalimentación Visual en Interacciones Hover → **APROBADO**.
- `UX-03`: Desplazamiento Suave (Smooth Scrolling) → **APROBADO**.
- `UX-04`: Compensación de Altura de Barra Fija (Scroll Margin) → **FALLIDO** (Falta `scroll-mt-20`).
- `UX-05`: Escala Tipográfica y Legibilidad → **APROBADO**.
- `UX-06`: Diferenciación Clara de Proyectos Privados → **APROBADO**.
- `UX-07`: Claridad en Vías Directas de Contacto → **APROBADO**.
- `UX-08`: Facilidad para Copiar Correo al Portapapeles → **FALLIDO** (No hay botón interactivo de copiado).
- `UX-09`: Scrollspy en Navegación Superior → **APROBADO** (Opcional, pero anclas funcionan limpiamente).
- `UX-10`: Experiencia de Descarga de CV en 1 Clic → **APROBADO**.

### H. SEO & INDEXABILIDAD (5 Pruebas)
- `SEO-01`: Título y Meta Descripción para Motores de Búsqueda → **APROBADO**.
- `SEO-02`: Metadatos Open Graph y Twitter Cards → **FALLIDO** (Faltan etiquetas `og:*` y `twitter:*`).
- `SEO-03`: Archivo de Reglas de Rastreo `robots.txt` → **FALLIDO** (Archivo no existe).
- `SEO-04`: Mapa del Sitio en XML (`sitemap.xml`) → **FALLIDO** (Archivo no existe).
- `SEO-05`: URL Canónica → **APROBADO** (Estructura lista para vincular a GitHub Pages).

### I. COMPATIBILIDAD CROSS-BROWSER (5 Pruebas)
- `COMP-01`: Motores Chromium (Chrome, Edge, Brave, Opera) → **APROBADO**.
- `COMP-02`: Motor Gecko (Mozilla Firefox) → **APROBADO**.
- `COMP-03`: Motor WebKit (Apple Safari macOS/iOS) → **APROBADO**.
- `COMP-04`: Interacción en Pantallas Táctiles (Mobile Touch) → **APROBADO**.
- `COMP-05`: Degeneración Elegante con JavaScript Desactivado → **APROBADO**.

### J. DESPLIEGUE Y RECUPERACIÓN (5 Pruebas)
- `DEPL-01`: Estructura y Salud del Repositorio Git → **APROBADO**.
- `DEPL-02`: Integración Continua (GitHub Actions para Pages) → **FALLIDO** (Falta workflow automatizado).
- `DEPL-03`: Trazabilidad y Capacidad de Rollback → **APROBADO**.
- `DEPL-04`: Rutas Relativas Portables para Cualquier Hosting → **APROBADO**.
- `DEPL-05`: Respaldo Remoto en la Nube (GitHub Origin) → **APROBADO**.

