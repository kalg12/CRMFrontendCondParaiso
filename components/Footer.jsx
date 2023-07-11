const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-4">
      <div className="container mx-auto px-4">
        <p className="text-center text-black">
          &copy; {currentYear} Condominios Paraíso Acapulco. Todos los derechos
          reservados.
        </p>
        <p className="text-center text-black text-xs mt-3">
          ¿Se están experimentando problemas en el sitio? Soporte:{" "}
          <a
            href="mailto:efpyi@example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            luciano19940@hotmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
