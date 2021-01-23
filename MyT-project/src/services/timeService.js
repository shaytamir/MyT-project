/* time handler func */
export const getDate = (postDate) => {
  let date2change = new Date(postDate);
  let date = date2change.getDate();
  let month = date2change.getMonth() + 1;
  let year = date2change.getYear() - 100;
  let hr = date2change.getHours();
  let min = date2change.getMinutes();
  let sec = date2change.getSeconds();

  if (date < 10) date = "0" + date;
  if (month < 10) month = "0" + month;
  if (hr < 10) hr = "0" + hr;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;

  const postTime = `${date}/${month}/${year} ${hr}:${min}:${sec}`;
  return postTime;
};
