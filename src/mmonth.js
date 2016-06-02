import { days } from './enums';
import moment from 'moment';
import validate from './validate';

/**
 * @class Month
 *
 * @property {number} month
 * @property {number} year
 */
class Month {
    /**
     * Create a new instance of Month from a month and a year.
     *
     * @param {number} month - A number from 0 to 11.
     * @param {number} year - A valid year number.
     *
     * @return {Month}
     */
    constructor(month, year) {

        month = parseInt(month);
        year = parseInt(year);

        if (! validate.isValidMonthNumber(month)) {
            throw new Error('Argument `month` has to be a number between 0 and 11.');
        }

        if (! validate.isValidYearNumber(year)) {
            throw new Error('Argument `year` has to be a number.');
        }

        this.month = month;
        this.year = year;
    }

    /**
     * Return a fresh instance of the Month object.
     *
     * @return {Month}
     */
    clone() {
        return new Month(this.month, this.year);
    }

    /**
     * Create a new instance of Month, this essentially creates a clone of the
     * object.
     *
     * @return {Month}
     */
    thisMonth() {
        return this.clone();
    }

    /**
     * Create a new instance for the current month.
     *
     * @return {Month}
     */
    static now() {
        return Month.create(moment());
    }

    /**
     * Create a new instance for the current month.
     *
     * @return {Month}
     */
    static thisMonth() {
        return Month.now();
    }

    /**
     * Return a new Month instance, set one month later than now.
     *
     * @return {Month}
     */
    nextMonth() {
        return Month.create(this.moment().add(1, 'month'));
    }

    /**
     * Return a new Month instance, set one month later than now.
     *
     * @return {Month}
     */
    static nextMonth() {
        return Month.thisMonth().nextMonth();
    }

    /**
     * Return a new Month instance, set one month earlier than the current
     * instance.
     *
     * @return {Month}
     */
    lastMonth() {
        return Month.create(this.moment().add(-1, 'month'));
    }

    /**
     * Alias for `lastMonth`.
     *
     * @return {Month}
     */
    previousMonth() {
        return this.lastMonth();
    }

    /**
     * Return a new Month instance, set one month earlier than now.
     *
     * @return {Month}
     */
    static lastMonth() {
        return Month.thisMonth().lastMonth();
    }

    /**
     * Alias for `static lastMonth`.
     *
     * @return {Month}
     */
    static previousMonth() {
        return Month.lastMonth();
    }

    /**
     * Format the month's date. Uses ISO 8601, defaults to YYYY-MM.
     *
     * @param {string} format - The format you want to return.
     *
     * @return {number}
     */
    format(format = 'YYYY-MM') {
        return this.moment().format(format);
    }

    /**
     * Generate a new moment instance set to the first day of this month.
     * Since moment.js creates mutable instances, it's very important to always
     * return a new one here.
     *
     * @return {Moment}
     */
    moment() {
        return moment([this.year, this.month, 1]);
    }

    /**
     * Return a moment instance of the first day of the month.
     *
     * @return {Moment}
     */
    firstDay() {
        return this.moment();
    }

    /**
     * Return a moment instance of the first 'calendar day' of the month.
     *
     * @return {Moment}
     */
    firstCalendarDay(weekStartsOn = Month.weekStartsOn) {
        const firstDay = this.moment();

        while (firstDay.day() !== weekStartsOn) {
            firstDay.subtract(1, 'day');
        }

        return firstDay;
    }

    /**
     * Return an array of 'calendar days'. This array contains 42 days,
     * starting on a specific day of the week.
     *
     * @return {Moment[]}
     */
    calendarDays(weekStartsOn = Month.weekStartsOn) {
        const current = this.firstCalendarDay(weekStartsOn);

        const days = [];

        while (days.length < 42) {
            days.push(current.clone());
            current.add(1, 'day');
        }

        return days;
    }

    /**
     * Return an array of 'calendar weeks'. This array contains 6 weeks, with
     * days starting on a specific day of the week.
     *
     * @return {Moment[][]}
     */
    calendarWeeks(weekStartsOn = Month.weekStartsOn) {
        const weeks = [];

        for (let i = 0; i < 6; i++) {
            weeks.push(this.calendarDays(weekStartsOn).slice(i * 7, i * 7 + 7));
        }

        return weeks;
    }

    /**
     * Creates a new instance of Month from various formats.
     *
     * 		- {number}, {number}: creates a Month from a month and year number.
     * 		- {string}: creates a Month from a string which is equal to 'YYYY-MM'
     * 		            or starts with 'YYYY-MM-'.
     * 		- {Moment}: creates a Month for the month in which the Moment instance resides.
     *
     * @param {(number|string|Moment)} argument
     * @param {?number} year
     *
     * @return {Month}
     */
    static create() {
        if (arguments.length > 2) {
            throw new Error('`Month.create()` can only accept zero, one or two arguments.');
        }

        if (arguments.length === 2) {
            return new Month(...arguments);
        }

        if (arguments.length === 1) {

            const argument = arguments[0];

            if (validate.isString(argument)) {
                const dateParts = argument.split('-');

                return new Month(dateParts[1] - 1, dateParts[0]);
            }

            if (validate.isMoment(argument)) {
                return new Month(argument.month(), argument.year());
            }

            if (validate.isDate(argument)) {
                return new Month(argument.getMonth(), argument.getFullYear());
            }

            throw new Error('Invalid argument specified for `Month.create()`.');
        }

        return Month.thisMonth();
    }

    /**
     * Check whether a day in the form of a Moment instance is in this month.
     *
     * @param {Moment} day
     *
     * @return {bool}
     */
    containsDay(day) {
        return (
            day.month() === this.month &&
            day.year() === this.year
        );
    }

    /**
     * Check whether a day in the form of a Moment instance is not in this month.
     *
     * @param {Moment} day
     *
     * @return {bool}
     */
    doesntContainDay(day) {
        return ! this.containsDay(day);
    }

    /**
     * Check whether the month instance is the current month in time.
     *
     * @return {bool}
     */
    isThisMonth() {
        return this.containsDay(moment());
    }

    /**
     * Check whether the month is in the future. Note: the current month will never be in the future.
     *
     * @return {bool}
     */
    isFuture() {
        return this.moment().diff(Month.now().nextMonth().moment(), 'months') > -1;
    }

    /**
     * Check whether the month is in the future. Note: the current month will never be in the future.
     *
     * @return {bool}
     */
    isPast() {
        return this.moment().diff(Month.now().lastMonth().moment(), 'months') < 1;
    }
}

/**
 * Default setting for the first day of the week.
 *
 * @type {number} - A number from 0 to 6, 0 being Sunday.
 */
Month.weekStartsOn = days.SUNDAY;

export default Month;
