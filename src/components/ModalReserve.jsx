import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "hooks/useFetch";
import { useState } from "react";
import { checkRoomAvailability, getDateInRange } from "utils/helpers";
import { useContext } from "react";
import { SearchContext } from "context/SearchContext";
import axios from "axios";
const ModalReserve = ({ setOpenModalReserve, hotelId }) => {
  const { dates } = useContext(SearchContext);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const allDates = getDateInRange(dates[0].startDate, dates[0].endDate);
  // console.log("allDates", allDates);
  console.log("data", data);

  const closeModal = () => {
    setOpenModalReserve(false);
  };
  const handleSelectedRoom = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    //add or remove from selectedRooms
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const handleReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          console.log("roomId", roomId);
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpenModalReserve(false);
    } catch (error) {}
  };
  return (
    <div className="reserve">
      <div className="reserveContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={"closeReserveIcon"}
          onClick={closeModal}
        />
        {loading ? (
          "loading..."
        ) : (
          <>
            <span>Elige tu habitación:</span>
            {
              //date = type of rooms
              data?.map((item) => {
                return (
                  <div className="reserveItem" key={item._id}>
                    <div className="reserveItemInfo">
                      <div className="reserveTitle">{item.title}</div>
                      <div className="reserveDesc">{item.desc}</div>
                      <div className="reserveMax">
                        Max people: <b>{item.maxPeople}</b>
                      </div>
                      <div className="reservePrice">{item.price}€</div>
                    </div>
                    <div className="reserveSelectRooms">
                      {
                        //rooms of one type
                        item.roomNumbers.map((roomNumber) => (
                          <div className="room" key={roomNumber._id}>
                            <label>{roomNumber.number}</label>
                            <input
                              type="checkbox"
                              value={roomNumber._id}
                              onChange={handleSelectedRoom}
                              disabled={checkRoomAvailability(
                                roomNumber,
                                allDates
                              )}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </div>
                );
              })
            }
            <button className="reserveBtn" onClick={handleReserve}>
              Reservar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalReserve;
