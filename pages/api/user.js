import { fetchApi } from "lib/api";

const handleUser = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const user = await fetchApi(`${process.env.CMS_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    res.status(200).json({ id: user.id, username: user.username });
  } catch (err) {
    res.status(401).end();
  }
};

export default handleUser;
