export const getProductsFromSearchResponse = ({
  message = {},
  transactionId = '',
  bppId = '',
  bppUri = '',
}) => {
  const { catalog = {} } = message;
  console.log({ catalog });
  const { 'bpp/providers': bppProviders = [] } = catalog;
  const products = bppProviders.reduce((acc, provider) => {
    const {
      items = [],
      locations = [],
      id: providerId = '',
      descriptor: providerDescriptor = {},
    } = provider;
    const [{ id: locationId = '' } = {}] = locations;
    const mappedItems = items.map((item = {}) => {
      const {
        id = '',
        price = {},
        descriptor = {},
        location_id: itemLocationId = '',
      } = item;
      const { value = '' } = price;
      const { name = '', images = [] } = descriptor;
      return {
        id,
        name,
        image: images[0],
        value,
        providerId,
        transactionId,
        locationId,
        providerDescriptor,
        itemLocationId,
        bppId,
        bppUri,
      };
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
