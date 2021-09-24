import { fetchApi } from "./api";

const CMS_URL = process.env.CMS_URL;
export const getProducts = async () => {
  const products = await fetchApi(`${CMS_URL}/products`); // your fetch function here
  return products.map(stripProduct);
};
export const getProductById = async (id) => {
  const product = await fetchApi(`${CMS_URL}/products/${id}`);
  return stripProduct(product);
};

const stripProduct = (product) => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: "$" + ((product.price * 100) / 100).toFixed(2),
    pictureUrl: CMS_URL + product.picture.url,
  };
};
