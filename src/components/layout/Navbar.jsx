/**
 * @component Navbar
 * @description Barra de navegación fija con efecto glass-blur y soporte móvil.
 * Consume enlaces centralizados desde data/.
 */

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, PERSONAL } from '../../data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 bg-background/90 backdrop-blur-md border-b border-card z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Marca */}
        <a href="#" className="text-xl font-bold text-white tracking-tighter">
          {PERSONAL.firstName}
          <span className="text-accent">{PERSONAL.lastName}</span>
        </a>

        {/* Links de navegación — Desktop */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menú desplegable en móvil */}
      {isOpen && (
        <div className="md:hidden bg-background/95 border-b border-neutral-800 px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-accent transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
