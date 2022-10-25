import Header from "components/Header";
import Slider from "components/Slider";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "hooks/useFetch";
import { SearchContext } from "context/SearchContext";
import { dayDifference } from "utils/helpers";
import { AuthContext } from "context/AuthContext";

const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  //handlers state
  const [slideNumber, setSlideNumber] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);

  //fetch hotel data selected
  const idHotel = location.pathname.split("/")[2]; //same-> location.pathname.slice(8);
  const { data, loading } = useFetch(`/hotels/find/${idHotel}`);

  //Methods
  const handleOpenSlider = (i) => {
    setSlideNumber(i);
    setOpenSlider(true);
  };
  const handleBookBtn = () => {
    if (user) {
    } else {
      navigate("/login");
    }
  };
  const days = dates
    ? dayDifference(dates[0]?.startDate, dates[0]?.endDate)
    : null;

  return (
    <>
      <Header type={"list"} />
      {openSlider && (
        <Slider
          photos={data.photos}
          setOpenSlider={setOpenSlider}
          slideNumber={slideNumber}
          setSlideNumber={setSlideNumber}
        />
      )}
      {loading ? (
        "loading..."
      ) : (
        <div className="hotelContainer">
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleBookBtn}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excelente ubicación – {data.distance}
            </span>
            <span className="hotelPriceHighlight">
              Reserva tu estancia por {data.cheapestPrice}€ y consigue un taxi
              gratis hacia el aeropuerto
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpenSlider(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfecto para una estancia de {days} día/s</h1>
                <span>
                  {data.title}. A {data.distance}.
                </span>
                <h2>
                  <strong>{days * data.cheapestPrice * options.room}</strong> (
                  {days} noches)
                </h2>
                <button onClick={handleBookBtn}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hotel;
