import { useTenant } from '@/contexts/TenantContext';
import DogShopHome from '@/components/tenant/DogShopHome';
import CatShopHome from '@/components/tenant/CatShopHome';
import VetShopHome from '@/components/tenant/VetShopHome';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import productsData from '../data/products.json';
import brandsData from '../data/brands.json';
import { Product, Brand } from '@/hooks/useFilteredProducts';

const Home = () => {
  const { tenantId } = useTenant();

  // Render tenant-specific home page
  switch (tenantId) {
    case 'dogshop':
      return <DogShopHome />;
    case 'catshop':
      return <CatShopHome />;
    case 'vetshop':
      return <VetShopHome />;
    default:
      // Default home page (original content) - this shouldn't happen in normal flow
      // but keeping as fallback
      break;
  }

  const featuredProducts = (productsData as Product[]).filter(p => p.is_featured);
  const brands = brandsData as Brand[];

  return (
    <div className="min-h-screen page-enter">
      {/* Hero Section Espectacular */}
      <section className="relative h-[600px] watercolor-hero overflow-hidden">
        {/* Elementos flotantes mágicos */}
        <div className="absolute top-20 left-12 text-4xl floating-sparkle animate-float">🌟</div>
        <div className="absolute top-16 right-16 text-3xl floating-sparkle animate-bounce-gentle" style={{animationDelay: '0.5s'}}>🎾</div>
        <div className="absolute bottom-32 left-1/4 text-3xl floating-sparkle animate-float" style={{animationDelay: '1s'}}>🐕‍🦺</div>
        <div className="absolute top-24 right-1/3 text-2xl floating-sparkle animate-bounce-gentle" style={{animationDelay: '1.5s'}}>🎪</div>
        <div className="absolute bottom-20 right-20 text-3xl floating-sparkle animate-float" style={{animationDelay: '2s'}}>🏆</div>
        <div className="absolute top-40 left-20 text-2xl floating-sparkle animate-pulse-glow" style={{animationDelay: '2.5s'}}>🎊</div>
        <div className="absolute bottom-40 right-1/4 text-2xl floating-sparkle animate-bounce-gentle" style={{animationDelay: '3s'}}>⭐</div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="max-w-3xl">
              <div className="inline-block glass-effect px-8 py-4 rounded-full text-lg font-ultra-bold mb-8 animate-pulse-glow text-black enhanced-visibility border-4 border-pastel-cyan/50">
                <span className="pet-icon-interactive mr-3 text-2xl">🚀</span>
                MEGA OFERTAS PET
                <span className="pet-icon-interactive ml-3 text-2xl">🚀</span>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <span className="text-pastel-pink mr-4 text-4xl animate-bounce-gentle pet-icon-interactive">🎯</span>
                  <h1 className="text-5xl md:text-7xl font-ultra-bold gradient-text">
                    Hasta <span className="pet-glow-pink text-black">50%</span> OFF
                  </h1>
                </div>
                <div className="flex items-center">
                  <span className="text-pastel-yellow mr-4 text-4xl animate-float pet-icon-interactive">💫</span>
                  <h2 className="text-3xl md:text-4xl font-extra-bold text-black enhanced-visibility">
                    En productos premium para mascotas
                  </h2>
                </div>
              </div>
              
              <p className="text-xl text-black mb-10 leading-relaxed font-bold enhanced-visibility">
                <span className="pet-icon-interactive mr-2 text-2xl">🎉</span>
                Dale a tu mascota lo mejor con nuestras ofertas espectaculares. 
                Productos de calidad premium a precios increíbles.
                <span className="pet-icon-interactive ml-2 text-2xl">🌟</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/catalogo?categoria=perros">
                  <Button size="lg" className="pet-button-primary text-2xl px-12 py-8 font-ultra-bold shadow-2xl magic-hover">
                    <span className="pet-icon-interactive mr-3 text-3xl">🛒</span>
                    ¡Comprar Ahora!
                    <span className="ml-3 pet-icon-interactive text-3xl animate-bounce-gentle">✨</span>
                  </Button>
                </Link>
                <Link to="/catalogo">
                  <Button variant="outline" size="lg" className="glass-effect border-4 border-pastel-blue text-black hover:text-black font-ultra-bold text-xl px-10 py-8 shadow-xl enhanced-visibility">
                    <span className="pet-icon-interactive mr-3 text-2xl">👀</span>
                    Ver Catálogo
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative magic-hover">
                <div className="absolute -inset-8 bg-gradient-to-r from-pastel-cyan via-pastel-peach to-pastel-pink rounded-full opacity-30 animate-pulse-glow blur-xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=500&h=500&q=80"
                  alt="Mascota adorable"
                  className="w-96 h-96 object-cover rounded-full shadow-2xl border-8 border-white relative z-10 animate-float"
                />
                <div className="absolute -top-12 -right-12 glass-effect text-black px-8 py-6 rounded-2xl font-ultra-bold text-2xl shadow-2xl animate-bounce-gentle pet-glow-yellow z-20 border-4 border-pastel-yellow/50">
                  <span className="pet-icon-interactive mr-2 text-3xl">😻</span>
                  ¡Miau!
                  <span className="pet-icon-interactive ml-2 text-3xl">💖</span>
                </div>
                <div className="absolute -bottom-8 -left-8 text-4xl animate-float pet-icon-interactive">🎀</div>
                <div className="absolute -top-8 left-12 text-3xl animate-bounce-gentle pet-icon-interactive">⭐</div>
                <div className="absolute top-16 -right-8 text-3xl animate-float pet-icon-interactive">🌟</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías populares con diseño espectacular */}
      <section className="py-20 watercolor-section">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-16">
            <span className="text-pastel-cyan text-5xl mr-6 animate-bounce-gentle pet-icon-interactive">🎪</span>
            <h2 className="text-5xl md:text-6xl font-ultra-bold text-center gradient-text">
              Categorías Populares
            </h2>
            <span className="text-pastel-peach text-5xl ml-6 animate-float pet-icon-interactive">🎊</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500 magic-hover border-4 border-pastel-peach/40">
                <CardContent className="p-10 text-center">
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pastel-peach to-pastel-pink rounded-full flex items-center justify-center text-7xl group-hover:scale-125 transition-transform duration-500 shadow-2xl animate-pulse-glow">
                    🍖
                  </div>
                  <h3 className="text-3xl font-ultra-bold text-black mb-4 pet-glow-peach enhanced-visibility">
                    <span className="pet-icon-interactive mr-3">🎉</span>
                    Nuevo Snack
                  </h3>
                  <p className="text-black text-lg font-bold enhanced-visibility leading-relaxed">
                    ¡Premios irresistibles para consentir a tu perrito!
                    <span className="pet-icon-interactive ml-2 text-xl">🐕💖</span>
                  </p>
                  <div className="mt-6 flex justify-center space-x-4">
                    <span className="text-pastel-pink text-2xl pet-icon-interactive animate-bounce-gentle">🏆</span>
                    <span className="text-pastel-yellow text-2xl pet-icon-interactive animate-float">🌟</span>
                    <span className="text-pastel-cyan text-2xl pet-icon-interactive animate-pulse-glow">🎯</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500 magic-hover border-4 border-pastel-cyan/40">
                <CardContent className="p-10 text-center">
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pastel-cyan to-pastel-blue rounded-full flex items-center justify-center text-7xl group-hover:scale-125 transition-transform duration-500 shadow-2xl animate-pulse-glow">
                    🦴
                  </div>
                  <h3 className="text-3xl font-ultra-bold text-black mb-4 pet-glow-cyan enhanced-visibility">
                    <span className="pet-icon-interactive mr-3">🐕</span>
                    Productos Perros
                  </h3>
                  <p className="text-black text-lg font-bold enhanced-visibility leading-relaxed">
                    Todo lo que tu fiel compañero necesita para ser feliz
                    <span className="pet-icon-interactive ml-2 text-xl">🎾✨</span>
                  </p>
                  <div className="mt-6 flex justify-center space-x-4">
                    <span className="text-pastel-yellow text-2xl pet-icon-interactive animate-float">🎾</span>
                    <span className="text-pastel-peach text-2xl pet-icon-interactive animate-bounce-gentle">🦴</span>
                    <span className="text-pastel-green text-2xl pet-icon-interactive animate-pulse-glow">🏠</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=gatos" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500 magic-hover border-4 border-pastel-green/40">
                <CardContent className="p-10 text-center">
                  <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-pastel-green to-pastel-yellow rounded-full flex items-center justify-center text-7xl group-hover:scale-125 transition-transform duration-500 shadow-2xl animate-pulse-glow">
                    🐱
                  </div>
                  <h3 className="text-3xl font-ultra-bold text-black mb-4 pet-glow-green enhanced-visibility">
                    <span className="pet-icon-interactive mr-3">😺</span>
                    Productos Gatos
                  </h3>
                  <p className="text-black text-lg font-bold enhanced-visibility leading-relaxed">
                    Cuidado especial para tus elegantes felinos
                    <span className="pet-icon-interactive ml-2 text-xl">🎀✨</span>
                  </p>
                  <div className="mt-6 flex justify-center space-x-4">
                    <span className="text-pastel-pink text-2xl pet-icon-interactive animate-bounce-gentle">🎀</span>
                    <span className="text-pastel-yellow text-2xl pet-icon-interactive animate-float">😺</span>
                    <span className="text-pastel-cyan text-2xl pet-icon-interactive animate-pulse-glow">🐾</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Marcas populares con efectos visuales */}
      <section className="py-20 bg-gradient-to-br from-pastel-cyan/20 via-pastel-peach/20 to-pastel-pink/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-16">
            <span className="text-pastel-blue text-5xl mr-6 animate-bounce-gentle pet-icon-interactive">🏢</span>
            <h2 className="text-5xl md:text-6xl font-ultra-bold text-center gradient-text">
              Marcas Premium
            </h2>
            <span className="text-pastel-yellow text-5xl ml-6 animate-float pet-icon-interactive">⭐</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {brands.map((brand, index) => (
              <Link
                key={brand.id}
                to={`/catalogo?marca=${brand.slug}`}
                className="group"
              >
                <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500 magic-hover border-2 border-pastel-blue/30">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 transform group-hover:scale-125 transition-transform duration-500">
                      <img
                        src={brand.logo}
                        alt={brand.nombre}
                        className="w-full h-16 object-contain filter group-hover:brightness-110"
                      />
                    </div>
                    <p className="text-sm font-ultra-bold text-black enhanced-visibility">{brand.nombre}</p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                      <span className="text-pastel-peach text-xl pet-icon-interactive animate-bounce-gentle">✨</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos recomendados con diseño espectacular */}
      <section className="py-20 watercolor-section">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-16">
            <span className="text-pastel-pink text-5xl mr-6 animate-bounce-gentle pet-icon-interactive">🏆</span>
            <h2 className="text-5xl md:text-6xl font-ultra-bold text-center gradient-text">
              Productos Destacados
            </h2>
            <span className="text-pastel-green text-5xl ml-6 animate-float pet-icon-interactive">🎯</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/catalogo">
              <Button variant="outline" size="lg" className="glass-effect border-4 border-pastel-cyan text-black hover:text-black font-ultra-bold px-12 py-8 text-2xl shadow-2xl magic-hover enhanced-visibility">
                <span className="pet-icon-interactive mr-4 text-3xl">🎯</span>
                Ver Todos los Productos
                <span className="ml-4 pet-icon-interactive text-3xl animate-bounce-gentle">✨</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
