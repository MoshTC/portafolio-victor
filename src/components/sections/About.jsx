/**
 * @component About
 * @description Sección de áreas de especialización y enfoque técnico.
 */

import { motion } from 'framer-motion';
import { Code, Database, Server } from 'lucide-react';
import { SectionHeading } from '../common';

const AREAS = [
  {
    icon: Code,
    title: 'Desarrollo de Software',
    description:
      'Creación de interfaces limpias y lógica estructurada utilizando tecnologías web modernas y lenguajes orientados a objetos.',
  },
  {
    icon: Database,
    title: 'Bases de Datos',
    description:
      'Modelado entidad-relación, optimización de consultas y persistencia eficiente utilizando MySQL y SQL Server.',
  },
  {
    icon: Server,
    title: 'Infraestructura y TI',
    description:
      'Mantenimiento de equipos, configuración de redes y administración de sistemas en entornos institucionales reales.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-card/30 border-y border-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading>Sobre Mí & Especialidades</SectionHeading>

        <div className="grid md:grid-cols-3 gap-6">
          {AREAS.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-xl border border-neutral-800 hover:border-accent/50 transition-colors"
              >
                <Icon className="text-accent mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">{area.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{area.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
