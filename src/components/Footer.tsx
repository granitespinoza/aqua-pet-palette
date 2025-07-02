
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-lime-bright/5 via-dark to-yellow-bright/5 border-t border-lime-bright/20 mt-16 watercolor-footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4 scroll-reveal">
            <div className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-lime-bright to-yellow-bright rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-black font-bold pet-icon-interactive">🐾</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-lime-bright to-yellow-bright bg-clip-text text-transparent pet-glow-lime group-hover:scale-105 transition-transform duration-300">
                GO Pet
              </span>
            </div>
            <p className="text-white text-sm leading-relaxed font-medium">
              <span className="pet-icon-interactive mr-1">💖</span>
              Tu tienda online de confianza para el cuidado y bienestar de tus mascotas. 
              <span className="pet-icon-interactive mx-1">✨</span>
              Productos de calidad, precios justos y envío a todo Perú.
              <span className="pet-icon-interactive ml-1">🚚</span>
            </p>
            <div className="flex space-x-4">
              <span className="text-3xl cursor-pointer hover:scale-125 transition-transform pet-icon-interactive pet-glow-lime">📘</span>
              <span className="text-3xl cursor-pointer hover:scale-125 transition-transform pet-icon-interactive pet-glow-yellow">📷</span>
              <span className="text-3xl cursor-pointer hover:scale-125 transition-transform pet-icon-interactive pet-glow-lime">🐦</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 scroll-reveal">
            <div className="flex items-center">
              <span className="text-lime-bright mr-2 pet-icon-interactive pet-glow-lime text-xl">🌟</span>
              <h3 className="font-bold text-white pet-glow-lime text-lg">Enlaces rápidos</h3>
              <span className="text-yellow-bright ml-2 pet-icon-interactive pet-glow-yellow text-xl">🔗</span>
            </div>
            <div className="space-y-2">
              <Link to="/catalogo?categoria=perros" className="block text-white hover:text-lime-bright transition-colors text-sm font-medium pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">🐕</span>
                Productos para Perros
              </Link>
              <Link to="/catalogo?categoria=gatos" className="block text-white hover:text-lime-bright transition-colors text-sm font-medium pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">🐱</span>
                Productos para Gatos
              </Link>
              <Link to="/catalogo?categoria=liquidacion" className="block text-white hover:text-yellow-bright transition-colors text-sm font-medium pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">🔥</span>
                Ofertas y Liquidación
              </Link>
              <Link to="#" className="block text-white hover:text-lime-bright transition-colors text-sm font-medium pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">ℹ️</span>
                Sobre Nosotros
              </Link>
              <Link to="#" className="block text-white hover:text-lime-bright transition-colors text-sm font-medium pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">📄</span>
                Términos y Condiciones
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 scroll-reveal">
            <div className="flex items-center">
              <span className="text-lime-bright mr-2 pet-icon-interactive pet-glow-lime text-xl">💬</span>
              <h3 className="font-bold text-white pet-glow-yellow text-lg">Contacto</h3>
              <span className="text-yellow-bright ml-2 pet-icon-interactive pet-glow-yellow text-xl">📞</span>
            </div>
            <div className="space-y-2 text-sm font-medium">
              <div className="flex items-center space-x-2 text-white pet-link-glow">
                <span className="pet-icon-interactive">📞</span>
                <span>+51 930224945</span>
              </div>
              <div className="flex items-center space-x-2 text-white pet-link-glow">
                <span className="pet-icon-interactive">📧</span>
                <span>Proyecto_Grupo_06@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-white pet-link-glow">
                <span className="pet-icon-interactive">📍</span>
                <span>Lima, Perú</span>
                <span className="pet-icon-interactive">🇵🇪</span>
              </div>
              <div className="flex items-center space-x-2 text-white pet-link-glow">
                <span className="pet-icon-interactive">🕒</span>
                <span>Lun - Vie: 9:00 - 18:00</span>
                <span className="pet-icon-interactive">⏰</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-lime-bright/20 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-lime-bright pet-icon-interactive pet-glow-lime text-xl">🏆</span>
            <p className="text-white text-sm font-medium">
              © 2024 GO Pet. Todos los derechos reservados. Desarrollado con 
              <span className="text-yellow-bright pet-icon-interactive mx-1">💖</span> 
              para las mascotas 
              <span className="pet-icon-interactive">🥰</span>
            </p>
            <span className="text-yellow-bright pet-icon-interactive pet-glow-yellow text-xl">✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
