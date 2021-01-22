export const colorsObj = {
  purple: "#D7AEFB",
  red: "#EA715A",
  yellow: "#F7E6AF",
  green: "#AED67B",
  gray: "#D5DEE9",
  pink: "#F096BE",
};

/* returns rndom color */
export const randColor = () => {
  let rand = Math.floor(Math.random() * Object.keys(colorsObj).length);
  // console.log(Object.keys(colorsObj)[rand]);
  return Object.values(colorsObj)[rand];
};
const exports = {
  randColor,
};
export default exports;
