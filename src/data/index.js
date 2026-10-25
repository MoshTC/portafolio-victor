/**
 * @file data/index.js
 * @description Barrel file — re-exporta todos los módulos de datos
 * desde un único punto de entrada para simplificar los imports.
 *
 * Uso: import { PROJECTS, PERSONAL } from '@/data';
 */

export { NAV_LINKS } from './navigation';
export { TECHNOLOGIES } from './technologies';
export { PROJECTS, PROJECT_FILTERS } from './projects';
export { EXPERIENCE } from './experience';
export { PERSONAL, SOCIAL_LINKS } from './personal';

