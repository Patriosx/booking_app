import React, { useState } from "react";
//CALENDAR & DATES
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

const ListSearch = ({ filterState, setFilterState }) => {
  const [openDate, setOpenDate] = useState(false);
  //METHODS
  const handleInputDate = (item) => {
    setFilterState({ ...filterState, date: [item.selection] });
  };
  const handleOpenDate = () => {
    setOpenDate(!openDate);
  };
  const formatDate = () => {
    const startingDate = format(filterState.date[0].startDate, "dd/MM/yyyy");
    const endingDate = format(filterState.date[0].endDate, "dd/MM/yyyy");
    return `${startingDate} - ${endingDate}`;
  };
  return (
    <div className="listSearch">
      <h1 className="listSearchTitle">Buscar</h1>
      <div className="listItem">
        <h3 className="listSearchText">Destino</h3>
        <input type="text" name="" placeholder="las palmas" />
      </div>
      <div className="listItem">
        <h3 className="listSearchText" onClick={handleOpenDate}>
          Entrada - Salida
        </h3>
        <span className="listFilter searchDestination" onClick={handleOpenDate}>
          {formatDate()}
        </span>
        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={handleInputDate}
            moveRangeOnFirstSelection={false}
            ranges={filterState.date}
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
              Precio min <small>(por noche)</small>
            </label>
            <input type="number" className="listOptionInput" min={0} />
          </div>
          <div className="listFilterItem">
            <label htmlFor="">
              Precio max <small>(por noche)</small>
            </label>
            <input type="number" className="listOptionInput" min={0} />
          </div>
          <div className="listFilterItem">
            <label htmlFor="">Adultos</label>
            <input
              type="number"
              className="listOptionInput"
              min={1}
              placeholder={filterState.options.adult}
            />
          </div>
          <div className="listFilterItem">
            <label htmlFor="">Niños</label>
            <input
              type="number"
              className="listOptionInput"
              min={0}
              placeholder={filterState.options.children}
            />
          </div>
          <div className="listFilterItem">
            <label htmlFor="">Habitaciones</label>
            <input
              type="number"
              className="listOptionInput"
              min={1}
              placeholder={filterState.options.room}
            />
          </div>
        </div>
      </div>
      <button>Buscar</button>
    </div>
  );
};

export default ListSearch;
