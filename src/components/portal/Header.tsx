
import { Heart, UserCircle, ShoppingCart, Truck, Phone, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header-professional">
      {/* Pre-Header */}
      <div className="bg-neutral-900 text-neutral-200">
        <div className="container-professional">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-success-400" />
                <span>Envío gratis desde S/ 100.00</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>+51 930224945</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>Proyecto_Grupo_06@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-border/20">
        <div className="container-professional">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-catshop-500 flex items-center justify-center shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-105">
                  <span className="text-white text-2xl">🐾</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-catshop-500 bg-clip-text text-transparent">
                  GO Pet
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  Portal Principal
                </span>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#tiendas" className="nav-link">Nuestras Tiendas</a>
              <a href="#servicios" className="nav-link">Servicios</a>
              <a href="#contacto" className="nav-link">Contacto</a>
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-2 text-neutral-600 hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              
              <button className="hidden md:flex items-center space-x-2 text-neutral-600 hover:text-primary transition-colors">
                <UserCircle className="w-5 h-5" />
              </button>
              
              <button className="hidden md:flex items-center space-x-2 text-neutral-600 hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-neutral-600 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border/20 py-4 animate-slide-up">
              <nav className="flex flex-col space-y-4">
                <a href="#tiendas" className="text-neutral-600 hover:text-primary transition-colors py-2">
                  Nuestras Tiendas
                </a>
                <a href="#servicios" className="text-neutral-600 hover:text-primary transition-colors py-2">
                  Servicios
                </a>
                <a href="#contacto" className="text-neutral-600 hover:text-primary transition-colors py-2">
                  Contacto
                </a>
                <div className="flex items-center space-x-4 pt-4 border-t border-border/20">
                  <button className="flex items-center space-x-2 text-neutral-600">
                    <Heart className="w-5 h-5" />
                    <span>Favoritos</span>
                  </button>
                  <button className="flex items-center space-x-2 text-neutral-600">
                    <UserCircle className="w-5 h-5" />
                    <span>Perfil</span>
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
