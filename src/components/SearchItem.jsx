import React from "react";
import { Link } from "react-router-dom";

const SearchItem = ({ searchItem }) => {
  return (
    <div className="listResult">
      <div className="searchItem">
        <img src={searchItem.photos[0]} alt="" className="searchItemImg" />
        <div className="searchItemDesc">
          <h1 className="searchItemTitle">{searchItem.name}</h1>
          <span className="searchItemDistance">{searchItem.distance}</span>
          <span className="searchItemTaxiOp">Free airport taxi</span>
          <span className="searchItemSubtitle">{searchItem.title}</span>
          <span className="searchItemFeatures">{searchItem.desc}</span>
          <span className="searchItemCancelOp">Free cancellation</span>
          <span className="searchItemCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="searchItemDetails">
          <div className="searchItemRating">
            {searchItem.rating && (
              <>
                <span>Excellent</span>
                <button>{searchItem.rating}</button>
              </>
            )}
          </div>
          <div className="searchItemDetailTexts">
            <span className="searchItemPrice">{searchItem.cheapestPrice}€</span>
            <span className="searchItemTaxOp">Includes taxes and fees</span>
            <Link to={`/hotels/${searchItem._id}`}>
              <button className="searchItemCheckButton">
                See availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
