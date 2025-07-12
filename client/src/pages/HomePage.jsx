import Hero from "./Home/Hero";
import Trending from "./Home/Trending";
import Category from "./Home/Category";
import Collection from "./Home/Collection";

const HomePage = () => {
  return (
    <main className="py-10 px-4 space-y-10">
      <Hero />

      <div id="featured">
        <Trending heading="New Arrivals" size={4} />
      </div>

      <Category />

      <Collection />

      <Trending />
    </main>
  );
};

export default HomePage;
