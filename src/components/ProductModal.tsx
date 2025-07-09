
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/hooks/useFilteredProducts';
import brands from '@/data/brands.json';
import categories from '@/data/categories.json';

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (productData: any) => void;
}

const ProductModal = ({ open, onOpenChange, product, onSave }: ProductModalProps) => {
  const [formData, setFormData] = useState({
    nombre: '',
    marcaId: '',
    categoriaId: '',
    precio: '',
    precioOferta: '',
    descuento: '',
    img: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre || '',
        marcaId: product.marcaId?.toString() || '',
        categoriaId: product.categoriaId || '',
        precio: product.precio?.toString() || '',
        precioOferta: product.precioOferta?.toString() || '',
        descuento: product.descuento?.toString() || '',
        img: product.img || ''
      });
    } else {
      setFormData({
        nombre: '',
        marcaId: '',
        categoriaId: '',
        precio: '',
        precioOferta: '',
        descuento: '',
        img: ''
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      precio: parseFloat(formData.precio) || 0,
      precioOferta: formData.precioOferta ? parseFloat(formData.precioOferta) : null,
      descuento: parseInt(formData.descuento) || 0,
      marcaId: parseInt(formData.marcaId) || 1
    };

    onSave(productData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="modal-content max-w-md">
        <div className="modal-overlay" />
        <DialogHeader className="modal-header">
          <DialogTitle className="modal-title">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre" className="text-gray-700 font-medium">Nombre *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                required
                minLength={4}
                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="marca" className="text-gray-700 font-medium">Marca</Label>
              <Select value={formData.marcaId} onValueChange={(value) => setFormData(prev => ({ ...prev, marcaId: value }))}>
                <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Seleccionar marca" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id.toString()}>
                      {brand.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="categoria" className="text-gray-700 font-medium">Categoría</Label>
              <Select value={formData.categoriaId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoriaId: value }))}>
                <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="precio" className="text-gray-700 font-medium">Precio *</Label>
                <Input
                  id="precio"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.precio}
                  onChange={(e) => setFormData(prev => ({ ...prev, precio: e.target.value }))}
                  required
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="precioOferta" className="text-gray-700 font-medium">Precio Oferta</Label>
                <Input
                  id="precioOferta"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.precioOferta}
                  onChange={(e) => setFormData(prev => ({ ...prev, precioOferta: e.target.value }))}
                  className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="img" className="text-gray-700 font-medium">URL Imagen</Label>
              <Input
                id="img"
                value={formData.img}
                onChange={(e) => setFormData(prev => ({ ...prev, img: e.target.value }))}
                placeholder="https://..."
                className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button 
                type="button" 
                onClick={() => onOpenChange(false)}
                className="btn-secondary-professional"
              >
                Cancelar
              </Button>
              <Button 
                type="submit"
                className="btn-primary-professional"
              >
                {product ? 'Actualizar' : 'Crear'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
