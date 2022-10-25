import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDay,
  faCar,
  faPlane,
  faTaxi,
  faPerson,
  faToriiGate,
} from "@fortawesome/free-solid-svg-icons"; // ES Module "as" syntax

//CALENDAR & DATES
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { startOfDay, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { formatDate } from "utils/helpers";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: startOfDay(addDays(new Date(), +1)),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openOptions, setOpenOptions] = useState(false);
  const { newSearchHotels, state } = useContext(SearchContext);

  //HANDLE METHODS
  const handleInputDate = (item) => {
    setDates([item.selection]);
  };
  const handleOpenDate = () => {
    setOpenDate(!openDate);
    if (!openDate) setOpenOptions(false);
  };
  const handleDisplayOptions = () => {
    return `${options.adult} adultos - ${options.children} niños - ${options.room} habitaciones `;
  };
  const handleOpenOptions = () => {
    setOpenOptions(!openOptions);
    if (!openOptions) setOpenDate(false);
  };
  const handleOptions = (option, action) => {
    setOptions((prev) => {
      return {
        ...prev,
        [option]:
          action === "increase" ? options[option] + 1 : options[option] - 1,
      };
    });
  };
  const handleDestination = (e) => {
    setDestination(e.target.value);
  };
  const handleSearch = () => {
    newSearchHotels({ destination, dates, options });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div
            className="headerListItem active"
            onClick={() => console.log(state)}
          >
            <FontAwesomeIcon icon={faBed} />
            <span>state</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Alojamiento</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Vuelos</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Alquiler de coches</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faToriiGate} />
            <span>Atracciones turísticas</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxis aeropuerto</span>
          </div>
        </div>

        {type !== "list" && (
          <>
            <div className="headerText">
              <h1 className="headerTitle">Encuentra tu próxima estancia</h1>
              <p className="headerDesc">
                Busca ofertas en hoteles, casas y mucho más...
              </p>
            </div>
            {/* <button className="headerBtn">Login/ Register</button> */}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon className="headerIcon" icon={faBed} />
                <input
                  type="text"
                  placeholder="¿Adónde vas?"
                  className="headerSearchInput"
                  name="destination"
                  onChange={handleDestination}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon className="headerIcon" icon={faCalendarDay} />
                <span onClick={handleOpenDate} className="headerSearchText">
                  {formatDate(dates)}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleInputDate}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon className="headerIcon" icon={faPerson} />
                <span className="headerSearchText" onClick={handleOpenOptions}>
                  {handleDisplayOptions()}
                </span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adulto</span>
                      <div>
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterBtn"
                          onClick={() => handleOptions("adult", "decrease")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOptions("adult", "increase")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Niños</span>
                      <div>
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterBtn"
                          onClick={() => handleOptions("children", "decrease")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOptions("children", "increase")}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="optionItem">
                      <span className="optionText">Habitaciones</span>
                      <div>
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterBtn"
                          onClick={() => handleOptions("room", "decrease")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOptions("room", "increase")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Buscar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
