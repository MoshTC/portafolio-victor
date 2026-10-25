/**
 * @component Experience
 * @description Timeline vertical de experiencia profesional/académica.
 * Los datos se consumen desde data/experience.js.
 * `isCurrent` controla el color del punto en el timeline (rojo = activo).
 */

import { motion } from 'framer-motion';
import { EXPERIENCE } from '../../data';
import { SectionHeading } from '../common';

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-20 bg-card/30 border-y border-neutral-900"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Experiencia</SectionHeading>

        <div className="space-y-8">
          {EXPERIENCE.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-neutral-800"
            >
              {/* Punto del timeline */}
              <div
                className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
                  item.isCurrent ? 'bg-accent' : 'bg-neutral-700'
                }`}
              />

              <div className="bg-card p-6 rounded-xl border border-neutral-800">
                <span
                  className={`text-sm font-medium ${
                    item.isCurrent ? 'text-accent' : 'text-gray-500'
                  }`}
                >
                  {item.period}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

