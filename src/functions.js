export const timeConverter = (UNIX_timestamp) => {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time =
    month + " " + date + " " + hour + ":" + (min < 10 ? "0" + min : min);
  return time;
};

export const timeout = (delay) => {
  return new Promise((res) => setTimeout(res, delay));
};
