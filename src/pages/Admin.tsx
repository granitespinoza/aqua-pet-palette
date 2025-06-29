
import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { useAdminProducts } from '@/hooks/useAdminProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import ProductModal from '@/components/ProductModal';
import { AdminProduct } from '@/hooks/useAdminProducts';
import brandsData from '@/data/brands.json';
import categoriesData from '@/data/categories.json';

const Admin = () => {
  const { isOwner } = useUser();
  const {
    products,
    totalProducts,
    currentPage,
    totalPages,
    searchCode,
    setCurrentPage,
    setSearchCode,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct
  } = useAdminProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  if (!isOwner()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-red-200">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Acceso Restringido
            </h3>
            <p className="text-gray-600">
              Solo los administradores pueden acceder a esta sección.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(price);
  };

  const getBrandName = (brandId: number) => {
    const brand = brandsData.find(b => b.id === brandId);
    return brand?.nombre || 'Desconocida';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categoriesData.find(c => c.id === categoryId);
    return category?.nombre || 'Desconocida';
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleSave = (productData: Omit<AdminProduct, 'id' | 'deleted'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      createProduct(productData);
    }
  };

  const handleDelete = (product: AdminProduct) => {
    if (product.deleted) {
      restoreProduct(product.id);
    } else {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Gestiona el catálogo de productos
          </p>
        </div>

        {/* Controls */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border border-blue-100">
          <CardHeader>
            <CardTitle className="text-lg">Controles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por código (ID)..."
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="w-64"
                />
              </div>
              <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="bg-white/80 backdrop-blur-sm border border-blue-100">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead className="hidden md:table-cell">Marca</TableHead>
                    <TableHead className="hidden sm:table-cell">Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <TableRow 
                        key={product.id} 
                        className={product.deleted ? 'opacity-50 bg-gray-50' : ''}
                      >
                        <TableCell className="font-mono text-sm">
                          {product.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={product.img} 
                              alt={product.nombre}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium line-clamp-2 max-w-xs">
                                {product.nombre}
                              </p>
                              {product.descuento > 0 && (
                                <Badge variant="destructive" className="text-xs mt-1">
                                  -{product.descuento}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {getBrandName(product.marcaId)}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {getCategoryName(product.categoriaId)}
                        </TableCell>
                        <TableCell>
                          <div>
                            {product.precioOferta ? (
                              <>
                                <p className="font-semibold text-green-600">
                                  {formatPrice(product.precioOferta)}
                                </p>
                                <p className="text-xs text-gray-500 line-through">
                                  {formatPrice(product.precio)}
                                </p>
                              </>
                            ) : (
                              <p className="font-semibold">
                                {formatPrice(product.precio)}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.deleted ? 'destructive' : 'default'}>
                            {product.deleted ? 'Eliminado' : 'Activo'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(product)}
                              className="hover:bg-blue-50"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(product)}
                              className={product.deleted ? 'hover:bg-green-50' : 'hover:bg-red-50'}
                            >
                              <Trash2 className={`w-4 h-4 ${product.deleted ? 'text-green-600' : 'text-red-600'}`} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="text-gray-500">
                          {searchCode ? 'No se encontraron productos con ese código' : 'No hay productos para mostrar'}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && !searchCode && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={page === currentPage}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Mostrando {products.length} de {totalProducts} productos
        </div>
      </div>

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        product={editingProduct}
      />
    </div>
  );
};

export default Admin;
