import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { getProducts } from "lib/product";

export const getStaticProps = async (ctx) => {
  const products = await getProducts();

  return {
    props: {
      products,
    },
    revalidate: parseInt(process.env.REVALIDATE_SECONDS),
  };
};
function Homepage({ products }) {
  return (
    <Layout title="Homepage">
      <Title>Nextshop</Title>
      <div className="grid place-items-center	 lg:grid-cols-3 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </Layout>
  );
}

export default Homepage;
