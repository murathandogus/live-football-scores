import axios from "axios";
const API_KEY = "4bfb85b6a0mshd20adaaee24e46ep13e7cbjsn81152d2dbab6";
const API_HOST = "football-betting-odds1.p.rapidapi.com";
const API_URL = "https://football-betting-odds1.p.rapidapi.com/provider1/live/list";
const options = {
  method: "GET",
  url: API_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
};

export const getData = async () => {
  var data = null;
  await axios
    .request(options)
    .then((response) => (data = response.data))
    .catch((error) => console.log(error));
  return data;
};
