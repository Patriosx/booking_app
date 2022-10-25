import Header from "components/Header";
import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import ListSearch from "components/ListSearch";
import SearchItem from "components/SearchItem";
import useFetch from "hooks/useFetch";
const List = () => {
  const location = useLocation();
  const [filterState, setFilterState] = useState({
    destination: location.state.destination,
    options: location.state.options,
    dates: location.state.dates,
    minPrice: 0,
    maxPrice: 9999,
  });
  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${filterState.destination}&min=${
      filterState.minPrice || 0
    }&max=${filterState.maxPrice || 9999}`
  );
  return (
    <div>
      <Header type={"list"} />
      <div className="listContainer">
        <div className="listWrapper">
          <ListSearch
            filterState={filterState}
            setFilterState={setFilterState}
            reFetch={reFetch}
          />
          <div className="results">
            {loading
              ? "loading..."
              : data?.map((searchItem) => {
                  return (
                    <SearchItem searchItem={searchItem} key={searchItem._id} />
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
