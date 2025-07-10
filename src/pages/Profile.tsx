
import { useUser } from '@/contexts/UserContext';
import { useTenant } from '@/contexts/TenantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useUser();
  const { tenantId } = useTenant();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Restringido</h1>
          <p className="text-gray-600 mb-6">Debes iniciar sesión para ver tu perfil.</p>
          <Link to="/">
            <Button>Ir al Inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getTenantBranding = () => {
    switch (tenantId) {
      case 'dogshop':
        return { bgColor: 'bg-orange-50', accentColor: 'text-orange-600' };
      case 'catshop':
        return { bgColor: 'bg-pink-50', accentColor: 'text-purple-600' };
      case 'vetshop':
        return { bgColor: 'bg-blue-50', accentColor: 'text-blue-600' };
      default:
        return { bgColor: 'bg-gray-50', accentColor: 'text-gray-600' };
    }
  };

  const branding = getTenantBranding();

  return (
    <div className={`min-h-screen ${branding.bgColor}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          </div>

          {/* Profile Card */}
          <Card className="glass-effect bg-white/80 backdrop-blur-md border border-white/30">
            <CardHeader>
              <CardTitle className={`flex items-center gap-3 ${branding.accentColor}`}>
                <User className="h-6 w-6" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nombre</label>
                  <p className="text-lg font-semibold text-gray-900">{user.profile.nombre}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Apellidos</label>
                  <p className="text-lg font-semibold text-gray-900">{user.profile.apellidos}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <p className="text-lg text-gray-900">{user.profile.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                <div>
                  <label className="text-sm font-medium text-gray-700">Dirección</label>
                  <p className="text-lg text-gray-900">{user.profile.direccion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
