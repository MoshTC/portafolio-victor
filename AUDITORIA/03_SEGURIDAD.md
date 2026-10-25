# 03 — INFORME DE SEGURIDAD Y VULNERABILIDADES CONFIRMADAS
**Proyecto:** Portafolio Web Profesional — Víctor Alfredo Tinoco Cárdenas  
**Clasificación de Riesgos:** OWASP Top 10 2021 / Common Weakness Enumeration (CWE)  

---

## 1. Resumen Ejecutivo de Seguridad

La superficie de ataque de la aplicación es **extremadamente reducida** debido a su naturaleza puramente estática: no almacena datos de usuarios en bases de datos, no procesa pagos, no mantiene sesiones en servidores y no expone APIs con permisos elevados.

Sin embargo, en el análisis estático y dinámico del cliente se confirmaron **4 hallazgos de seguridad** que deben corregirse para alcanzar un nivel de robustez de grado corporativo.

---

## 2. Vulnerabilidades Confirmadas y Clasificadas

### Hallazgo SEC-V1: Riesgo de Tabnabbing Inverso (Reverse Tabnabbing)
- **ID CWE:** [CWE-1022: Use of Web Link to Untrusted Target with window.opener Access](https://cwe.mitre.org/data/definitions/1022.html)
- **Severidad:** **Baja** (CVSS v3.1: 3.1)
- **Ubicación:** `index.html` (enlaces a WhatsApp, LinkedIn, GitHub) y `js/app.js` (tarjetas de proyectos).
- **Descripción:** Cuando se utiliza `target="_blank"` sin `rel="noopener"`, la página de destino externa puede acceder al objeto `window.opener` de la pestaña original y redirigirla a un sitio malicioso o de phishing sin que el usuario lo note.
- **Evidencia:**
  ```html
  <!-- index.html línea 242 -->
  <a href="https://wa.me/51943541660" target="_blank" rel="noreferrer" ...>
  ```
- **Remediación:** Agregar explícitamente `rel="noopener noreferrer"` en todos los hipervínculos que apunten al exterior con `target="_blank"`.

---

### Hallazgo SEC-V2: Ausencia de Content-Security-Policy (CSP)
- **ID CWE:** [CWE-693: Protection Mechanism Failure](https://cwe.mitre.org/data/definitions/693.html)
- **Severidad:** **Media** (CVSS v3.1: 5.3)
- **Ubicación:** `index.html` (sección `<head>`).
- **Descripción:** La aplicación no define una política de seguridad de contenido. Si un atacante lograra inyectar código en el DOM o comprometer una librería de terceros, el navegador ejecutaría cualquier script o cargaría recursos desde cualquier dominio no autorizado.
- **Evidencia:** Búsqueda de `<meta http-equiv="Content-Security-Policy">` arrojó resultado negativo (ausente).
- **Remediación:** Incluir una meta etiqueta CSP estricta pero compatible con los orígenes legítimos:
  ```html
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;">
  ```

---

### Hallazgo SEC-V3: Inyección Directa en DOM (`.innerHTML`) sin Sanitización
- **ID CWE:** [CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')](https://cwe.mitre.org/data/definitions/79.html)
- **Severidad:** **Media** (CVSS v3.1: 4.8)
- **Ubicación:** `js/app.js` (5 funciones: `renderSkillsCategories`, `initProjectsFilter`, `renderProjects`, `renderExperienceAndEducation`, `renderCompetencies`).
- **Descripción:** Las funciones concatenan cadenas literales de texto directamente en la propiedad `.innerHTML`. Aunque actualmente los datos provienen del archivo local `data.js`, esta práctica no cumple con los lineamientos de OWASP ASVS v4.0.3 (Nivel 1) ya que cualquier dato futuro o manipulado podría inyectar etiquetas `<script>` o atributos `onerror`.
- **Evidencia:**
  ```javascript
  // js/app.js línea 29
  container.innerHTML = PORTFOLIO_DATA.skillsCategories.map(...)
  ```
- **Remediación:** Implementar una función utilitaria `escapeHTML(str)` para codificar entidades HTML (`&`, `<`, `>`, `"`, `'`) antes de la interpolación en cadenas, o emplear APIs seguras del DOM (`document.createElement`, `textContent`).

---

### Hallazgo SEC-V4: Carga de Dependencias CDN sin Subresource Integrity (SRI)
- **ID CWE:** [CWE-353: Missing Support for Integrity Check](https://cwe.mitre.org/data/definitions/353.html)
- **Severidad:** **Media** (CVSS v3.1: 5.0)
- **Ubicación:** `index.html` líneas 13 y 30.
- **Descripción:** Se cargan `cdn.tailwindcss.com` y `unpkg.com/lucide` sin atributos `integrity` criptográficos (hashes SHA-384/SHA-512). Si el CDN sufriera un ataque de envenenamiento de caché o secuestro de dominio, el navegador del usuario ejecutaría el payload malicioso.
- **Remediación:** En entornos de producción estáticos definitivos, se recomienda añadir hashes SRI o empaquetar los scripts de terceros dentro de la carpeta local `js/vendor/`.

---

## 3. Matriz de Prioridad de Corrección

| Prioridad | ID | Hallazgo | Dificultad de Corrección | Impacto en Producción |
| :---: | :--- | :--- | :---: | :---: |
| **Alta** | SEC-V1 | Agregar `noopener` a enlaces externos | Muy Baja (5 mins) | Inmediata eliminación de riesgo de phishing |
| **Alta** | SEC-V2 | Configurar Content-Security-Policy | Baja (10 mins) | Blindaje de ejecución en el navegador |
| **Media** | SEC-V3 | Sanitizar concatenaciones `innerHTML` | Baja (15 mins) | Código conforme a OWASP ASVS L1 |
| **Media** | SEC-V4 | Asegurar integridad de scripts CDN | Media (15 mins) | Protección contra riesgos de terceros |

