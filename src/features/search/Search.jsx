import { useEffect, useMemo, useState } from 'react';
import { Input, Spin } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useSearchMutation } from 'app/api';
import Products from 'features/search/Products';
import { filterNoiseProducts, getProductsFromSearchResponse } from 'app/helper';

export default function Search({ cable }) {
  const [showLoader, setShowLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [search] = useSearchMutation();
  const transactionId = useMemo(() => uuidv4(), []);

  useEffect(() => {
    cable.subscriptions.create(
      { channel: 'SearchesChannel', transaction_id: transactionId },
      {
        received: (message) => {
          if (message) {
            const newProducts = getProductsFromSearchResponse(message);
            setProducts((p) => [...p, ...filterNoiseProducts(p, newProducts)]);
          }
        },
      },
    );
    //return () => {
    //  cable.disconnect();
    //};
  }, [cable, cable.subscriptions, transactionId]);

  const onSearch = async (searchText) => {
    setShowLoader(true);
    try {
      const searchStatus = await search({ searchText, transactionId }).unwrap();
      const { data = {} } = searchStatus;
      console.log({ data });
    } catch (err) {
      console.error(err);
    }
  };

  if (products.length) return <Products products={products} />;
  if (showLoader) return <Spin />;
  return (
    <div>
      <Input.Search
        placeholder="Search for a Product, Brand or Category"
        onSearch={onSearch}
        style={{ width: 400 }}
      />
    </div>
  );
}
