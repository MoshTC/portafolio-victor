/**
 * @component SocialIcon
 * @description Renderiza el ícono social correcto basado en el nombre.
 * Centraliza el mapeo nombre → componente Lucide para evitar
 * condicionales dispersos en la UI.
 */

import { Github, Linkedin } from 'lucide-react';

const ICON_MAP = {
  Github,
  Linkedin,
};

export default function SocialIcon({ name, size = 20 }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon size={size} />;
}

