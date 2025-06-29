
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-yellow-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm border border-blue-100 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                🐾 ¡No te pierdas nuestras ofertas!
              </h3>
              <p className="text-gray-600">
                Suscríbete y recibe descuentos exclusivos, tips de cuidado y las mejores ofertas para tus mascotas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="tu-email@ejemplo.com"
                className="flex-1 bg-white border-gray-200 focus:border-primary"
              />
              <Button className="bg-primary hover:bg-blue-700 text-white px-6">
                Suscribirse
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              No spam, solo amor perruno y gatuno 💕
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
