
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nextRoute?: string;
  message?: string;
}

const AuthModal = ({ open, onOpenChange, nextRoute, message }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    direccion: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await login(loginData.email, loginData.password);
      
      if (result.success) {
        toast.success('¡Bienvenido de vuelta!');
        onOpenChange(false);
        
        if (nextRoute) {
          window.location.href = nextRoute;
        }
      } else {
        if (result.error === 'no-user') {
          toast.error('Este correo no está registrado. ¿Quieres crear tu cuenta?');
          setRegisterData(prev => ({ ...prev, email: loginData.email }));
          setActiveTab('register');
        } else if (result.error === 'bad-pass') {
          toast.error('Contraseña incorrecta');
        } else {
          toast.error('Error al iniciar sesión');
        }
      }
    } catch (error) {
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password.length < 5) {
      toast.error('La contraseña debe tener al menos 5 caracteres');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await register(registerData);
      
      if (result.success) {
        toast.success(`¡Bienvenido, ${registerData.nombre}!`);
        onOpenChange(false);
        
        if (nextRoute) {
          window.location.href = nextRoute;
        }
      } else {
        if (result.error === 'email-exists') {
          toast.error('Este correo ya está registrado');
        } else {
          toast.error('Error al crear la cuenta');
        }
      }
    } catch (error) {
      toast.error('Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegisterInputChange = (field: string, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="modal-content sm:max-w-md">
        <div className="modal-overlay" />
        <DialogHeader className="modal-header text-center">
          <DialogTitle className="modal-title">
            Acceso a GO Pet
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {message || 'Inicia sesión o crea tu cuenta para continuar'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="modal-body">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg">
              <TabsTrigger value="login" className="text-gray-700 font-medium">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="text-gray-700 font-medium">
                Registrarse
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email" className="text-gray-700 font-medium">
                    Correo electrónico *
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => handleLoginInputChange('email', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="login-password" className="text-gray-700 font-medium">
                    Contraseña *
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary-professional mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="register-nombre" className="text-gray-700 font-medium">
                      Nombre *
                    </Label>
                    <Input
                      id="register-nombre"
                      required
                      value={registerData.nombre}
                      onChange={(e) => handleRegisterInputChange('nombre', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-apellidos" className="text-gray-700 font-medium">
                      Apellidos *
                    </Label>
                    <Input
                      id="register-apellidos"
                      required
                      value={registerData.apellidos}
                      onChange={(e) => handleRegisterInputChange('apellidos', e.target.value)}
                      className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="register-email" className="text-gray-700 font-medium">
                    Correo electrónico *
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="register-direccion" className="text-gray-700 font-medium">
                    Dirección *
                  </Label>
                  <Input
                    id="register-direccion"
                    required
                    value={registerData.direccion}
                    onChange={(e) => handleRegisterInputChange('direccion', e.target.value)}
                    placeholder="Ej: Av. Arequipa 123, San Isidro, Lima"
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="register-password" className="text-gray-700 font-medium">
                    Contraseña *
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    required
                    minLength={5}
                    value={registerData.password}
                    onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                    placeholder="Mínimo 5 caracteres"
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary-professional mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
