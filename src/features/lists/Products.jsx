import Product from 'features/lists/Product';
import styles from 'features/lists/Products.module.css';

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
