import React from "react";
import "../index.css";

const FilterBox = (props) => {
  return (
    <React.Fragment>
      {/* Live button box */}
      <div
        className={`filter-box-live ${
          props._live ? "filter-box-live-clicked" : ""
        }`}
        onClick={props.onLiveChange}
      >
        <span>Live</span>
        <div
          className="ring-container"
          style={{ display: `${props._live ? "block" : "none"}` }}
        >
          <div className="ringring"></div>
          <div className="circle"></div>
        </div>
      </div>
      {/* Date filter box */}
      <div
        htmlFor="date"
        className={`filter-box-schedule ${
          props._live ? "filter-box-schedule-hidden" : ""
        } `}
      >
        <select
          name="date"
          id="date"
          className="filter-date-select"
          onChange={props.dateChange}
        >
          {props._dateList.map((item, index) => {
            return (
              <option value={item} key={index}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </React.Fragment>
  );
};

export default FilterBox;
