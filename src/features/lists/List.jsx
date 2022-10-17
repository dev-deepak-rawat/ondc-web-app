import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { selectProducts } from 'features/lists/productsSlice';
import Products from 'features/lists/Products';
import { selectHasSearched } from 'features/searches/searchSlice';

export default function List() {
  const hasSearched = useSelector(selectHasSearched);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasSearched) navigate('/');
  }, [hasSearched, navigate]);

  const products = useSelector(selectProducts);
  if (products.length) return <Products products={products} />;
  return <Spin />;
}
