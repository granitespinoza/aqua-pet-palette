
import TenantCard from './TenantCard';

const TenantSelector = () => {
  const tenants = [
    {
      tenantName: 'DogShop',
      tenantId: 'dogshop',
      description: 'La tienda especializada para tu perro',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&h=600&q=80',
      buttonText: 'Visitar DogShop'
    },
    {
      tenantName: 'CatShop',
      tenantId: 'catshop',
      description: 'El paraíso para los amantes de los gatos',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&h=600&q=80',
      buttonText: 'Visitar CatShop'
    },
    {
      tenantName: 'VetShop',
      tenantId: 'vetshop',
      description: 'Cuidado y medicamentos para su bienestar',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&h=600&q=80',
      buttonText: 'Visitar VetShop'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explora nuestras tiendas especializadas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada una de nuestras tiendas está diseñada específicamente para las necesidades únicas de tu mascota
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tenants.map((tenant) => (
            <TenantCard key={tenant.tenantId} {...tenant} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TenantSelector;
