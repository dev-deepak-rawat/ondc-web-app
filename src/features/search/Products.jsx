import Product from 'features/search/Product';
import styles from 'features/search/Products.module.css';

export default function Products({ products = [] }) {
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
