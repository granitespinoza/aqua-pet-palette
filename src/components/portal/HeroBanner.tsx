
const HeroBanner = () => {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background with Professional Gradient */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-mesh-gradient"></div>
      
      {/* Professional Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-12 text-white/20 animate-bounce-gentle">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          🌟
        </div>
      </div>
      <div className="absolute top-32 right-20 text-white/20 animate-bounce-gentle" style={{animationDelay: '1s'}}>
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          🎾
        </div>
      </div>
      <div className="absolute bottom-32 left-1/4 text-white/20 animate-bounce-gentle" style={{animationDelay: '2s'}}>
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
          🐕
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-professional h-full min-h-[70vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 page-enter">
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full glass-effect text-sm font-medium text-white/90 backdrop-blur-md border border-white/20">
              <span className="w-2 h-2 bg-success-400 rounded-full mr-3 animate-pulse-subtle"></span>
              Portal Oficial GO Pet
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                El Mejor
                <span className="block text-gradient bg-gradient-to-r from-white via-neutral-100 to-white bg-clip-text text-transparent">
                  Lugar
                </span>
                <span className="block">
                  para tus
                  <span className="inline-block ml-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    mascotas
                  </span>
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-2xl">
                Todo lo que necesitas para tu fiel compañero, en un solo lugar. 
                Descubre nuestras tiendas especializadas.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="btn-primary bg-white text-neutral-900 hover:bg-white/90 px-8 py-4 text-lg font-semibold rounded-xl shadow-large">
                Explorar Tiendas
                <span className="ml-2">→</span>
              </button>
              <button className="btn-secondary bg-white/10 text-white border-white/30 hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm">
                Ver Catálogo
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm text-white/60">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-sm text-white/60">Tiendas Especializadas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/60">Atención</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&h=600&q=80"
                  alt="Mascotas felices"
                  className="w-96 h-96 object-cover rounded-3xl shadow-2xl border-4 border-white/20 backdrop-blur-sm"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-8 -left-8 glass-card w-48 h-32 animate-bounce-gentle">
                <div className="text-center">
                  <div className="text-3xl mb-2">🐾</div>
                  <div className="text-sm font-semibold text-neutral-700">Cuidado Premium</div>
                  <div className="text-xs text-neutral-500">Para todas las mascotas</div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 glass-card w-48 h-32 animate-bounce-gentle" style={{animationDelay: '1s'}}>
                <div className="text-center">
                  <div className="text-3xl mb-2">💖</div>
                  <div className="text-sm font-semibold text-neutral-700">Amor Garantizado</div>
                  <div className="text-xs text-neutral-500">Productos de calidad</div>
                </div>
              </div>
              
              {/* Background Gradient */}
              <div className="absolute inset-0 -m-8 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-white">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroBanner;
