
import { Link } from 'react-router-dom';
import { useTenant } from '@/contexts/TenantContext';
import { Heart, Star, MapPin, Clock, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const { tenant } = useTenant();

  if (!tenant) return null;

  return (
    <footer className="watercolor-footer border-t-4 border-pastel-blue/40 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Enhanced Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-pastel-cyan via-pastel-peach to-pastel-pink rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500 shadow-2xl animate-float border-4 border-white/50">
                <span className="text-gray-900 font-extra-bold text-2xl pet-icon-interactive">{tenant.logo}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extra-bold bg-gradient-to-r from-pastel-cyan via-pastel-peach to-pastel-pink bg-clip-text text-transparent pet-glow-cyan group-hover:scale-110 transition-transform duration-500">
                  {tenant.name}
                </span>
                <span className="text-sm text-gray-700 font-semibold opacity-80">Tu tienda de confianza</span>
              </div>
            </div>
            <div className="glass-effect p-6 rounded-2xl border-2 border-pastel-cyan/30">
              <p className="text-gray-900 text-base leading-relaxed font-semibold enhanced-visibility">
                <Heart className="inline w-5 h-5 mr-2 text-pastel-pink animate-bounce-gentle" />
                Tu tienda online de confianza para el cuidado y bienestar de tus mascotas. 
                <Star className="inline w-5 h-5 mx-2 text-pastel-yellow animate-float" />
                Productos de calidad, precios justos y envío a todo Perú.
                <span className="pet-icon-interactive ml-2 text-xl">🚚</span>
              </p>
            </div>
            <div className="flex space-x-6">
              <div className="w-12 h-12 bg-gradient-to-r from-pastel-blue to-pastel-cyan rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-300 pet-icon-interactive shadow-lg">
                <span className="text-2xl">📘</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pastel-peach to-pastel-pink rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-300 pet-icon-interactive shadow-lg">
                <span className="text-2xl">📷</span>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pastel-green to-pastel-yellow rounded-full flex items-center justify-center cursor-pointer hover:scale-125 transition-transform duration-300 pet-icon-interactive shadow-lg">
                <span className="text-2xl">🐦</span>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start">
              <Star className="w-6 h-6 text-pastel-cyan mr-3 pet-icon-interactive animate-float" />
              <h3 className="font-extra-bold text-gray-900 pet-glow-cyan text-2xl enhanced-visibility">Enlaces rápidos</h3>
              <span className="text-pastel-peach ml-3 pet-icon-interactive text-2xl animate-bounce-gentle">🔗</span>
            </div>
            <div className="glass-effect p-6 rounded-2xl border-2 border-pastel-blue/30 space-y-4">
              <Link to="/catalogo?categoria=perros" className="flex items-center text-gray-900 hover:text-gray-900 transition-colors text-base font-bold pet-link-glow enhanced-visibility group">
                <span className="pet-icon-interactive mr-3 text-xl group-hover:scale-125 transition-transform">🐕</span>
                <span>Productos para Perros</span>
              </Link>
              <Link to="/catalogo?categoria=gatos" className="flex items-center text-gray-900 hover:text-gray-900 transition-colors text-base font-bold pet-link-glow enhanced-visibility group">
                <span className="pet-icon-interactive mr-3 text-xl group-hover:scale-125 transition-transform">🐱</span>
                <span>Productos para Gatos</span>
              </Link>
              <Link to="/catalogo?categoria=liquidacion" className="flex items-center text-gray-900 hover:text-gray-900 transition-colors text-base font-bold pet-link-glow enhanced-visibility group shimmer">
                <span className="pet-icon-interactive mr-3 text-xl group-hover:scale-125 transition-transform">🔥</span>
                <span>Ofertas y Liquidación</span>
                <span className="pet-icon-interactive ml-2 text-xl animate-bounce-gentle">💥</span>
              </Link>
              <Link to="#" className="flex items-center text-gray-900 hover:text-gray-900 transition-colors text-base font-bold pet-link-glow enhanced-visibility group">
                <span className="pet-icon-interactive mr-3 text-xl group-hover:scale-125 transition-transform">ℹ️</span>
                <span>Sobre Nosotros</span>
              </Link>
              <Link to="#" className="flex items-center text-gray-900 hover:text-gray-900 transition-colors text-base font-bold pet-link-glow enhanced-visibility group">
                <span className="pet-icon-interactive mr-3 text-xl group-hover:scale-125 transition-transform">📄</span>
                <span>Términos y Condiciones</span>
              </Link>
            </div>
          </div>

          {/* Enhanced Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="w-6 h-6 text-pastel-cyan mr-3 pet-icon-interactive animate-bounce-gentle" />
              <h3 className="font-extra-bold text-gray-900 pet-glow-peach text-2xl enhanced-visibility">Contacto</h3>
              <span className="text-pastel-peach ml-3 pet-icon-interactive text-2xl animate-float">📞</span>
            </div>
            <div className="glass-effect p-6 rounded-2xl border-2 border-pastel-peach/30 space-y-4">
              <div className="flex items-center space-x-3 text-gray-900 pet-link-glow enhanced-visibility group">
                <Phone className="w-5 h-5 pet-icon-interactive group-hover:scale-125 transition-transform" />
                <span className="font-bold">+51 930224945</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-900 pet-link-glow enhanced-visibility group">
                <Mail className="w-5 h-5 pet-icon-interactive group-hover:scale-125 transition-transform" />
                <span className="font-bold">Proyecto_Grupo_06@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-900 pet-link-glow enhanced-visibility group">
                <MapPin className="w-5 h-5 pet-icon-interactive group-hover:scale-125 transition-transform" />
                <span className="font-bold">Lima, Perú</span>
                <span className="pet-icon-interactive text-xl animate-bounce-gentle">🇵🇪</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-900 pet-link-glow enhanced-visibility group">
                <Clock className="w-5 h-5 pet-icon-interactive group-hover:scale-125 transition-transform" />
                <span className="font-bold">Lun - Vie: 9:00 - 18:00</span>
                <span className="pet-icon-interactive text-xl animate-float">⏰</span>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="glass-effect p-6 rounded-2xl border-2 border-pastel-green/30">
              <h4 className="font-extra-bold text-gray-900 text-lg mb-4 enhanced-visibility">
                <span className="pet-icon-interactive mr-2 text-xl">📧</span>
                Newsletter
              </h4>
              <p className="text-gray-800 font-semibold mb-4">Recibe ofertas exclusivas</p>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="tu@email.com" 
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-pastel-cyan/40 focus:border-pastel-peach text-gray-900 font-semibold"
                />
                <button className="pet-button-primary px-4 py-2 rounded-lg font-bold">
                  <span className="pet-icon-interactive">📬</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-pastel-blue/40 mt-12 pt-8">
          <div className="glass-effect p-6 rounded-2xl border-2 border-gradient-to-r from-pastel-cyan to-pastel-peach">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-pastel-cyan pet-icon-interactive text-2xl animate-bounce-gentle">🏆</span>
              <p className="text-gray-900 text-lg font-extra-bold enhanced-visibility text-center">
                © 2024 {tenant.name}. Todos los derechos reservados. Desarrollado con 
                <Heart className="inline w-6 h-6 text-pastel-pink mx-2 animate-float" /> 
                para las mascotas 
                <span className="pet-icon-interactive text-xl">🥰</span>
              </p>
              <span className="text-pastel-peach pet-icon-interactive text-2xl animate-float">✨</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
