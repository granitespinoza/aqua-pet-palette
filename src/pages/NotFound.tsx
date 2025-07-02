
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center px-4 watercolor-section page-enter">
      <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg pet-card-glow pet-card-blue">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4 pet-icon-interactive animate-bounce">🐾</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 pet-glow-blue">404</h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 pet-glow-orange">
            <span className="pet-icon-interactive mr-2">😵</span>
            ¡Ups! Página no encontrada
            <span className="pet-icon-interactive ml-2">🔍</span>
          </h2>
          <p className="text-gray-600 mb-8">
            <span className="pet-icon-interactive mr-1">🐕</span>
            Parece que esta página se fue a pasear como un perrito travieso. 
            <span className="pet-icon-interactive mx-1">🏃‍♂️</span>
            ¡Volvamos a casa!
            <span className="pet-icon-interactive ml-1">🏠</span>
          </p>
          <Link to="/">
            <Button className="bg-primary hover:bg-blue-700 text-white pet-button-glow pet-button-interactive pet-button-particles">
              <span className="pet-icon-interactive mr-2">🏠</span>
              Volver al inicio
              <span className="pet-icon-interactive ml-2">✨</span>
            </Button>
          </Link>
          
          {/* Decorative elements */}
          <div className="mt-8 flex justify-center space-x-4">
            <span className="text-2xl pet-icon-interactive pet-glow-pink animate-float">🐱</span>
            <span className="text-2xl pet-icon-interactive pet-glow-yellow animate-float-delayed">🐕</span>
            <span className="text-2xl pet-icon-interactive pet-glow-green animate-float">🐰</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
