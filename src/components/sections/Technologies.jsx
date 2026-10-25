/**
 * @component Technologies
 * @description Sección que muestra el stack tecnológico como badges
 * con animación de entrada escalonada al hacer scroll.
 */

import { motion } from 'framer-motion';
import { TECHNOLOGIES } from '../../data';
import { SectionHeading } from '../common';

export default function Technologies() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <SectionHeading>Tecnologías</SectionHeading>

      <div className="flex flex-wrap gap-3">
        {TECHNOLOGIES.map((tech, index) => (
          <motion.span
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
            className="px-4 py-2 bg-card border border-neutral-800 rounded-lg text-sm text-gray-300 hover:border-accent/50 hover:text-white transition-colors cursor-default"
          >
            {tech.name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

