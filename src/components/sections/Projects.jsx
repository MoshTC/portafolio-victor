/**
 * @component Projects
 * @description Sección de proyectos con filtrado interactivo por tecnología.
 * Maneja estados para repositorios públicos y proyectos institucionales/privados.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Lock } from 'lucide-react';
import { PROJECTS, PROJECT_FILTERS } from '../../data';
import { SectionHeading } from '../common';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filteredProjects =
    activeFilter === 'Todos'
      ? PROJECTS
      : PROJECTS.filter((p) => p.tech.includes(activeFilter));

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading>Proyectos Destacados</SectionHeading>

      {/* Barra de filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {PROJECT_FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === filter
                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                : 'bg-card border border-neutral-800 text-gray-400 hover:text-white hover:border-neutral-600'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid de proyectos */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-card p-6 rounded-xl border border-neutral-800 hover:border-accent/50 transition-colors group flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Tags de tecnología */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-neutral-900 text-gray-300 text-xs rounded border border-neutral-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Enlaces y estado */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/60">
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-white flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <Github size={16} /> Ver Repositorio
                </a>
              ) : (
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <Lock size={14} className="text-neutral-500" /> Código institucional / privado
                </span>
              )}

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-white flex items-center gap-1 hover:text-accent transition-colors"
                >
                  <ExternalLink size={16} /> Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
