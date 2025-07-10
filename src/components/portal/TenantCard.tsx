import React from 'react';
import { useTenant } from '@/contexts/TenantContext';
interface TenantCardProps {
  tenantName: string;
  tenantId: string;
  description: string;
  backgroundImageUrl: string;
  buttonText: string;
}
const TenantCard: React.FC<TenantCardProps> = ({
  tenantName,
  tenantId,
  description,
  backgroundImageUrl,
  buttonText
}) => {
  const {
    setSelectedTenant
  } = useTenant();
  const handleClick = () => {
    console.log('TenantCard clicked:', tenantId);
    // Para demo, usamos el contexto interno
    setSelectedTenant(tenantId);
    // En un futuro, esta redirección se realizará a subdominios reales de AWS/DNS.
  };
  return <div className="tenant-card professional-card" onClick={handleClick}>
      <img src={backgroundImageUrl} alt={tenantName} className="tenant-card-image" loading="lazy" />
      <div className="tenant-card-overlay">
        <h3 className="tenant-card-title">{tenantName}</h3>
        <p className="tenant-card-description text-base text-emerald-500">{description}</p>
        <button className="btn-primary-professional text-yellow-300">
          {buttonText}
        </button>
      </div>
    </div>;
};
export default TenantCard;