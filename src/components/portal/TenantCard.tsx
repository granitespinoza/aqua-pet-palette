import React from 'react';
import { useTenant } from '@/contexts/TenantContext';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
interface TenantCardProps {
  tenantName: string;
  tenantId: string;
  description: string;
  backgroundImageUrl: string;
  buttonText: string;
  features?: string[];
}
const TenantCard: React.FC<TenantCardProps> = ({
  tenantName,
  tenantId,
  description,
  backgroundImageUrl,
  buttonText,
  features = []
}) => {
  const {
    setSelectedTenant
  } = useTenant();
  const handleClick = () => {
    console.log('TenantCard clicked:', tenantId);
    setSelectedTenant(tenantId);
  };
  const getTenantTheme = () => {
    switch (tenantId) {
      case 'dogshop':
        return {
          gradient: 'from-dogshop-500 to-dogshop-600',
          icon: '🐕',
          color: 'dogshop-500'
        };
      case 'catshop':
        return {
          gradient: 'from-catshop-500 to-catshop-600',
          icon: '🐱',
          color: 'catshop-500'
        };
      case 'vetshop':
        return {
          gradient: 'from-vetshop-500 to-vetshop-600',
          icon: '🏥',
          color: 'vetshop-500'
        };
      default:
        return {
          gradient: 'from-primary to-primary/80',
          icon: '🐾',
          color: 'primary'
        };
    }
  };
  const theme = getTenantTheme();
  return <div className="group cursor-pointer" onClick={handleClick}>
      <div className="card-professional h-[500px] overflow-hidden bg-white hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img src={backgroundImageUrl} alt={tenantName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-80`}></div>
          
          {/* Icon Badge */}
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <span className="text-2xl">{theme.icon}</span>
            </div>
          </div>
          
          {/* Premium Badge */}
          <div className="absolute top-4 right-4">
            <div className="glass-effect px-3 py-1 rounded-full flex items-center space-x-1 text-white text-xs font-medium">
              <Star className="w-3 h-3" />
              <span>Premium</span>
            </div>
          </div>
          
          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {tenantName}
            </h3>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 space-y-4 flex-1 flex flex-col py-0 px-0">
          <p className="text-neutral-600 leading-relaxed flex-1">
            {description}
          </p>
          
          {/* Features */}
          {features.length > 0 && <div className="grid grid-cols-2 gap-2">
              {features.slice(0, 4).map((feature, index) => <div key={index} className="flex items-center space-x-2 text-sm text-neutral-500">
                  <div className={`w-1.5 h-1.5 bg-${theme.color} rounded-full`}></div>
                  <span>{feature}</span>
                </div>)}
            </div>}
          
          {/* Stats */}
          <div className="flex items-center justify-between border-t border-neutral-100 py-0">
            <div className="flex items-center space-x-4 text-sm text-neutral-500">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Garantía</span>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="w-4 h-4" />
                <span>Envío</span>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <button className={`w-full bg-gradient-to-r ${theme.gradient} text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 group`}>
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>;
};
export default TenantCard;