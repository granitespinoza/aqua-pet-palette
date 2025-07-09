
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
  const handleClick = () => {
    console.log('TenantCard clicked:', tenantId);
    // En desarrollo, usamos parámetros de URL
    if (window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1') || window.location.hostname.includes('lovableproject.com')) {
      const newUrl = `${window.location.origin}?tenant=${tenantId}`;
      console.log('Redirecting to:', newUrl);
      window.location.href = newUrl;
    } else {
      // En producción, redirigir al subdominio
      window.location.href = `https://${tenantId}.gopet.com`;
    }
  };

  return (
    <div className="tenant-card professional-card" onClick={handleClick}>
      <img 
        src={backgroundImageUrl} 
        alt={tenantName}
        className="tenant-card-image"
        loading="lazy"
      />
      <div className="tenant-card-overlay">
        <h3 className="tenant-card-title">{tenantName}</h3>
        <p className="tenant-card-description">{description}</p>
        <button className="btn-primary-professional">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TenantCard;
