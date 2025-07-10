import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowLeft, User, Package, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AuthButton from '@/components/AuthButton';
import CartDrawer from '@/components/CartDrawer';
import SearchBar from '@/components/SearchBar';
import { useTenant } from '@/contexts/TenantContext';
import { useUser } from '@/contexts/UserContext';

const Header = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { tenant, tenantId, setSelectedTenant } = useTenant();
  const { logout } = useUser();

  // Get tenant-specific branding
  const getTenantBranding = () => {
    switch (tenantId) {
      case 'dogshop':
        return {
          name: 'DogShop',
          emoji: '🐕',
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-900',
          tagline: 'Todo para tu mejor amigo'
        };
      case 'catshop':
        return {
          name: 'CatShop', 
          emoji: '🐱',
          bgColor: 'bg-pink-100',
          textColor: 'text-purple-900',
          tagline: 'Elegancia felina'
        };
      case 'vetshop':
        return {
          name: 'VetShop',
          emoji: '🏥',
          bgColor: 'bg-blue-100', 
          textColor: 'text-blue-900',
          tagline: 'Cuidado profesional'
        };
      default:
        return {
          name: 'GO Pet',
          emoji: '🐾',
          bgColor: 'bg-gradient-to-r from-cyan-50 to-orange-50',
          textColor: 'text-gray-900',
          tagline: 'El universo para tu mascota'
        };
    }
  };

  const branding = getTenantBranding();

  const handleBackToPortal = () => {
    console.log('Going back to portal...');
    setSelectedTenant(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={`sticky top-0 z-50 glass-effect border-b border-white/20 ${branding.bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y Nombre */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="text-3xl group-hover:scale-125 transition-transform duration-300 animate-bounce-gentle">
                {branding.emoji}
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-ultra-bold ${branding.textColor} enhanced-visibility pet-glow-blue`}>
                {branding.name}
              </span>
              <span className={`text-xs ${branding.textColor} opacity-75 font-semibold`}>
                {branding.tagline}
              </span>
            </div>
          </Link>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Navegación y acciones */}
          <div className="flex items-center space-x-4">
            {/* Búsqueda móvil */}
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden p-2 glass-effect ${branding.textColor} hover:${branding.textColor} border border-white/30`}
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Botón Volver al Portal (solo si estamos en un tenant) */}
            {tenantId && (
              <Button
                variant="outline"
                size="sm"
                className={`hidden sm:flex glass-effect ${branding.textColor} hover:${branding.textColor} border-2 border-white/50 px-3 py-2 font-bold bg-white/80 hover:bg-white/90`}
                onClick={handleBackToPortal}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Portal
              </Button>
            )}

            {/* Autenticación */}
            <AuthButton />

            {/* Carrito */}
            <CartDrawer />

            {/* Menú usuario */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 glass-effect ${branding.textColor} hover:${branding.textColor} border border-white/30 bg-white/80 hover:bg-white/90`}
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 glass-effect border border-white/30 bg-white/95 backdrop-blur-md">
                <DropdownMenuItem asChild>
                  <Link to="/perfil" className="flex items-center text-gray-900">
                    <User className="mr-2 h-4 w-4" />
                    Mi Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/pedidos" className="flex items-center text-gray-900">
                    <Package className="mr-2 h-4 w-4" />
                    Mis Pedidos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem onClick={handleLogout} className="text-gray-900 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Búsqueda móvil expandida */}
        {showMobileSearch && (
          <div className="md:hidden pb-4 animate-fade-in">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
