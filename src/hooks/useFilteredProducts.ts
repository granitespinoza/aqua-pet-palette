
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

export const useFilteredProducts = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData as Product[]);

  useEffect(() => {
    const categoria = searchParams.get('categoria');
    const marca = searchParams.get('marca');

    let filtered = productsData as Product[];

    if (categoria) {
      filtered = filtered.filter(product => product.categoriaId === categoria);
    }

    if (marca) {
      const brand = (brandsData as Brand[]).find(b => b.slug === marca);
      if (brand) {
        filtered = filtered.filter(product => product.marcaId === brand.id);
      }
    }

    setFilteredProducts(filtered);
  }, [searchParams]);

  return {
    products: filteredProducts,
    brands: brandsData as Brand[],
    categories: categoriesData as Category[],
    totalProducts: filteredProducts.length
  };
};
