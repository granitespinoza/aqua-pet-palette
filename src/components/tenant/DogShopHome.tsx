
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import productsData from '../../data/products.json';
import brandsData from '../../data/brands.json';
import { Product, Brand } from '@/hooks/useFilteredProducts';

const DogShopHome = () => {
  const dogProducts = (productsData as Product[]).filter(p => 
    p.categoriaId === 'perros' && p.is_featured
  );
  const brands = brandsData as Brand[];

  return (
    <div className="min-h-screen page-enter">
      {/* Hero Section para Perros */}
      <section className="relative h-[600px] bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 overflow-hidden">
        {/* Elementos flotantes temáticos para perros */}
        <div className="absolute top-20 left-12 text-4xl floating-sparkle animate-float">🐕</div>
        <div className="absolute top-16 right-16 text-3xl floating-sparkle animate-bounce-gentle" style={{animationDelay: '0.5s'}}>🎾</div>
        <div className="absolute bottom-32 left-1/4 text-3xl floating-sparkle animate-float" style={{animationDelay: '1s'}}>🦴</div>
        <div className="absolute top-24 right-1/3 text-2xl floating-sparkle animate-bounce-gentle" style={{animationDelay: '1.5s'}}>🏠</div>
        <div className="absolute bottom-20 right-20 text-3xl floating-sparkle animate-float" style={{animationDelay: '2s'}}>🐕‍🦺</div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="max-w-3xl">
              <div className="inline-block glass-effect px-8 py-4 rounded-full text-lg font-ultra-bold mb-8 animate-pulse-glow text-orange-800 enhanced-visibility border-4 border-orange-300">
                <span className="pet-icon-interactive mr-3 text-2xl">🐕</span>
                DOGSHOP - ESPECIAL PERROS
                <span className="pet-icon-interactive ml-3 text-2xl">🐕</span>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <span className="text-orange-500 mr-4 text-4xl animate-bounce-gentle pet-icon-interactive">🎯</span>
                  <h1 className="text-5xl md:text-7xl font-ultra-bold text-orange-900">
                    Todo para tu <span className="text-amber-600">Mejor Amigo</span>
                  </h1>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-4 text-4xl animate-float pet-icon-interactive">🏆</span>
                  <h2 className="text-3xl md:text-4xl font-extra-bold text-orange-800 enhanced-visibility">
                    Productos premium para perros felices
                  </h2>
                </div>
              </div>
              
              <p className="text-xl text-orange-700 mb-10 leading-relaxed font-bold enhanced-visibility">
                <span className="pet-icon-interactive mr-2 text-2xl">🎉</span>
                Alimento, juguetes, cuidado y más. Todo lo que tu perro necesita para una vida plena y saludable.
                <span className="pet-icon-interactive ml-2 text-2xl">🐾</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/catalogo?categoria=perros">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white text-2xl px-12 py-8 font-ultra-bold shadow-2xl magic-hover">
                    <span className="pet-icon-interactive mr-3 text-3xl">🛒</span>
                    ¡Comprar Ahora!
                    <span className="ml-3 pet-icon-interactive text-3xl animate-bounce-gentle">🦴</span>
                  </Button>
                </Link>
                <Link to="/catalogo">
                  <Button variant="outline" size="lg" className="glass-effect border-4 border-orange-400 text-orange-800 hover:text-orange-800 font-ultra-bold text-xl px-10 py-8 shadow-xl enhanced-visibility">
                    <span className="pet-icon-interactive mr-3 text-2xl">👀</span>
                    Ver Catálogo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative magic-hover">
                <div className="absolute -inset-8 bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-300 rounded-full opacity-30 animate-pulse-glow blur-xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&h=500&q=80"
                  alt="Perro adorable"
                  className="w-96 h-96 object-cover rounded-full shadow-2xl border-8 border-white relative z-10 animate-float"
                />
                <div className="absolute -top-12 -right-12 glass-effect text-orange-800 px-8 py-6 rounded-2xl font-ultra-bold text-2xl shadow-2xl animate-bounce-gentle z-20 border-4 border-orange-300">
                  <span className="pet-icon-interactive mr-2 text-3xl">🐕</span>
                  ¡Guau!
                  <span className="pet-icon-interactive ml-2 text-3xl">💖</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías para Perros */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-16">
            <span className="text-orange-500 text-5xl mr-6 animate-bounce-gentle pet-icon-interactive">🐕</span>
            <h2 className="text-5xl md:text-6xl font-ultra-bold text-center text-orange-900">
              Categorías para Perros
            </h2>
            <span className="text-amber-500 text-5xl ml-6 animate-float pet-icon-interactive">🦴</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500 magic-hover border-4 border-orange-200">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-5xl group-hover:scale-125 transition-transform duration-500 shadow-xl">
                    🍖
                  </div>
                  <h3 className="text-2xl font-ultra-bold text-orange-800 mb-3">Alimento</h3>
                  <p className="text-orange-600 font-semibold">Nutrición premium para cada etapa</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500 magic-hover border-4 border-orange-200">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-5xl group-hover:scale-125 transition-transform duration-500 shadow-xl">
                    🎾
                  </div>
                  <h3 className="text-2xl font-ultra-bold text-orange-800 mb-3">Juguetes</h3>
                  <p className="text-orange-600 font-semibold">Diversión y entretenimiento</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500 magic-hover border-4 border-orange-200">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full flex items-center justify-center text-5xl group-hover:scale-125 transition-transform duration-500 shadow-xl">
                    🧴
                  </div>
                  <h3 className="text-2xl font-ultra-bold text-orange-800 mb-3">Cuidado</h3>
                  <p className="text-orange-600 font-semibold">Higiene y salud</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500 magic-hover border-4 border-orange-200">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-400 rounded-full flex items-center justify-center text-5xl group-hover:scale-125 transition-transform duration-500 shadow-xl">
                    🦮
                  </div>
                  <h3 className="text-2xl font-ultra-bold text-orange-800 mb-3">Accesorios</h3>
                  <p className="text-orange-600 font-semibold">Collares, correas y más</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-16">
            <span className="text-orange-500 text-5xl mr-6 animate-bounce-gentle pet-icon-interactive">🏆</span>
            <h2 className="text-5xl md:text-6xl font-ultra-bold text-center text-orange-900">
              Productos Destacados
            </h2>
            <span className="text-amber-500 text-5xl ml-6 animate-float pet-icon-interactive">⭐</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dogProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/catalogo">
              <Button variant="outline" size="lg" className="glass-effect border-4 border-orange-400 text-orange-800 hover:text-orange-800 font-ultra-bold px-12 py-8 text-2xl shadow-2xl magic-hover enhanced-visibility">
                <span className="pet-icon-interactive mr-4 text-3xl">🎯</span>
                Ver Todos los Productos
                <span className="ml-4 pet-icon-interactive text-3xl animate-bounce-gentle">🦴</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
};

export default DogShopHome;
