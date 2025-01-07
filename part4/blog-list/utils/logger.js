const colors = require("colors");
const info = (...params) => console.log(colors.cyan(...params));
const error = (...params) => console.error(colors.red(...params));

module.exports = { info, error };
