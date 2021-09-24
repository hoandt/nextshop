import { fetchApi } from "lib/api";

const handleAddToCart = async (req, res) => {
  const { jwt } = req.cookies;
  const { id: product, quantity } = req.body;
  if (!jwt) return res.status(401).end();
  res.status(200).json({ product });
  try {
    const response = await fetchApi(`${process.env.CMS_URL}/cart-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        product,
        quantity,
      }),
    });
    res.status(200).json({ data: await response });
  } catch (error) {
    res.status(401).end();
  }
};

export default handleAddToCart;
