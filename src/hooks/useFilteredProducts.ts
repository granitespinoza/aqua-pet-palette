
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import brandsData from '../data/brands.json';
import categoriesData from '../data/categories.json';

export interface Product {
  id: number;
  nombre: string;
  marcaId: number;
  categoriaId: string;
  precio: number;
  precioOferta: number | null;
  descuento: number;
  img: string;
  is_featured: boolean;
}

export interface Brand {
  id: number;
  nombre: string;
  slug: string;
  logo: string;
}

export interface Category {
  id: string;
  nombre: string;
  slug: string;
}

export const useFilteredProducts = (productsPerPage: number = 20) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Get current page from URL params
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    setCurrentPage(page);
  }, [searchParams]);

  const updatePage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newSearchParams.delete('page');
    } else {
      newSearchParams.set('page', page.toString());
    }
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    const filterProducts = () => {
      setLoading(true);
      
      // Get products from localStorage or fallback to static data
      const getProducts = (): Product[] => {
        const savedProducts = localStorage.getItem('products_public');
        if (savedProducts) {
          try {
            const parsed = JSON.parse(savedProducts);
            console.log('Loaded products from localStorage:', parsed.length);
            return parsed;
          } catch (error) {
            console.error('Error parsing products from localStorage:', error);
          }
        }
        console.log('Using static products data:', productsData.length);
        return productsData as Product[];
      };

      const categoria = searchParams.get('categoria');
      const marca = searchParams.get('marca');
      
      console.log('Filtering with:', { categoria, marca });

      let filtered = getProducts();
      console.log('Total products before filtering:', filtered.length);

      if (categoria) {
        filtered = filtered.filter((product: Product) => {
          const matches = product.categoriaId === categoria;
          console.log(`Product ${product.nombre} - Category ${product.categoriaId} matches ${categoria}:`, matches);
          return matches;
        });
        console.log('Products after category filter:', filtered.length);
      }

      if (marca) {
        const brand = (brandsData as Brand[]).find(b => b.slug === marca);
        console.log('Found brand:', brand);
        if (brand) {
          filtered = filtered.filter((product: Product) => {
            const matches = product.marcaId === brand.id;
            console.log(`Product ${product.nombre} - Brand ID ${product.marcaId} matches ${brand.id}:`, matches);
            return matches;
          });
          console.log('Products after brand filter:', filtered.length);
        }
      }

      console.log('Final filtered products:', filtered.length);
      setFilteredProducts(filtered);
      setLoading(false);
    };

    filterProducts();
  }, [searchParams]);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'products_public') {
        console.log('Storage changed, refetching products');
        // Trigger re-filter when products change
        const categoria = searchParams.get('categoria');
        const marca = searchParams.get('marca');
        
        let filtered = e.newValue ? JSON.parse(e.newValue) : productsData as Product[];

        if (categoria) {
          filtered = filtered.filter((product: Product) => product.categoriaId === categoria);
        }

        if (marca) {
          const brand = (brandsData as Brand[]).find(b => b.slug === marca);
          if (brand) {
            filtered = filtered.filter((product: Product) => product.marcaId === brand.id);
          }
        }

        setFilteredProducts(filtered);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [searchParams]);

  // Calculate pagination
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    brands: brandsData as Brand[],
    categories: categoriesData as Category[],
    totalProducts,
    loading,
    currentPage,
    totalPages,
    updatePage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
};
