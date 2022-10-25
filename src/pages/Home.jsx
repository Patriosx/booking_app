import Featured from "components/Featured";
import FeaturedProperties from "components/FeaturedProperties";

import Header from "components/Header";
import PropertyList from "components/PropertyList";

const Home = () => {
  return (
    <>
      <Header />
      <div className="homeContainer">
        <Featured />
        <h2 className="homeTitle">Buscar por propiedades</h2>
        <PropertyList />
        <h2 className="homeTitle">Propiedades destacadas</h2>
        <FeaturedProperties />
      </div>
    </>
  );
};

export default Home;
