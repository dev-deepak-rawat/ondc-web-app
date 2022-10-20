import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import { selectCartItem } from 'features/carts/cartSlice';
import { useNavigate } from 'react-router-dom';

import { useInitMutation } from 'app/api';
import styles from 'features/carts/Cart.module.css';

export default function Cart() {
  const [showLoader, setShowLoader] = useState(false);
  const [init] = useInitMutation();
  const cartItem = useSelector(selectCartItem);
  const navigate = useNavigate();

  if (!Object.keys(cartItem).length) return <Spin />;
  const { message = {}, transactionId, bppId, bppUri } = cartItem;
  console.log({ cartItem });
  const { order = {} } = message;
  const { quote = {}, provider = {}, locations = [] } = order;
  const { id: providerId = '' } = provider;
  const [{ id: locationId = '' } = {}] = locations;
  const { breakup = [] } = quote;
  const [firstBreakup = {}] = breakup;
  const {
    title = '',
    price = {},
    '@ondc/org/item_id': itemId = '',
    '@ondc/org/item_quantity': itemQuantity,
  } = firstBreakup;
  const { value = 0 } = price;
  //const { count = 0 } = itemQuantity;

  const handleClick = async () => {
    setShowLoader(true);
    try {
      await init({
        transactionId,
        id: itemId,
        bppId,
        bppUri,
        providerId,
        locationId,
      }).unwrap();
      navigate('/payment');
    } catch (err) {
      console.error(err);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div>
      <div>Cart Items</div>
      <div>{title}</div>
      <div>{value}</div>
      {/*<div>{count}</div>*/}
      <div>{bppId}</div>
      <Button type="primary" onClick={handleClick} loading={showLoader}>
        Checkout
      </Button>
    </div>
  );
}
