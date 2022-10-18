import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import { useSearchMutation } from 'app/api';
import { resetProducts } from 'features/lists/productsSlice';
import { setHasSearched } from 'features/searches/searchSlice';
import {
  selectTransactionId,
  setTransactionId,
} from 'features/webSockets/connectionSlice';

export default function Search() {
  const [showSearchLoader, setShowSearchLoader] = useState(false);
  const [search] = useSearchMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transactionId = useSelector(selectTransactionId);

  useEffect(() => {
    dispatch(setTransactionId(uuidV4()));
  }, [dispatch]);

  useEffect(() => {
    dispatch(resetProducts([]));
    dispatch(setHasSearched(false));
  }, [dispatch]);

  const onSearch = async (searchText) => {
    setShowSearchLoader(true);
    try {
      await search({ searchText, transactionId }).unwrap();
      dispatch(setHasSearched(true));
      navigate('/list');
    } catch (err) {
      console.error(err);
    } finally {
      setShowSearchLoader(false);
    }
  };

  return (
    <div>
      <Input.Search
        placeholder="Search for a Product, Brand or Category"
        onSearch={onSearch}
        style={{ width: 400 }}
        loading={showSearchLoader}
        autoFocus
      />
    </div>
  );
}
