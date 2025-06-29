
import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUser } from '@/contexts/UserContext';
import { useAdminProducts } from '@/hooks/useAdminProducts';
import { formatPrice } from '@/lib/formatPrice';
import ProductModal from '@/components/ProductModal';
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

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Proteger la ruta para solo owners
  if (!isOwner()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Acceso Restringido
              </h2>
              <p className="text-gray-600">
                Esta sección es solo para administradores.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleCreate = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSave = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      createProduct(productData);
    }
    setModalOpen(false);
  };

  const handleDelete = (product) => {
    if (product.deleted) {
      restoreProduct(product.id);
    } else {
      deleteProduct(product.id);
    }
  };

  const getBrandName = (brandId) => {
    const brand = brandsData.find(b => b.id === brandId);
    return brand ? brand.nombre : 'Sin marca';
  };

  const getCategoryName = (categoryId) => {
    const category = categoriesData.find(c => c.id === categoryId);
    return category ? category.nombre : 'Sin categoría';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-yellow-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Panel Administrativo
            </h1>
            <Button
              onClick={handleCreate}
              className="bg-primary hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border border-blue-100">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Productos ({totalProducts})</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por código..."
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="w-48"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow 
                      key={product.id}
                      className={product.deleted ? 'opacity-50 bg-gray-50' : ''}
                    >
                      <TableCell className="font-mono text-sm">
                        {product.id}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="line-clamp-2">{product.nombre}</div>
                      </TableCell>
                      <TableCell>
                        {getBrandName(product.marcaId)}
                      </TableCell>
                      <TableCell>
                        {getCategoryName(product.categoriaId)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div>
                          {product.precioOferta ? (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.precio)}
                              </span>
                              <div className="font-semibold text-green-600">
                                {formatPrice(product.precioOferta)}
                              </div>
                            </>
                          ) : (
                            <span className="font-semibold">
                              {formatPrice(product.precio)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={product.deleted ? 'destructive' : 'default'}>
                          {product.deleted ? 'Eliminado' : 'Activo'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product)}
                            className={product.deleted 
                              ? "text-green-600 hover:text-green-800" 
                              : "text-red-600 hover:text-red-800"
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </Button>
                  <span className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ProductModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        product={editingProduct}
        onSave={handleSave}
      />
    </div>
  );
};

export default Admin;
