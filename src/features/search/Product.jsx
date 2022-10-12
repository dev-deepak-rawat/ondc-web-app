import styles from 'features/search/Product.module.css';

export default function Product({ product = {} }) {
  const {
    image = 'https://assetscdn1.paytm.com/images/catalog/product/O/ON/ONDNESTLE-EVERYPUNE11888815779DB98/1661365726546_1_th.jpg?imwidth=282&impolicy=hq',
    name = 'Nestle Everyday Ghee 1L',
    value = 500,
  } = product;
  return (
    <div className={styles.productContainer}>
      <img src={image} alt="product" className={styles.img} />
      <div className={styles.title}>{name}</div>
      <div className={styles.price}>₹{value}</div>
    </div>
  );
}
