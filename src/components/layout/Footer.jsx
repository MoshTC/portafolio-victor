/**
 * @component Footer
 * @description Pie de página con CTA de contacto, enlaces sociales y copyright.
 * Todos los datos se consumen desde data/personal.js.
 */

import { Mail } from 'lucide-react';
import { PERSONAL, SOCIAL_LINKS } from '../../data';
import { SocialIcon } from '../common';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-20 bg-card border-t border-neutral-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          ¿Tienes un proyecto en mente?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Estoy abierto a oportunidades profesionales, colaboraciones y
          proyectos donde pueda aportar mis conocimientos técnicos y seguir
          desarrollándome.
        </p>

        {/* CTA principal */}
        <a
          href={`mailto:${PERSONAL.email}`}
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accentHover text-white font-bold rounded-lg transition-colors"
        >
          <Mail size={20} /> Contactarme
        </a>

        {/* Redes sociales */}
        <div className="flex justify-center gap-4 mt-8">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <SocialIcon name={social.icon} size={20} />
            </a>
          ))}
        </div>

        <p className="text-gray-600 text-xs mt-8">
          © {currentYear} {PERSONAL.firstName} {PERSONAL.lastName}. Todos los
          derechos reservados.
        </p>
      </div>
    </footer>
  );
}

