import Layout from "@/components/Layout";
import Title from "@/components/Title";
import Image from "next/dist/client/image";
import { getProductById, getProducts } from "lib/product";
import Button from "@/components/ui/Button";
import { fetchApi } from "lib/api";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useMutation } from "react-query";

export const getStaticPaths = async (ctx) => {
  const products = await getProducts();

  const paths = products.map((product) => ({
    params: {
      id: `${product.id}`,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params: { id } }) => {
  try {
    const product = await getProductById(id);

    return {
      props: { product },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
function SingleProductPage({ product }) {
  const { id, price, title, description, pictureUrl } = product;
  const [quantity, setQuantity] = useState(1);
  const mutation = useMutation(() =>
    fetchApi("/api/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, quantity }),
    })
  );
  const router = useRouter();
  const handleAddToCart = async (e) => {
    await mutation.mutateAsync();
    router.push("/cart");
  };
  return (
    <Layout title={title}>
      <Title>{title}</Title>
      <div className="grid md:grid-cols-2 gap-3">
        <Image
          width={640}
          height={480}
          objectFit="cover"
          src={pictureUrl}
          alt=""
        />

        <div>
          <p className="text-sm">{description}</p>
          <p className=" text-xl font-bold mt-2">{price}</p>

          <Label label="Qty">
            <Input
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Label>

          <Button onClick={handleAddToCart} type="submit">
            Add to Cart
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default SingleProductPage;
