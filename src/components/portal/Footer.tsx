import { useState } from 'react';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';
const Footer = () => {
  const [email, setEmail] = useState('');
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };
  return <footer id="contacto" className="footer-professional">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-lime-500">
                <span className="text-white text-xl">🐾</span>
              </div>
              <span className="text-2xl font-bold text-white">GO Pet</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Tu plataforma integral para el cuidado y bienestar de tus mascotas. 
              Productos de calidad, precios justos y la mejor atención.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <span className="text-sm">📘</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <span className="text-sm">📷</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <span className="text-sm">🐦</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Enlaces Rápidos</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Sobre Nosotros</a>
              <a href="#tiendas" className="block text-gray-400 hover:text-white transition-colors">Nuestras Tiendas</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Política de Envíos</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Términos y Condiciones</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Política de Privacidad</a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">+51 930224945</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">Proyecto_Grupo_06@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">Lima, Perú</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-400 text-center">
              © 2024 GO Pet. Todos los derechos reservados. Desarrollado con 
              <Heart className="inline w-4 h-4 text-red-500 mx-1" /> 
              para las mascotas
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;