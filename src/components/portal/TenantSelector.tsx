import TenantCard from './TenantCard';
const TenantSelector = () => {
  const tenants = [{
    tenantName: 'DogShop',
    tenantId: 'dogshop',
    description: 'La tienda especializada para tu perro. Todo lo que necesita tu mejor amigo.',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&h=600&q=80',
    buttonText: 'Explorar DogShop',
    features: ['Alimento Premium', 'Juguetes', 'Accesorios', 'Cuidado']
  }, {
    tenantName: 'CatShop',
    tenantId: 'catshop',
    description: 'El paraíso para los amantes de los gatos. Elegancia y comodidad felina.',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&h=600&q=80',
    buttonText: 'Explorar CatShop',
    features: ['Arena Premium', 'Rascadores', 'Juguetes', 'Nutrición']
  }, {
    tenantName: 'VetShop',
    tenantId: 'vetshop',
    description: 'Cuidado y medicamentos para su bienestar. Salud profesional garantizada.',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&h=600&q=80',
    buttonText: 'Explorar VetShop',
    features: ['Medicamentos', 'Suplementos', 'Cuidado', 'Consultas']
  }];
  return <section className="py-20 bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 py-[5000px]"></div>
      
      <div className="container-professional relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-subtle"></span>
            Tiendas Especializadas
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
            Explora nuestras
            <span className="block text-gradient bg-gradient-to-r from-primary via-catshop-500 to-dogshop-500 bg-clip-text text-transparent">
              tiendas especializadas
            </span>
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Cada una de nuestras tiendas está diseñada específicamente para las necesidades únicas de tu mascota. 
            Encuentra todo lo que buscas en un ambiente especializado.
          </p>
        </div>
        
        {/* Tenant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto stagger-children">
          {tenants.map((tenant, index) => <div key={tenant.tenantId} className="animate-fade-up" style={{
          animationDelay: `${index * 0.2}s`
        }}>
              <TenantCard {...tenant} />
            </div>)}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          
        </div>
      </div>
    </section>;
};
export default TenantSelector;