import Header from "components/Header";
import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import ListSearch from "components/ListSearch";
import ListResults from "components/ListResults";
const List = () => {
  const location = useLocation();
  const [filterState, setFilterState] = useState({
    destination: location.state.destination,
    options: location.state.options,
    date: location.state.date,
  });
  console.log(location);
  /** */

  /**/
  return (
    <div>
      <Header type={"list"} />
      <div className="listContainer">
        <div className="listWrapper">
          <ListSearch
            filterState={filterState}
            setFilterState={setFilterState}
          />
          <div className="results">
            <ListResults />
            <ListResults />
            <ListResults />
            <ListResults />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
