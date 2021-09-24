import cookie from "cookie";

const handleLogout = async (req, res) => {
  res
    .setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        expires: new Date(0),
        path: "/api",
      })
    )
    .status(200)
    .json({ ok: true });
};
export default handleLogout;
