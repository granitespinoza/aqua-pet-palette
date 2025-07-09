
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
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, logout } = useUser();
  const { tenant, setSelectedTenant } = useTenant();

  const getTenantIcon = () => {
    switch (tenant?.id) {
      case 'catshop':
        return '🐱';
      case 'dogshop':
        return '🐕';
      case 'vetshop':
        return '🏥';
      default:
        return '🐾';
    }
  };

  const getTenantName = () => {
    switch (tenant?.id) {
      case 'catshop':
        return 'Cat Shop';
      case 'dogshop':
        return 'Dog Shop';
      case 'vetshop':
        return 'Vet Shop';
      default:
        return 'GO Pet';
    }
  };

  const handleBackToPortal = () => {
    setSelectedTenant(null);
  };

  return (
    <header className="header-professional sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y Tenant Indicator */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
              <span className="text-3xl">{getTenantIcon()}</span>
              <span className="text-high-contrast">GO Pet</span>
            </Link>
            
            {/* Tenant Indicator y Botón de Portal */}
            <div className="tenant-indicator flex items-center space-x-2">
              <span className="text-lg">{getTenantIcon()}</span>
              <span className="text-sm font-semibold">{getTenantName()}</span>
              {tenant && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToPortal}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Volver al Portal
                </Button>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="link-professional text-high-contrast hover:text-blue-600"
            >
              Inicio
            </Link>
            <Link 
              to="/catalogo" 
              className="link-professional text-high-contrast hover:text-blue-600"
            >
              Catálogo
            </Link>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-professional">
                    Hola, {user.profile.nombre}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="text-gray-600 hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAuthModalOpen(true)}
                  className="icon-interactive"
                >
                  <User className="w-4 h-4 mr-2" />
                  <span>Ingresar</span>
                </Button>
              )}
              
              <CartDrawer />
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <CartDrawer />
            <Button variant="ghost" size="sm" className="icon-interactive">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
      />
    </header>
  );
};

export default Header;
