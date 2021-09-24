import Layout from "@/components/Layout";
import Title from "@/components/Title";
import useUser from "hooks/user";
import { fetchApi } from "lib/api";
import Link from "next/link";
import { useQuery } from "react-query";

function CartPage() {
  const [isLoading, error, user] = useUser();

  const { data, isLoading: loading } = useQuery("cart", () =>
    fetchApi("/api/cart")
  );

  const cart = data;
  return (
    <Layout title="My Cart">
      <Title>My Cart</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-fixed">
          <thead>
            <tr>
              <th className="w-1/2">Name</th>
              <th className="w-1/4">Qty</th>
              <th className="w-1/4">Price</th>
            </tr>
          </thead>
          <tbody className="border-t">
            {cart &&
              cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td>
                    <Link href={`products/${item.product.id}`}>
                      <a> {item.product.title}</a>
                    </Link>
                  </td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{item.product.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default CartPage;
