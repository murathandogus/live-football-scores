import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MatchesCard from "./components/MatchesCard";
import FilterBox from "./components/FilterBox";
import { getData } from "./api/Api";
import { timeout, timeConverter } from "./functions";

export default function App() {
  const [matches, setMatches] = useState(null);
  const [dateList, setDateList] = useState([]);
  const [dateFilterData, setDateFilterData] = useState("All");
  const [live, setLive] = useState(true);

  const liveHandleChange = () => {
    setLive(!live);
  };
  const handleDateFilter = (event) => {
    setDateFilterData(event.target.value);
  };

  useEffect(() => {
    const getMatches = async () => {
      const leagues = [
        "Italy - Serie A",
        "France - Ligue 1",
        "Germany - Bundesliga",
        "Spain - LaLiga",
        "England - Premier League",
        "Europe - Champions League",
        "Europe - UEFA Europa Conference League ",
        "Europe - UEFA Europa League ",
      ];
      if (matches !== null) await timeout(5000); // request for every 5 sec

      //get data from api (data is unordered)
      var data = await getData();
      const orderedData = Object.keys(data)
        .reduce((total, key) => {
          let item = data[key];
          if (leagues.includes(item.country_leagues)) {
            total.push(item);
          }
          return total;
        }, [])
        .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

      setMatches(orderedData);

      //filter to date (upcoming matches)
      var _dateList = ["All"];
      Object.values(
        Object.keys(orderedData).reduce((total, key) => {
          let item = orderedData[key];
          if (
            parseInt(Date.now().toString().substring(0, 10)) <= item.startTime
          )
            total.push(item.startTime);
          return total;
        }, [])
      ).forEach((val) => {
        let month = timeConverter(val).split(" ")[0];
        let day = timeConverter(val).split(" ")[1];
        if (!_dateList.includes(`${month} ${day}`)) {
          _dateList.push(`${month} ${day}`);
        }
      });
      setDateList(_dateList);
    };
    getMatches();
  }, [matches]);
  return (
    <div className="parent-box">
      <ul className="matches-box">
        {matches !== null && matches !== undefined ? (
          <React.Fragment>
            <li className="filter-box">
              <FilterBox
                _dateList={dateList}
                _live={live}
                onLiveChange={liveHandleChange}
                dateChange={handleDateFilter}
              ></FilterBox>
            </li>
            <li className="header-title">
              {live ? "INPLAYING MATCHES" : "UPCOMING MATCHES"}
            </li>
            {matches.filter((x) =>
              live
                ? parseInt(Date.now().toString().substring(0, 10)) >
                    x.startTime && x.periodTXT !== "Ended"
                : parseInt(Date.now().toString().substring(0, 10)) <=
                  x.startTime
            ).length === 0 ? (
              <div className="header-title no-match-found">NO MATCH FOUND</div>
            ) : (
              matches
                .filter((x) =>
                  live
                    ? parseInt(Date.now().toString().substring(0, 10)) >
                        x.startTime && x.periodTXT !== "Ended"
                    : parseInt(Date.now().toString().substring(0, 10)) <=
                      x.startTime
                )
                .map((item, index) => {
                  if (!live && dateFilterData !== "All") {
                    if (
                      timeConverter(item.startTime).includes(dateFilterData)
                    ) {
                      return (
                        <MatchesCard key={index} item={item}></MatchesCard>
                      );
                    }
                    return "";
                  } else {
                    return <MatchesCard key={index} item={item}></MatchesCard>;
                  }
                })
            )}
          </React.Fragment>
        ) : (
          <div className="spinner-box">
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
}

const element = <App />;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);
