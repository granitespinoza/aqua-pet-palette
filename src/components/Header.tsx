
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Menu, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/contexts/UserContext';
import { useTenant } from '@/contexts/TenantContext';
import CartDrawer from './CartDrawer';
import AuthModal from './AuthModal';
import SearchBar from './SearchBar';

const Header = () => {
  const { user, logout } = useUser();
  const { tenant, tenantId } = useTenant();
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

  if (!tenant) return null;

  return (
    <>
      {/* Top Bar with enhanced styling */}
      <div className="watercolor-section border-b-2 border-pastel-blue/40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-900 font-bold pet-glow-cyan flex items-center enhanced-visibility">
              <span className="pet-icon-interactive mr-2 text-lg">🚚</span>
              <span className="text-base font-extra-bold">Envío gratis desde S/ 100.00 - {tenant.name}</span>
              <span className="pet-icon-interactive ml-2 text-lg">✨</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-900 font-semibold">
              <div className="flex items-center space-x-2 pet-link-glow">
                <span className="pet-icon-interactive text-lg">📞</span>
                <span className="enhanced-visibility">+51 930224945</span>
              </div>
              <div className="flex items-center space-x-2 pet-link-glow">
                <span className="pet-icon-interactive text-lg">📧</span>
                <span className="enhanced-visibility">Proyecto_Grupo_06@gmail.com</span>
              </div>
              {!user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuthClick}
                  className="text-gray-900 hover:text-gray-900 hover:bg-pastel-cyan/60 pet-button-primary text-high-contrast"
                >
                  <span className="pet-icon-interactive mr-2">👋</span>
                  <span className="font-bold">Iniciar Sesión</span>
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with enhanced glass effect */}
      <header className={`glass-effect border-b-2 border-pastel-blue/40 sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'shadow-2xl animate-pulse-glow backdrop-blur-3xl' : ''
      }`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-16 h-16 bg-gradient-to-br from-pastel-cyan via-pastel-peach to-pastel-pink rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-125 shadow-2xl animate-bounce-gentle border-4 border-white/50">
                <span className="text-gray-900 font-extra-bold text-2xl pet-icon-interactive">{tenant.logo}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-extra-bold bg-gradient-to-r from-pastel-cyan via-pastel-peach to-pastel-pink bg-clip-text text-transparent pet-glow-cyan group-hover:scale-110 transition-transform duration-500">
                  {tenant.name}
                </span>
                <span className="text-sm text-gray-700 font-semibold opacity-80">Tu tienda de mascotas favorita</span>
              </div>
            </Link>

            {/* Enhanced Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <SearchBar />
                <div className="absolute -top-1 -right-1">
                  <span className="pet-icon-interactive text-2xl animate-bounce-gentle">🔍</span>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center space-x-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden md:flex pet-button-primary text-gray-900 font-bold enhanced-visibility">
                      <User className="w-5 h-5 mr-2 pet-icon-interactive" />
                      <span className="pet-icon-interactive mr-2">👤</span> 
                      <span className="font-extra-bold">{user.profile.nombre}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="glass-effect border-2 border-pastel-blue/40 shadow-2xl">
                    <DropdownMenuItem onClick={logout} className="pet-link-glow text-gray-900 hover:text-gray-900 enhanced-visibility">
                      <LogOut className="w-4 h-4 mr-2 pet-icon-interactive" />
                      <span className="pet-icon-interactive mr-2">👋</span>
                      <span className="font-bold">Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" className="hidden md:flex pet-button-primary text-gray-900 font-bold enhanced-visibility" onClick={handleAuthClick}>
                  <User className="w-5 h-5 mr-2 pet-icon-interactive" />
                  <span className="pet-icon-interactive mr-2">👤</span>
                  <span className="font-extra-bold">Mi cuenta</span>
                </Button>
              )}
              
              <CartDrawer />
              <Button variant="ghost" size="sm" className="md:hidden pet-button-primary text-gray-900">
                <Menu className="w-5 h-5 pet-icon-interactive" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Menu */}
        <nav className="glass-effect border-t-2 border-pastel-blue/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center md:justify-start space-x-2 py-4 overflow-x-auto">
              {tenantId === 'catshop' ? (
                <>
                  <Link 
                    to="/catalogo?categoria=gatos"
                    className="whitespace-nowrap px-6 py-3 text-sm font-extra-bold text-gray-900 hover:text-gray-900 hover:bg-pastel-cyan/80 rounded-xl transition-all duration-300 pet-link-glow pet-button-primary enhanced-visibility border-2 border-transparent hover:border-pastel-cyan"
                  >
                    <span className="pet-icon-interactive mr-2 text-lg">🐱</span>
                    <span>Productos para Gatos</span>
                  </Link>
                  <Link 
                    to="/catalogo?categoria=juguetes"
                    className="whitespace-nowrap px-6 py-3 text-sm font-extra-bold text-gray-900 hover:text-gray-900 hover:bg-pastel-blue/80 rounded-xl transition-all duration-300 pet-link-glow pet-button-primary enhanced-visibility border-2 border-transparent hover:border-pastel-blue"
                  >
                    <span className="pet-icon-interactive mr-2 text-lg">🧸</span>
                    <span>Juguetes</span>
                  </Link>
                </>
              ) : tenantId === 'dogshop' ? (
                <>
                  <Link 
                    to="/catalogo?categoria=perros"
                    className="whitespace-nowrap px-6 py-3 text-sm font-extra-bold text-gray-900 hover:text-gray-900 hover:bg-pastel-peach/80 rounded-xl transition-all duration-300 pet-link-glow pet-button-primary enhanced-visibility border-2 border-transparent hover:border-pastel-peach"
                  >
                    <span className="pet-icon-interactive mr-2 text-lg">🐕</span>
                    <span>Productos para Perros</span>
                  </Link>
                  <Link 
                    to="/catalogo?categoria=juguetes"
                    className="whitespace-nowrap px-6 py-3 text-sm font-extra-bold text-gray-900 hover:text-gray-900 hover:bg-pastel-pink/80 rounded-xl transition-all duration-300 pet-link-glow pet-button-primary enhanced-visibility border-2 border-transparent hover:border-pastel-pink"
                  >
                    <span className="pet-icon-interactive mr-2 text-lg">🎾</span>
                    <span>Juguetes</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/catalogo?marca=canbo"
                    className="whitespace-nowrap px-6 py-3 text-sm font-extra-bold text-gray-900 hover:text-gray-900 hover:bg-pastel-cyan/80 rounded-xl transition-all duration-300 pet-link-glow pet-button-primary enhanced-visibility border-2 border-transparent hover:border-pastel-cyan"
                  >
                    <span className="pet-icon-interactive mr-2 text-lg">🏷️</span>
                    <span>Marcas</span>
                  </Link>
                  <Link 
                    to="/catalogo?categoria=perros"
                    className="whitespace-nowrap px-6 py-3 text-sm font-extra-bold text-gray-900 hover:text-gray-900 hover:bg-pastel-peach/80 rounded-xl transition-all duration-300 pet-link-glow pet-button-primary enhanced-visibility border-2 border-transparent hover:border-pastel-peach"
                  >
                    <span className="pet-icon-interactive mr-2 text-lg">🐕</span>
                    <span>Perros</span>
                  </Link>
                  <Link 
                    to="/catalogo?categoria=gatos"
                    className="whitespace-nowrap px-6 py-3 text-sm font-extra-bold text-gray-900 hover:text-gray-900 hover:bg-pastel-blue/80 rounded-xl transition-all duration-300 pet-link-glow pet-button-primary enhanced-visibility border-2 border-transparent hover:border-pastel-blue"
                  >
                    <span className="pet-icon-interactive mr-2 text-lg">🐱</span>
                    <span>Gatos</span>
                  </Link>
                  <Link 
                    to="/catalogo?categoria=otras-mascotas"
                    className="whitespace-nowrap px-6 py-3 text-sm font-extra-bold text-gray-900 hover:text-gray-900 hover:bg-pastel-green/80 rounded-xl transition-all duration-300 pet-link-glow pet-button-primary enhanced-visibility border-2 border-transparent hover:border-pastel-green"
                  >
                    <span className="pet-icon-interactive mr-2 text-lg">🐰</span>
                    <span>Otras Mascotas</span>
                  </Link>
                  <Link 
                    to="/catalogo?categoria=liquidacion"
                    className="whitespace-nowrap px-6 py-3 text-sm font-extra-bold text-gray-900 hover:text-gray-900 hover:bg-pastel-yellow/80 rounded-xl transition-all duration-300 pet-link-glow pet-button-primary enhanced-visibility border-2 border-transparent hover:border-pastel-yellow shimmer"
                  >
                    <span className="pet-icon-interactive mr-2 text-lg">🔥</span>
                    <span>Liquidación</span>
                    <span className="pet-icon-interactive ml-2 text-lg">💥</span>
                  </Link>
                </>
              )}
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
