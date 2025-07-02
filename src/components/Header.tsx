
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import SearchBar from './SearchBar';

const Header = () => {
  const { user, logout } = useUser();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (!user) {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 border-b border-blue-100 watercolor-section">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-sm">
            <div className="text-primary font-medium pet-glow-blue flex items-center">
              <span className="pet-icon-interactive mr-2">🐾</span>
              Envío gratis desde S/ 100.00
              <span className="pet-icon-interactive ml-2">🚚</span>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1 pet-link-glow">
                <span className="pet-icon-interactive">📞</span>
                <span>+51 930224945</span>
              </div>
              <div className="flex items-center space-x-1 pet-link-glow">
                <span className="pet-icon-interactive">📧</span>
                <span>Proyecto_Grupo_06@gmail.com</span>
              </div>
              {!user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuthClick}
                  className="text-primary hover:text-blue-700 pet-button-interactive"
                >
                  <span className="pet-icon-interactive mr-1">👋</span>
                  Recibir <span className="ml-1">›</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg pet-glow-blue' : ''
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center pet-icon-glow transition-all duration-300 group-hover:scale-110">
                <span className="text-white font-bold text-lg pet-icon-interactive">🐾</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent pet-glow-blue group-hover:scale-105 transition-transform duration-300">
                GO Pet
              </span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex pet-button-interactive pet-button-particles">
                      <User className="w-4 h-4 mr-2 pet-icon-interactive" />
                      <span className="pet-icon-interactive mr-1">👤</span> {user.profile.nombre}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-2 border-blue-100 shadow-xl">
                    <DropdownMenuItem onClick={logout} className="pet-link-glow">
                      <LogOut className="w-4 h-4 mr-2 pet-icon-interactive" />
                      <span className="pet-icon-interactive mr-1">👋</span>
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" className="hidden md:flex pet-button-interactive pet-button-particles" onClick={handleAuthClick}>
                  <User className="w-4 h-4 mr-2 pet-icon-interactive" />
                  <span className="pet-icon-interactive mr-1">👤</span>
                  Mi cuenta
                </Button>
              )}
              
              <CartDrawer />
              <Button variant="ghost" size="sm" className="md:hidden pet-button-interactive">
                <Menu className="w-4 h-4 pet-icon-interactive" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="bg-white/90 backdrop-blur-sm border-t border-blue-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center md:justify-start space-x-1 py-3 overflow-x-auto">
              <Link 
                to="/catalogo?marca=canbo"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors pet-link-glow pet-button-interactive"
              >
                <span className="pet-icon-interactive mr-1">🏷️</span>
                Marcas
              </Link>
              <Link 
                to="/catalogo?categoria=perros"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors pet-link-glow pet-button-interactive"
              >
                <span className="pet-icon-interactive mr-1">🐕</span>
                Perros
              </Link>
              <Link 
                to="/catalogo?categoria=gatos"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors pet-link-glow pet-button-interactive"
              >
                <span className="pet-icon-interactive mr-1">🐱</span>
                Gatos
              </Link>
              <Link 
                to="/catalogo?categoria=otras-mascotas"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors pet-link-glow pet-button-interactive"
              >
                <span className="pet-icon-interactive mr-1">🐰</span>
                Otras Mascotas
              </Link>
              <Link 
                to="/catalogo?categoria=liquidacion"
                className="whitespace-nowrap px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-semibold pet-link-glow pet-button-interactive pet-glow-red"
              >
                <span className="pet-icon-interactive mr-1">🔥</span>
                Liquidación
                <span className="pet-icon-interactive ml-1">💥</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
      />
    </>
  );
};

export default Header;
