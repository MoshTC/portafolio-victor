/**
 * @component SectionHeading
 * @description Encabezado reutilizable para secciones de la página.
 * Incluye la línea roja decorativa a la izquierda y el título.
 */

export default function SectionHeading({ children }) {
  return (
    <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
      <span className="w-8 h-[2px] bg-accent" aria-hidden="true" />
      {children}
    </h2>
  );
}

