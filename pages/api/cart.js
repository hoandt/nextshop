const handleCart = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return res.status(401).end();
  }
  try {
    const response = await fetch(`${process.env.CMS_URL}/cart-items`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const cart = await response.json();
    const cartItems = cart.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          title: item.product.title,
          price: item.product.price,
        },
      };
    });
    if (response.ok) {
      res.status(200).json(cartItems);
    } else {
      res
        .status(response.status)
        .json({ [response.status]: response.statusText });
    }
  } catch (error) {
    res.status(500).json({ [error.errno]: error.code });
  }
};
export default handleCart;
