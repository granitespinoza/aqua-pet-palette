import { Shield, Truck, Clock, HeartHandshake, Phone, Award } from 'lucide-react';
const ServicesSection = () => {
  const services = [{
    icon: Truck,
    title: 'Envío Gratis',
    description: 'Envío gratuito en pedidos superiores a S/ 100.00 a todo el Perú',
    color: 'text-success-500'
  }, {
    icon: Shield,
    title: 'Garantía de Calidad',
    description: 'Todos nuestros productos cuentan con garantía y certificación',
    color: 'text-primary'
  }, {
    icon: Clock,
    title: 'Atención 24/7',
    description: 'Soporte al cliente disponible las 24 horas del día',
    color: 'text-catshop-500'
  }, {
    icon: HeartHandshake,
    title: 'Cuidado Especializado',
    description: 'Asesoría personalizada para el bienestar de tu mascota',
    color: 'text-dogshop-500'
  }, {
    icon: Phone,
    title: 'Consulta Veterinaria',
    description: 'Acceso a consultas veterinarias online con profesionales',
    color: 'text-vetshop-500'
  }, {
    icon: Award,
    title: 'Productos Premium',
    description: 'Selección cuidadosa de las mejores marcas del mercado',
    color: 'text-success-600'
  }];
  return <section id="servicios" className="py-20 bg-gradient-to-br from-white via-neutral-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-20"></div>
      
      <div className="container-professional relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-subtle"></span>
            Nuestros Servicios
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
            Servicios que marcan
            <span className="block text-gradient bg-gradient-to-r from-primary via-catshop-500 to-dogshop-500 bg-clip-text text-transparent">
              la diferencia
            </span>
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos una experiencia integral de cuidado para tu mascota, desde productos premium 
            hasta servicios especializados que garantizan su bienestar.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto stagger-children">
          {services.map((service, index) => <div key={service.title} className="card-professional p-8 text-center group hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 bg-white/80 backdrop-blur-sm animate-fade-up" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-white to-neutral-50 flex items-center justify-center shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110 border border-neutral-100`}>
                <service.icon className={`w-8 h-8 ${service.color}`} />
              </div>
              
              <h3 className="text-xl font-bold text-neutral-900 mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              
              <p className="text-neutral-600 leading-relaxed">
                {service.description}
              </p>
            </div>)}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-catshop-500/10 text-primary border border-primary/20">
            <span className="text-sm font-medium">¿Necesitas más información? Escribenos al correo <3</span>
          </div>
        </div>
      </div>
    </section>;
};
export default ServicesSection;