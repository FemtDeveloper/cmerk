import { useContext } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { Navbar } from "./Navbar";
import { SideMenu } from "./SideBar";
import { UiContext } from "context";
import { SigninModal } from "./SigninModal";
import { CategoriesNavbar } from "./CategoriesNavbar";
import { Footer } from "./Footer";

const Layout = ({
  children = null,
  title = "",
  pageDescription = "",
  gender = "",
}) => {
  const {} = useContext(UiContext);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
        <meta name="theme-color" content="#ed47dd"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
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
