/**
 * @component App
 * @description Componente raíz de la aplicación.
 * Actúa como orquestador — ensambla el layout y las secciones.
 * Toda la lógica y datos viven en sus respectivos módulos.
 */

import { Navbar, Footer } from './components/layout';
import { Hero, About, Technologies, Projects, Experience } from './components/sections';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-gray-200">
      <Navbar />
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <Experience />
      <Footer />
    </div>
  );
}
