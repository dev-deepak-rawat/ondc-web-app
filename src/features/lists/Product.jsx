import { useNavigate } from 'react-router-dom';
import styles from 'features/lists/Product.module.css';

export default function Product({ product = {} }) {
  const navigate = useNavigate();
  const {
    id = '',
    image = 'https://assetscdn1.paytm.com/images/catalog/product/O/ON/ONDNESTLE-EVERYPUNE11888815779DB98/1661365726546_1_th.jpg?imwidth=282&impolicy=hq',
    name = 'Nestle Everyday Ghee 1L',
    value = 500,
  } = product;
  console.log({ product });

  const handleClick = () => {
    navigate('/product-details', { state: id });
  };

  return (
    <div className={styles.productContainer} onClick={handleClick}>
      <img src={image} alt="product" className={styles.img} />
      <div className={styles.title}>{name}</div>
      <div className={styles.price}>₹{value}</div>
    </div>
  );
}
