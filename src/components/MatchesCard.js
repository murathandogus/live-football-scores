import React from "react";
import { timeConverter } from "../functions";

var leagueIcons = {
  leagues: [
    {
      name: "Champions League",
      src: "https://im.cdn.md/img/groups/22.gif",
    },
    {
      name: "UEFA Europa Conference League",
      src: "https://im.cdn.md/img/groups/203.gif",
    },
    {
      name: "UEFA Europa League",
      src: "https://im.cdn.md/img/groups/577.gif",
    },
    {
      name: "Premier League",
      src: "https://im.cdn.md/img/groups/17.gif",
    },
    {
      name: "LaLiga",
      src: "https://im.cdn.md/img/groups/14.gif",
    },
    {
      name: "Bundesliga",
      src: "https://im.cdn.md/img/groups/2.gif",
    },
    {
      name: "Ligue 1",
      src: "https://im.cdn.md/img/groups/3.gif",
    },
    {
      name: "Serie A",
      src: "https://im.cdn.md/img/groups/10.gif",
    },
  ],
};

const MatchesCard = (props) => {
  return (
    <React.Fragment>
      <li className="match-badge">
        {/* Match card top box*/}
        <div className="match-top-badge">
          <img
            src={
              leagueIcons.leagues.find((element) =>
                props.item.country_leagues.split("-")[1].includes(element.name)
              )?.src
            }
            style={{ width: "16px", height: "12px", paddingRight: "3px" }}
            alt={props.item.country_leagues.split(" ")[0]}
          ></img>
          {props.item.country_leagues.split("-")[1]}
        </div>
        {/* Match card bottom box */}
        <div className="match-bottom-badge">
          {parseInt(Date.now().toString().substring(0, 10)) <
          props.item.startTime ? (
            <div className="match-time">
              {timeConverter(props.item.startTime)}
            </div>
          ) : (
            <div className="match-time match-time-live">
              {props.item.periodTXT.includes("End")
                ? "FT"
                : props.item.minutes > 0
                ? props.item.minutes < 90
                  ? props.item.minutes + "'"
                  : "90+"
                : ""}
            </div>
          )}

          <div className="home-team">
            <span>{props.item.home}</span>
          </div>
          <div className="score">
            <span>
              {props.item.periodTXT === "" ? " v " : props.item.score}
            </span>
          </div>
          <div className="away-team">
            <span>{props.item.away}</span>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

export default MatchesCard;
