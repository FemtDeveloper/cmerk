import { useContext } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { Navbar } from "../components/Navbar";
import { SideMenu } from "../components/SideBar";
import { UiContext } from "context";
import { SigninModal } from "../components/SigninModal";
import { CategoriesNavbar } from "../components/CategoriesNavbar";
import { Footer } from "../components/Footer";
import { SalesBar } from "../components/SalesBar";

const Layout = ({
  children = null,
  title = "",
  pageDescription = "",
  isPromo = false,
}) => {
  const {} = useContext(UiContext);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        <meta name="theme-color" content="#4b72ff"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!isPromo && <SalesBar />}
      <nav className="navbar-sticky" style={{ position: "sticky", zIndex: 1 }}>
        <Navbar />
      </nav>

      <CategoriesNavbar />

      <SideMenu />
      <main
        style={{
          margin: "10px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {children}
      </main>
      <nav>
        <Footer />
      </nav>

      <SigninModal />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;