import moment from 'moment';

/**
 * Determine whether the object is a string.
 *
 * @param {mixed} object
 * @return {bool}
 */
const isString = (object) => typeof object === 'string';

/**
 * Determine whether the object is an instance of Moment.
 *
 * @param {mixed} object
 * @return {bool}
 */
const isMoment = (object) => moment.isMoment(object);

/**
 * Determine whether the object is an instance of Date (JavaScript standard library).
 *
 * @param {mixed} object
 * @return {bool}
 */
const isDate = (object) => object instanceof Date;

/**
 * Determine whether a number is a valid month number (0-11).
 *
 * @param {number} number
 *
 * @return {bool}
 */
const isValidMonthNumber = (number) => (!isNaN(number) && number >= 0 && number <= 11);

/**
 * Determine whether a number is a valid year number.
 *
 * @param {number} number
 *
 * @return {bool}
 */
const isValidYearNumber = (number) => !isNaN(number);

export default { isString, isMoment, isDate, isValidMonthNumber, isValidYearNumber };
