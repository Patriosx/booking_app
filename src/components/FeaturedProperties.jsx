import useFetch from "hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true");
  return (
    <div className="featuredProperty">
      {loading ? (
        "loading..."
      ) : (
        <>
          {data.map((featuredProperty) => {
            return (
              <div className="featuredPropertyItem" key={featuredProperty._id}>
                <img
                  src={featuredProperty.photos[0]}
                  alt=""
                  className="featuredPropertyImg"
                />
                <span className="featuredPropertyName">
                  {featuredProperty.name}
                </span>
                <span className="featuredPropertyCity">
                  {featuredProperty.city}
                </span>
                <span className="featuredPropertyPrice">
                  Desde {featuredProperty.cheapestPrice}€
                </span>
                {featuredProperty.rating && (
                  <div className="featuredPropertyRating">
                    <button>{featuredProperty.rating}</button>
                    <span>Excellent</span>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* <div className="featuredPropertyItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
          alt=""
          className="featuredPropertyImg"
        />
        <span className="featuredPropertyName">Comfort Suites Airport</span>
        <span className="featuredPropertyCity">Austin</span>
        <span className="featuredPropertyPrice">Starting from $140</span>
        <div className="featuredPropertyRating">
          <button>9.3</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="featuredPropertyItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/232902339.jpg?k=3947def526b8af0429568b44f9716e79667d640842c48de5e66fd2a8b776accd&o=&hp=1"
          alt=""
          className="featuredPropertyImg"
        />
        <span className="featuredPropertyName">Four Seasons Hotel</span>
        <span className="featuredPropertyCity">Lisbon</span>
        <span className="featuredPropertyPrice">Starting from $99</span>
        <div className="featuredPropertyRating">
          <button>8.8</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="featuredPropertyItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
          alt=""
          className="featuredPropertyImg"
        />
        <span className="featuredPropertyName">Hilton Garden Inn</span>
        <span className="featuredPropertyCity">Berlin</span>
        <span className="featuredPropertyPrice">Starting from $105</span>
        <div className="featuredPropertyRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
       */}
    </div>
  );
};

export default FeaturedProperties;
