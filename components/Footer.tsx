export function Footer() {
  return (
    <footer className="py-16 px-[120px] max-w-[1720px] mx-auto border-t border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <p className="text-text dark:text-text-dark mb-2">
          Hecho con IA y ❤️ por{' '}
          <a href="https://aurora33.dev" className="text-primary hover:underline font-semibold">
            Aurora33
          </a>
        </p>
        <p className="text-text-muted dark:text-text-muted-dark mb-4">¿Necesitas soluciones personalizadas para tu negocio?</p>

        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a href="https://aurora33.dev" className="text-primary hover:underline font-medium">
            Desarrollo Web
          </a>
          <a href="https://aurora33.dev" className="text-primary hover:underline font-medium">
            Consultoría
          </a>
          <a href="https://aurora33.dev" className="text-primary hover:underline font-medium">
            Contacto
          </a>
        </div>

        <p className="text-base text-text-muted dark:text-text-muted-dark">© 2024 Aurora33 · Todos los derechos reservados</p>
      </div>
    </footer>
  );
}
