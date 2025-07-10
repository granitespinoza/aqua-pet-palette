import { useUser } from '@/contexts/UserContext';
import { useTenant } from '@/contexts/TenantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, MapPin, ArrowLeft, Edit, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Profile = () => {
  const {
    user
  } = useUser();
  const {
    tenantId
  } = useTenant();
  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-catshop-500 rounded-3xl flex items-center justify-center mx-auto shadow-large">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-neutral-900">Acceso Restringido</h1>
            <p className="text-neutral-600 max-w-md mx-auto">
              Debes iniciar sesión para ver tu perfil y gestionar tu cuenta.
            </p>
          </div>
          <Link to="/">
            <Button className="btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ir al Inicio
            </Button>
          </Link>
        </div>
      </div>;
  }
  const getTenantBranding = () => {
    switch (tenantId) {
      case 'dogshop':
        return {
          bgClass: 'bg-gradient-to-br from-dogshop-50 to-dogshop-100',
          accentColor: 'text-dogshop-600',
          gradientClass: 'from-dogshop-500 to-dogshop-600'
        };
      case 'catshop':
        return {
          bgClass: 'bg-gradient-to-br from-catshop-50 to-catshop-100',
          accentColor: 'text-catshop-600',
          gradientClass: 'from-catshop-500 to-catshop-600'
        };
      case 'vetshop':
        return {
          bgClass: 'bg-gradient-to-br from-vetshop-50 to-vetshop-100',
          accentColor: 'text-vetshop-600',
          gradientClass: 'from-vetshop-500 to-vetshop-600'
        };
      default:
        return {
          bgClass: 'bg-gradient-to-br from-neutral-50 to-white',
          accentColor: 'text-primary',
          gradientClass: 'from-primary to-primary/80'
        };
    }
  };
  const branding = getTenantBranding();
  return <div className={`min-h-screen ${branding.bgClass} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
      
      <div className="container-professional py-12 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="glass-effect border border-white/20">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div>
                <h1 className="text-4xl font-bold text-neutral-900">Mi Perfil</h1>
                <p className="text-neutral-600">Gestiona tu información personal</p>
              </div>
            </div>
            
            
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary Card */}
            <div className="lg:col-span-1">
              <Card className="card-professional border-0 shadow-medium bg-white/80 backdrop-blur-md">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="relative">
                    <div className={`w-24 h-24 bg-gradient-to-br ${branding.gradientClass} rounded-3xl flex items-center justify-center mx-auto shadow-large`}>
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success-500 rounded-full border-4 border-white flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-neutral-900">
                      {user.profile.nombre} {user.profile.apellidos}
                    </h3>
                    <p className="text-neutral-600">Cliente Rimac</p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 py-4 border-t border-neutral-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900">12</div>
                      <div className="text-xs text-neutral-500">Pedidos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900">4.9</div>
                      <div className="text-xs text-neutral-500">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral-900">2</div>
                      <div className="text-xs text-neutral-500">Años</div>
                    </div>
                  </div>
                  
                  <div className="glass-effect rounded-xl p-4 border border-white/20">
                    <div className="flex items-center space-x-3">
                      <Award className={`w-6 h-6 ${branding.accentColor}`} />
                      <div className="text-left">
                        <div className="font-semibold text-neutral-900">Cliente VIP</div>
                        <div className="text-sm text-neutral-600">Beneficios exclusivos</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="card-professional border-0 shadow-medium bg-white/80 backdrop-blur-md">
                <CardHeader className="border-b border-neutral-100">
                  <CardTitle className={`flex items-center gap-3 ${branding.accentColor}`}>
                    <User className="h-6 w-6" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Nombre</label>
                      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                        <p className="text-lg font-semibold text-neutral-900">{user.profile.nombre}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">Apellidos</label>
                      <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                        <p className="text-lg font-semibold text-neutral-900">{user.profile.apellidos}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Email</label>
                    <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                      <Mail className="h-5 w-5 text-neutral-500" />
                      <p className="text-lg text-neutral-900">{user.profile.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Dirección</label>
                    <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                      <MapPin className="h-5 w-5 text-neutral-500" />
                      <p className="text-lg text-neutral-900">{user.profile.direccion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="card-professional border-0 shadow-medium bg-white/80 backdrop-blur-md">
                <CardHeader className="border-b border-neutral-100">
                  <CardTitle className={`flex items-center gap-3 ${branding.accentColor}`}>
                    <Shield className="h-6 w-6" />
                    Configuración de Cuenta
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <div>
                      <div className="font-semibold text-neutral-900">Notificaciones por Email</div>
                      <div className="text-sm text-neutral-600">Recibe actualizaciones de pedidos</div>
                    </div>
                    <div className="w-12 h-6 bg-success-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                    <div>
                      <div className="font-semibold text-neutral-900">Ofertas y Promociones</div>
                      <div className="text-sm text-neutral-600">Recibe ofertas especiales</div>
                    </div>
                    <div className="w-12 h-6 bg-success-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;