import Footer from "./Footer";
import Navigation from "./navigation/Navigation";

const Layout = (props) => {
  return (
    <div className="relative flex flex-col justify-between">
      <Navigation />
      <main className="mb-20">{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
