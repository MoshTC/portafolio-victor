/**
 * @component Hero
 * @description Sección principal (above the fold) con presentación,
 * CTA, enlaces sociales y flecha interactiva de scroll.
 */

import { motion } from 'framer-motion';
import { Download, ChevronDown } from 'lucide-react';
import { PERSONAL, SOCIAL_LINKS } from '../../data';
import { SocialIcon } from '../common';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen flex flex-col justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Badge de disponibilidad */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-neutral-800 text-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Disponible para nuevas oportunidades
        </div>

        {/* Título principal */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          {PERSONAL.headline} <br />
          <span className="text-accent">{PERSONAL.headlineAccent}</span>
        </h1>

        {/* Descripción */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          {PERSONAL.role} | {PERSONAL.tagline}.{' '}
          {PERSONAL.bio}
        </p>

        {/* Acciones */}
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-accent hover:bg-accentHover text-white font-medium rounded-lg transition-colors shadow-lg shadow-accent/20"
          >
            Ver proyectos
          </a>
          <a
            href={PERSONAL.cvPath}
            download
            className="px-6 py-3 bg-card hover:bg-neutral-800 border border-neutral-700 text-white font-medium rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download size={18} /> Descargar CV
          </a>

          {/* Redes sociales */}
          <div className="flex items-center gap-2 ml-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="p-3 bg-card hover:bg-neutral-800 rounded-lg text-gray-400 hover:text-white transition-colors border border-transparent hover:border-neutral-700"
              >
                <SocialIcon name={social.icon} size={20} />
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Indicador de scroll interactivo */}
      <a
        href="#about"
        aria-label="Ir a la siguiente sección"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-500 hover:text-accent transition-colors"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
