import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
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
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Header = ({ type }) => {
  const navigate = useNavigate();
  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [openOptions, setOpenOptions] = useState(false);

  //HANDLE METHODS
  const handleInputDate = (item) => {
    setDate([item.selection]);
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
  const handleOption = (option, action) => {
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
    navigate("/hotels", { state: { destination, date, options } });
  };
  //OTHER METHODS
  const formatDate = () => {
    const startingDate = format(date[0].startDate, "dd/MM/yyyy");
    const endingDate = format(date[0].endDate, "dd/MM/yyyy");
    return `${startingDate} - ${endingDate}`;
  };
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
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
                  {formatDate()}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleInputDate}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
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
                          onClick={() => handleOption("adult", "decrease")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("adult", "increase")}
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
                          onClick={() => handleOption("children", "decrease")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("children", "increase")}
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
                          onClick={() => handleOption("room", "decrease")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("room", "increase")}
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
