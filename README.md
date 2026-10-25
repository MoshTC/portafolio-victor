# Portafolio Personal — Víctor Tinoco

Portafolio web profesional desarrollado con **HTML5, Tailwind CSS y JavaScript vanilla**. 

Diseñado para ser **100% estático**: no requiere Node.js, compiladores ni dependencias locales. Puedes abrirlo directamente con doble clic o subirlo a cualquier servidor web tradicional (Apache, Nginx, cPanel, Hostinger, GitHub Pages, etc.).

---

## ⚡ Cómo ver la página en tu computadora

Tienes dos opciones súper sencillas:

### Opción 1: Directo en tu navegador (Doble clic)
Haz doble clic en el archivo `index.html` en tu explorador de archivos y se abrirá inmediatamente en Chrome, Edge o Firefox.

### Opción 2: Con VS Code (Recomendado para editar)
1. Instala la extensión **Live Server** en VS Code si aún no la tienes.
2. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.

---

## 📁 Estructura del proyecto

```text
portafolio-victor/
├── index.html              # Estructura principal de la página
├── css/
│   └── style.css           # Estilos adicionales, scrollbar y animaciones
├── js/
│   ├── data.js             # Todos los datos editables (proyectos, bio, enlaces)
│   └── app.js              # Lógica interactiva (filtros, menú móvil, animaciones)
├── assets/
│   ├── favicon.svg         # Ícono del sitio personalizado (VT)
│   └── cv-victor-tinoco.pdf # Tu currículum descargable
└── README.md
```

---

## ✏️ Cómo personalizar tu contenido

Toda la información está centralizada en **`js/data.js`**. Para cambiar cualquier dato, solo abre ese archivo y edita:

* **Información personal y redes:** En `PORTFOLIO_DATA.personal`.
* **Proyectos:** En `PORTFOLIO_DATA.projects`.
* **Habilidades / Tecnologías:** En `PORTFOLIO_DATA.technologies`.
* **Experiencia:** En `PORTFOLIO_DATA.experience`.

---

## 🌐 Subir a un servidor / Hosting

Solo copia todos los archivos de esta carpeta a la carpeta pública de tu servidor (por ejemplo `public_html` en cPanel o la raíz de GitHub Pages) y funcionará al instante.
