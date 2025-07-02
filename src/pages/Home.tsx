
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import productsData from '../data/products.json';
import brandsData from '../data/brands.json';
import { Product, Brand } from '@/hooks/useFilteredProducts';

const Home = () => {
  const featuredProducts = (productsData as Product[]).filter(p => p.is_featured);
  const brands = brandsData as Brand[];

  return (
    <div className="min-h-screen">
      {/* Hero Section con modo oscuro */}
      <section className="relative h-[500px] watercolor-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-lime-glow via-dark/30 to-yellow-glow"></div>
        
        {/* Iconos flotantes */}
        <div className="absolute top-16 left-8 text-4xl floating-paw">🎾</div>
        <div className="absolute top-32 right-16 text-3xl floating-paw" style={{animationDelay: '0.5s'}}>🦴</div>
        <div className="absolute bottom-24 left-1/4 text-3xl floating-paw" style={{animationDelay: '1s'}}>🐕‍🦺</div>
        <div className="absolute top-20 right-1/3 text-2xl floating-paw" style={{animationDelay: '1.5s'}}>🎪</div>
        <div className="absolute bottom-16 right-12 text-3xl floating-paw" style={{animationDelay: '2s'}}>🏆</div>
        
        <div className="absolute top-40 left-16 text-2xl animate-float">🎊</div>
        <div className="absolute bottom-32 right-24 text-2xl animate-float-delayed">⭐</div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
            <div className="max-w-2xl">
              <div className="inline-block bg-gradient-to-r from-lime-bright to-yellow-bright text-black px-8 py-4 rounded-full text-lg font-bold mb-6 animate-pulse pet-glow-lime shadow-lg">
                🚀 MEGA OFERTAS PET 🚀
              </div>
              <div className="flex items-center mb-4">
                <span className="text-lime-bright mr-3 text-3xl animate-bounce pet-icon-interactive">🎯</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  Hasta <span className="text-lime-bright pet-glow-lime">50%</span> en alimentos
                </h1>
              </div>
              <div className="flex items-center mb-6">
                <span className="text-yellow-bright mr-3 text-3xl animate-bounce pet-icon-interactive" style={{animationDelay: '0.2s'}}>💫</span>
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  y <span className="text-yellow-bright pet-glow-yellow">70%</span> en accesorios
                </h2>
              </div>
              <p className="text-lg text-white mb-8 leading-relaxed font-medium">
                🎉 Dale a tu mascota lo mejor con nuestras ofertas especiales. 
                Productos premium a precios increíbles. ¡Tu peludo amigo lo merece! 🌟🐕🐱
              </p>
              <Link to="/catalogo?categoria=perros">
                <Button size="lg" className="pet-button-glow group text-xl px-12 py-6 font-bold shadow-xl">
                  🛒 ¡Comprar Ahora!
                  <span className="ml-2 pet-icon-interactive">✨</span>
                </Button>
              </Link>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-lime-bright via-yellow-bright to-lime-bright rounded-full opacity-20 animate-pulse"></div>
                <img
                  src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Gatito adorable"
                  className="w-80 h-80 object-cover rounded-full shadow-2xl border-8 border-dark-light relative z-10"
                />
                <div className="absolute -top-8 -right-8 bg-gradient-to-r from-yellow-bright to-lime-bright text-black px-8 py-4 rounded-full font-bold text-xl shadow-xl animate-bounce pet-glow-yellow z-20">
                  ¡Miau! 😻💖
                </div>
                <div className="absolute -bottom-4 -left-4 text-3xl animate-float pet-icon-interactive">🎀</div>
                <div className="absolute -top-4 left-8 text-2xl animate-float-delayed pet-icon-interactive">⭐</div>
                <div className="absolute top-12 -right-6 text-2xl animate-float pet-icon-interactive">🌟</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías populares */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <span className="text-lime-bright text-4xl mr-4 animate-bounce pet-icon-interactive">🎪</span>
            <h2 className="text-4xl font-bold text-center text-white pet-glow-lime">
              Categorías populares
            </h2>
            <span className="text-yellow-bright text-4xl ml-4 animate-bounce pet-icon-interactive" style={{animationDelay: '0.3s'}}>🎊</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-lime-bright to-yellow-bright rounded-full flex items-center justify-center text-6xl group-hover:scale-125 transition-transform duration-500 shadow-xl">
                    🍖
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 pet-glow-lime">Nuevo Snack 🎉</h3>
                  <p className="text-white text-lg font-medium">¡Premios irresistibles para consentir a tu perrito! 🐕💖</p>
                  <div className="mt-4 flex justify-center space-x-3">
                    <span className="text-lime-bright text-lg pet-icon-interactive">🏆</span>
                    <span className="text-yellow-bright text-lg pet-icon-interactive">🌟</span>
                    <span className="text-lime-bright text-lg pet-icon-interactive">🎯</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-yellow-bright to-lime-bright rounded-full flex items-center justify-center text-6xl group-hover:scale-125 transition-transform duration-500 shadow-xl">
                    🦴
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 pet-glow-yellow">Productos Perros 🐕</h3>
                  <p className="text-white text-lg font-medium">Todo lo que tu fiel compañero necesita para ser feliz 🎾✨</p>
                  <div className="mt-4 flex justify-center space-x-3">
                    <span className="text-yellow-bright text-lg pet-icon-interactive">🎾</span>
                    <span className="text-lime-bright text-lg pet-icon-interactive">🦴</span>
                    <span className="text-yellow-bright text-lg pet-icon-interactive">🏠</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=gatos" className="group">
              <Card className="pet-card-glow hover:shadow-2xl transition-all duration-500">
                <CardContent className="p-8 text-center">
                  <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-lime-bright to-yellow-bright rounded-full flex items-center justify-center text-6xl group-hover:scale-125 transition-transform duration-500 shadow-xl">
                    🐱
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 pet-glow-lime">Productos Gatos 😺</h3>
                  <p className="text-white text-lg font-medium">Cuidado especial para tus elegantes felinos 🎀✨</p>
                  <div className="mt-4 flex justify-center space-x-3">
                    <span className="text-lime-bright text-lg pet-icon-interactive">🎀</span>
                    <span className="text-yellow-bright text-lg pet-icon-interactive">😺</span>
                    <span className="text-lime-bright text-lg pet-icon-interactive">🐾</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Marcas populares */}
      <section className="py-16 watercolor-section">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <span className="text-lime-bright text-4xl mr-4 animate-bounce pet-icon-interactive">🏢</span>
            <h2 className="text-4xl font-bold text-center text-white pet-glow-yellow">
              Marcas populares
            </h2>
            <span className="text-yellow-bright text-4xl ml-4 animate-bounce pet-icon-interactive" style={{animationDelay: '0.4s'}}>⭐</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/catalogo?marca=${brand.slug}`}
                className="group"
              >
                <Card className="pet-card-glow hover:shadow-lg transition-all duration-500">
                  <CardContent className="p-4 text-center">
                    <img
                      src={brand.logo}
                      alt={brand.nombre}
                      className="w-full h-16 object-contain mb-2 group-hover:scale-125 transition-transform duration-500 filter group-hover:brightness-110"
                    />
                    <p className="text-sm font-semibold text-white">{brand.nombre}</p>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                      <span className="text-lime-bright text-lg pet-icon-interactive">✨</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos recomendados */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <span className="text-lime-bright text-4xl mr-4 animate-bounce pet-icon-interactive">🏆</span>
            <h2 className="text-4xl font-bold text-center text-white pet-glow-lime">
              Productos recomendados ⭐
            </h2>
            <span className="text-yellow-bright text-4xl ml-4 animate-bounce pet-icon-interactive" style={{animationDelay: '0.5s'}}>🎯</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="pet-product-wrapper">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/catalogo">
              <Button variant="outline" size="lg" className="border-3 border-lime-bright text-white hover:bg-lime-bright hover:text-black pet-button-glow px-10 py-6 text-xl font-bold shadow-xl">
                Ver todos los productos 🎯
                <span className="ml-2 pet-icon-interactive">✨</span>
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
