
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import AuthModal from '@/components/AuthModal';
import { useUser } from '@/contexts/UserContext';
import { useTenant } from '@/contexts/TenantContext';

interface AuthButtonProps {
  className?: string;
}

const AuthButton = ({ className }: AuthButtonProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useUser();
  const { tenantId } = useTenant();

  // Get tenant-specific branding for consistent styling
  const getTenantBranding = () => {
    switch (tenantId) {
      case 'dogshop':
        return { textColor: 'text-orange-900' };
      case 'catshop':
        return { textColor: 'text-purple-900' };
      case 'vetshop':
        return { textColor: 'text-blue-900' };
      default:
        return { textColor: 'text-gray-900' };
    }
  };

  const branding = getTenantBranding();

  if (user) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className={`text-sm font-medium ${branding.textColor} bg-white/80 px-3 py-1 rounded-full`}>
          Hola, {user.profile.nombre}
        </span>
      </div>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className={`p-2 glass-effect ${branding.textColor} hover:${branding.textColor} border border-white/30 bg-white/80 hover:bg-white/90 ${className}`}
        onClick={() => setShowAuthModal(true)}
      >
        <User className="h-5 w-5" />
      </Button>
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
      />
    </>
  );
};

export default AuthButton;
