import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isJsonString } from 'app/utils';
import { addNewProducts } from 'features/lists/productsSlice';
import { selectTransactionId } from 'features/webSockets/connectionSlice';
import { setCartItem } from 'features/carts/cartSlice';

export default function Connection({ cable }) {
  const dispatch = useDispatch();
  const transactionId = useSelector(selectTransactionId);

  useEffect(() => {
    if (transactionId) {
      cable.subscriptions.create(
        { channel: 'TransactionsChannel', transaction_id: transactionId },
        {
          received: (result) => {
            console.log({ result });
            if (!isJsonString(result)) return;
            const parsedResult = JSON.parse(result);
            console.log({ parsedResult });
            const { action, payload } = parsedResult;
            switch (action) {
              case 'search':
                dispatch(addNewProducts(payload));
                break;
              case 'select':
                console.log('connectionSlice cart', { payload });
                dispatch(setCartItem(payload));
                break;
              case 'init':
                break;
              default:
                return;
            }
          },
        },
      );
    }
    //return () => {
    //  cable.disconnect();
    //};
  }, [cable, cable.subscriptions, transactionId, dispatch]);
  return null;
}
