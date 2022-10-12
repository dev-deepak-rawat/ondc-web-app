export const getProductsFromSearchResponse = (message = {}) => {
  const parsedData = JSON.parse(message);
  if (!parsedData) return [];
  const { catalog = {} } = parsedData;
  const { 'bpp/providers': bppProviders = [] } = catalog;
  const products = bppProviders.reduce((acc, provider) => {
    const { items = [] } = provider;
    const mappedItems = items.map((item = {}) => {
      const { id = '', price = {}, descriptor = {} } = item;
      const { value = '' } = price;
      const { name = '', images = [] } = descriptor;
      return { id, name, image: images[0], value };
    });
    return [...acc, ...mappedItems];
  }, []);
  return products;
};

export const filterNoiseProducts = (currProducts, newProducts) => {
  const filterRepeatProducts = newProducts.filter(
    (product) => !currProducts.map((cp) => cp.id).includes(product.id),
  );
  const filterDataMissingProducts = filterRepeatProducts.filter(
    (product) =>
      product.image &&
      product.name &&
      product.value &&
      product.id &&
      product.name !== 'Product A',
  );
  return filterDataMissingProducts;
};
