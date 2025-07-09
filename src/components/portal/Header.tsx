
import { Heart, UserCircle, ShoppingCart, Truck, Phone, Mail } from 'lucide-react';

const Header = () => {
  return (
    <header className="header-professional">
      {/* Pre-Header */}
      <div className="pre-header">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Envío gratis desde S/ 100.00</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+51 930224945</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>Proyecto_Grupo_06@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🐾</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">GO Pet</span>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <Heart className="w-6 h-6 icon-interactive cursor-pointer" />
            <UserCircle className="w-6 h-6 icon-interactive cursor-pointer" />
            <ShoppingCart className="w-6 h-6 icon-interactive cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
