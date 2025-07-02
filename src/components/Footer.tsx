
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 via-white to-yellow-50 border-t border-blue-100 mt-16 watercolor-footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4 scroll-reveal">
            <div className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center pet-icon-glow group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold pet-icon-interactive">🐾</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent pet-glow-blue group-hover:scale-105 transition-transform duration-300">
                GO Pet
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              <span className="pet-icon-interactive mr-1">💝</span>
              Tu tienda online de confianza para el cuidado y bienestar de tus mascotas. 
              <span className="pet-icon-interactive mx-1">✨</span>
              Productos de calidad, precios justos y envío a todo Perú.
              <span className="pet-icon-interactive ml-1">🚚</span>
            </p>
            <div className="flex space-x-4">
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform pet-icon-interactive pet-glow-blue">📘</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform pet-icon-interactive pet-glow-pink">📷</span>
              <span className="text-2xl cursor-pointer hover:scale-110 transition-transform pet-icon-interactive pet-glow-yellow">🐦</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 scroll-reveal">
            <div className="flex items-center">
              <span className="text-orange-400 mr-2 pet-icon-interactive pet-glow-orange">🐾</span>
              <h3 className="font-semibold text-gray-900 pet-glow-orange">Enlaces rápidos</h3>
              <span className="text-yellow-400 ml-2 pet-icon-interactive pet-glow-yellow">🔗</span>
            </div>
            <div className="space-y-2">
              <Link to="/catalogo?categoria=perros" className="block text-gray-600 hover:text-primary transition-colors text-sm pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">🐕</span>
                Productos para Perros
              </Link>
              <Link to="/catalogo?categoria=gatos" className="block text-gray-600 hover:text-primary transition-colors text-sm pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">🐱</span>
                Productos para Gatos
              </Link>
              <Link to="/catalogo?categoria=liquidacion" className="block text-gray-600 hover:text-primary transition-colors text-sm pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">🔥</span>
                Ofertas y Liquidación
              </Link>
              <Link to="#" className="block text-gray-600 hover:text-primary transition-colors text-sm pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">ℹ️</span>
                Sobre Nosotros
              </Link>
              <Link to="#" className="block text-gray-600 hover:text-primary transition-colors text-sm pet-link-glow flex items-center">
                <span className="pet-icon-interactive mr-2">📄</span>
                Términos y Condiciones
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 scroll-reveal">
            <div className="flex items-center">
              <span className="text-blue-400 mr-2 pet-icon-interactive pet-glow-blue">🐾</span>
              <h3 className="font-semibold text-gray-900 pet-glow-blue">Contacto</h3>
              <span className="text-green-400 ml-2 pet-icon-interactive pet-glow-green">📞</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-600 pet-link-glow">
                <span className="pet-icon-interactive">📞</span>
                <span>+51 930224945</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 pet-link-glow">
                <span className="pet-icon-interactive">📧</span>
                <span>Proyecto_Grupo_06@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 pet-link-glow">
                <span className="pet-icon-interactive">📍</span>
                <span>Lima, Perú</span>
                <span className="pet-icon-interactive">🇵🇪</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 pet-link-glow">
                <span className="pet-icon-interactive">🕒</span>
                <span>Lun - Vie: 9:00 - 18:00</span>
                <span className="pet-icon-interactive">⏰</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-100 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-yellow-400 pet-icon-interactive pet-glow-yellow">🐾</span>
            <p className="text-gray-500 text-sm">
              © 2024 GO Pet. Todos los derechos reservados. Desarrollado con 
              <span className="text-red-500 pet-icon-interactive mx-1">❤️</span> 
              para las mascotas 
              <span className="pet-icon-interactive">🥰</span>
            </p>
            <span className="text-blue-400 pet-icon-interactive pet-glow-blue">🐾</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
