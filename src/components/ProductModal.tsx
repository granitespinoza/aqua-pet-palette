
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminProduct } from '@/hooks/useAdminProducts';
import brandsData from '@/data/brands.json';
import categoriesData from '@/data/categories.json';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<AdminProduct, 'id' | 'deleted'>) => void;
  product?: AdminProduct | null;
}

const ProductModal = ({ isOpen, onClose, onSave, product }: ProductModalProps) => {
  const [formData, setFormData] = useState({
    nombre: '',
    marcaId: 1,
    categoriaId: 'perros',
    precio: 0,
    precioOferta: null as number | null,
    descuento: 0,
    img: '',
    is_featured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        marcaId: product.marcaId,
        categoriaId: product.categoriaId,
        precio: product.precio,
        precioOferta: product.precioOferta,
        descuento: product.descuento,
        img: product.img,
        is_featured: product.is_featured
      });
    } else {
      setFormData({
        nombre: '',
        marcaId: 1,
        categoriaId: 'perros',
        precio: 0,
        precioOferta: null,
        descuento: 0,
        img: '',
        is_featured: false
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre || formData.nombre.length < 4) {
      newErrors.nombre = 'El nombre debe tener al menos 4 caracteres';
    }

    if (formData.precio <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }

    if (formData.precioOferta && formData.precioOferta > formData.precio) {
      newErrors.precioOferta = 'El precio de oferta no puede ser mayor al precio regular';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const productData = {
      ...formData,
      img: formData.img || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop&crop=center'
    };

    onSave(productData);
    onClose();
  };

  const handlePriceChange = (field: 'precio' | 'precioOferta', value: string) => {
    const numValue = parseFloat(value) || 0;
    
    if (field === 'precio') {
      const newPrecio = numValue;
      const newPrecioOferta = formData.precioOferta;
      const newDescuento = newPrecioOferta && newPrecio > 0 
        ? Math.round(((newPrecio - newPrecioOferta) / newPrecio) * 100)
        : 0;
      
      setFormData(prev => ({
        ...prev,
        precio: newPrecio,
        descuento: newDescuento
      }));
    } else {
      const newPrecioOferta = numValue || null;
      const newDescuento = newPrecioOferta && formData.precio > 0
        ? Math.round(((formData.precio - newPrecioOferta) / formData.precio) * 100)
        : 0;
      
      setFormData(prev => ({
        ...prev,
        precioOferta: newPrecioOferta,
        descuento: newDescuento
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="nombre">Nombre del Producto</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                className={errors.nombre ? 'border-red-500' : ''}
              />
              {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <Label htmlFor="marca">Marca</Label>
              <Select value={formData.marcaId.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, marcaId: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {brandsData.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id.toString()}>
                      {brand.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="categoria">Categoría</Label>
              <Select value={formData.categoriaId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoriaId: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoriesData.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="precio">Precio Regular (S/)</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                min="0"
                value={formData.precio}
                onChange={(e) => handlePriceChange('precio', e.target.value)}
                className={errors.precio ? 'border-red-500' : ''}
              />
              {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio}</p>}
            </div>

            <div>
              <Label htmlFor="precioOferta">Precio Oferta (S/)</Label>
              <Input
                id="precioOferta"
                type="number"
                step="0.01"
                min="0"
                value={formData.precioOferta || ''}
                onChange={(e) => handlePriceChange('precioOferta', e.target.value)}
                className={errors.precioOferta ? 'border-red-500' : ''}
                placeholder="Opcional"
              />
              {errors.precioOferta && <p className="text-red-500 text-sm mt-1">{errors.precioOferta}</p>}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="img">URL de Imagen</Label>
              <Input
                id="img"
                value={formData.img}
                onChange={(e) => setFormData(prev => ({ ...prev, img: e.target.value }))}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            {formData.descuento > 0 && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">
                  Descuento calculado: <span className="font-semibold text-green-600">{formData.descuento}%</span>
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {product ? 'Actualizar' : 'Crear'} Producto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
