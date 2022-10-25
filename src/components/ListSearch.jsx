import React, { useState, useContext } from "react";
//CALENDAR & DATES
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons"; // ES Module "as" syntax
import { SearchContext } from "../context/SearchContext";
import { formatDate } from "utils/helpers";

const ListSearch = ({ filterState, setFilterState, reFetch }) => {
  const [openDate, setOpenDate] = useState(false);
  const { newSearchHotels } = useContext(SearchContext);

  //HANDLER METHODS
  const handleInputDate = (item) => {
    setFilterState({ ...filterState, dates: [item.selection] });
  };
  const handleOpenDate = (e) => {
    setOpenDate(!openDate);
  };

  const handleInputChange = (e) => {
    //handle min and max prices
    setFilterState({ ...filterState, [e.target.name]: e.target.value });
  };
  const handleSearch = () => {
    newSearchHotels({ ...filterState });
    reFetch();
  };
  const handleOptionChange = (e) => {
    setFilterState({
      ...filterState,
      options: {
        ...filterState.options,
        [e.target.name]: parseInt(e.target.value),
      },
    });
  };
  return (
    <div className="listSearch">
      <h1 className="listSearchTitle">Buscar</h1>
      <div className="listItem">
        <h3 className="listSearchText">Destino</h3>
        <div className="destinationContainer">
          <span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            type="text"
            name={"destination"}
            placeholder={filterState.destination}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="listItem">
        <h3 className="listSearchText" onClick={handleOpenDate}>
          Entrada - Salida
        </h3>
        <div className="dateContainer" onClick={handleOpenDate}>
          <FontAwesomeIcon icon={faCalendarDay} />
          <span className="listFilter searchDestination">
            {formatDate(filterState.dates)}
          </span>
        </div>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={handleInputDate}
            moveRangeOnFirstSelection={false}
            ranges={filterState.dates}
            className="date"
            minDate={new Date()}
          />
        )}
      </div>
      <div className="listItem">
        <h3 className="listSearchText">Opciones</h3>
        <div className="listFilters">
          <div className="listFilterItem">
            <label htmlFor="">
              Precio min. <small>(por noche)</small>
            </label>
            <input
              type="number"
              className="listOptionInput"
              min={0}
              name={"minPrice"}
              onChange={handleInputChange}
            />
          </div>
          <div className="listFilterItem">
            <label htmlFor="">
              Precio max. <small>(por noche)</small>
            </label>
            <input
              type="number"
              className="listOptionInput"
              min={0}
              name={"maxPrice"}
              onChange={handleInputChange}
            />
          </div>
          <div className="listFilterItem">
            <label htmlFor="">Adultos</label>
            <input
              type="number"
              className="listOptionInput"
              min={1}
              name={"adult"}
              placeholder={filterState.options.adult}
              onChange={handleOptionChange}
            />
          </div>
          <div className="listFilterItem">
            <label htmlFor="">Niños</label>
            <input
              type="number"
              className="listOptionInput"
              min={0}
              name={"children"}
              placeholder={filterState.options.children}
              onChange={handleOptionChange}
            />
          </div>
          <div className="listFilterItem">
            <label htmlFor="">Habitaciones</label>
            <input
              type="number"
              className="listOptionInput"
              min={1}
              name={"room"}
              placeholder={filterState.options.room}
              onChange={handleOptionChange}
            />
          </div>
        </div>
      </div>
      <button className="searchBtn" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default ListSearch;
