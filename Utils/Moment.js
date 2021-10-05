// Code to convert time unit to milisecond

const moment = require("moment");

module.exports = {
  /**
   * Gets the TimeStamp of the moment this function was called
   * @returns Current time Stamp
   */
  getNow: () => {
    return moment().valueOf();
  },
  /**
   * Add given Numbers of hours to current time and returns
   * @param  hours Number of hours to add to the current time
   * @returns TimeStamp with the number of hours added
   *
   */
  addHours: (hours) => {
    let hoursMS = hours * 60 * 60 * 1000;
    return moment().valueOf() + hoursMS;
  },
};
