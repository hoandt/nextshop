import Header from "next/head";
import Navbar from "./Navbar";
function Layout({ children, title, siteName, className }) {
  return (
    <>
      <Header>
        <title>
          {title} | {siteName}
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        ></meta>
        <link rel="icon" href="/img/favicon.ico" type="image/x-icon" />
      </Header>
      <header>
        <Navbar />
      </header>
      <main className={`$(className) px-6`}>{children}</main>
    </>
  );
}
Layout.defaultProps = {
  siteName: "Hoan's Blog",
};
export default Layout;
