import ChosenMenu from "./ChosenMenu";
import Info from "./Info";
import Intro from "./Intro";

const Home = () => {
  return (
    <section id="home">
      <Intro />
      <Info />
      <ChosenMenu />
    </section>
  );
};

export default Home;
