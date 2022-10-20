import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Spin } from 'antd';
import { useConfirmMutation } from 'app/api';
import { selectPaymentOrder } from './paymentSlice';

export default function Payment() {
  const [showLoader, setShowLoader] = useState(false);
  const [confirm] = useConfirmMutation();
  const paymentOrder = useSelector(selectPaymentOrder);
  const { message = {}, transactionId, bppId, bppUri } = paymentOrder;
  const { order = {} } = message;
  const {
    quote = {},
    items = [],
    provider = {},
    provider_location = {},
  } = order;
  const [firstItem = {}] = items;
  const { id } = firstItem;
  const { id: providerId = '' } = provider;
  const { id: locationId = '' } = provider_location;
  const { price = {} } = quote;
  const { value = 0 } = price;

  if (!Object.keys(paymentOrder).length) return <Spin />;
  const handleClick = async () => {
    setShowLoader(true);
    try {
      await confirm({
        transactionId,
        bppId,
        bppUri,
        quote,
        id,
        providerId,
        locationId,
        value,
      }).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <div>
      <div>Confirm Order</div>
      <div>{''}</div>
      <div>{value}</div>
      {/*<div>{count}</div>*/}
      <div>{bppId}</div>
      <Button type="primary" onClick={handleClick} loading={showLoader}>
        Proceed to Payment
      </Button>
    </div>
  );
}
