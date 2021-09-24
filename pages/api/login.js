import { fetchApi } from "lib/api";
import cookie from "cookie";
const handleLogin = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }
  try {
    const { email, password } = req.body;
    const { jwt, user } = await fetchApi(`${process.env.CMS_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier: email, password }),
    });
    res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          httpOnly: true,
          maxAge: 60 * 60 * 24,
          path: "/api",
        })
      )
      .status(200)
      .json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(401).end();
  }
};
export default handleLogin;
