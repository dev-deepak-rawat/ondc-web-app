import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { selectProducts } from 'features/lists/productsSlice';
import { useSelectMutation } from 'app/api';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const [showSearchLoader, setShowSearchLoader] = useState(false);
  const products = useSelector(selectProducts);
  const [select] = useSelectMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const { state: productId } = location;

  useEffect(() => {
    if (!productId) navigate('/');
  }, [productId, navigate]);

  if (!productId) return null;

  const product = products.find((product) => product.id === productId) || {};
  console.log({ product });

  const {
    id,
    name,
    image,
    value,
    providerId,
    transactionId,
    locationId,
    providerDescriptor,
    itemLocationId,
    bppId,
    bppUri,
  } = product;

  const handleClick = async () => {
    setShowSearchLoader(true);
    try {
      await select({
        transactionId,
        id,
        providerId,
        itemLocationId,
        locationId,
        bppId,
        bppUri,
      }).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setShowSearchLoader(false);
    }
  };
  return (
    <>
      <div>ProductDetail</div>
      <Button type="primary" onClick={handleClick} loading={showSearchLoader}>
        Select
      </Button>
    </>
  );
}
