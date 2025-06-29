
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
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-yellow-400/20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
              🔥 DÍAS PELUDOS
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Hasta <span className="text-primary">50%</span> en alimentos
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
              y <span className="text-secondary">70%</span> en accesorios
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Dale a tu mascota lo mejor con nuestras ofertas especiales. 
              Productos premium a precios increíbles.
            </p>
            <Link to="/catalogo?categoria=perros">
              <Button size="lg" className="bg-primary hover:bg-blue-700 text-white px-8 py-4 text-lg">
                🛍️ Ir a comprar
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Categorías populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    🐕
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nuevo Snack</h3>
                  <p className="text-gray-600">Premios y snacks saludables para perros</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=perros" className="group">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    🦴
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Productos Perros</h3>
                  <p className="text-gray-600">Todo lo que tu perro necesita</p>
                </CardContent>
              </Card>
            </Link>

            <Link to="/catalogo?categoria=gatos" className="group">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    🐱
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Productos Gatos</h3>
                  <p className="text-gray-600">Cuidado especial para felinos</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Marcas populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/catalogo?marca=${brand.slug}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4 text-center">
                    <img
                      src={brand.logo}
                      alt={brand.nombre}
                      className="w-full h-16 object-contain mb-2 group-hover:scale-110 transition-transform"
                    />
                    <p className="text-sm font-medium text-gray-700">{brand.nombre}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Productos recomendados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/catalogo">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                Ver todos los productos
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
