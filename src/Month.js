import { DAYS } from './enums';
import moment from 'moment';

import dd from 'dump-die';

class Month {
    /**
     * @param {int} month
     * @param {int} year
     * @returns {Month}
     */
    constructor(month, year) {
        // Creating a moment instance here for free validation.
        const date = moment([year, month, 1]);

        this.month = date.month();
        this.year = date.year();
    }

    /**
     * @returns {Month}
     */
    thisMonth() {
        return Month.create(this.moment());
    }

    /**
     * Create a new instance for this month.
     *
     * @returns {Month}
     */
    static thisMonth() {
        const now = moment();

        return Month.create(now);
    }

    /**
     * Return a new Month instance, set one month later than the current instance.
     *
     * @returns {Month}
     */
    nextMonth() {
        return Month.create(this.moment().add(1, 'month'));
    }

    /**
     * Return a new Month instance, set one month later than now.
     *
     * @returns {Month}
     */
    static nextMonth() {
        return Month.thisMonth().nextMonth();
    }

    /**
     * Return a new Month instance, set one month earlier than the current instance.
     *
     * @returns {Month}
     */
    lastMonth() {
        return Month.create(this.moment().add(-1, 'month'));
    }

    /**
     * Return a new Month instance, set one month earlier than now.
     *
     * @returns {Month}
     */
    static lastMonth() {
        return Month.thisMonth().lastMonth();
    }

    /**
     * Format the month's date. Defaults to YYYY-MM
     *
     * @param {string} format
     * @returns {int}
     */
    format(format = 'YYYY-MM') {
        return this.moment().format(format);
    }

    /**
     * Generate a new moment instance set to the first day of this month.
     * Since moment.js creates mutable instances, it's very important to always return a new one here.
     *
     * @returns {Moment}
     */
    moment() {
        return moment([this.year, this.month, 1]);
    }

    /**
     * @returns {Moment}
     */
    firstCalendarDay(weekStartsOn = null) {
        weekStartsOn = weekStartsOn || Month.weekStartsOn

        const firstDay = this.moment();

        while (firstDay.day() !== weekStartsOn) {
            firstDay.subtract(1, 'day');
        }

        return firstDay;
    }

    /**
     * Return an array of 'calendar days'. This array contains 42 days, starting from the first ...
     *
     * @todo
     *
     * @returns {array}
     */
    calendarDays(weekStartsOn = null) {
        weekStartsOn = weekStartsOn || Month.weekStartsOn

        const current = this.firstCalendarDay(weekStartsOn);

        const days = [];

        while (days.length < 42) {
            days.push(current.clone());
            current.add(1, 'day');
        }

        return days;
    }

    /**
     * @param {int|string|Moment} month|date|moment
     * @param {int?} year
     * @returns {Month}
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

            if (typeof argument === 'string') {
                const dateParts = argument.split('-');

                return new Month(dateParts[1] - 1, dateParts[0]);
            }

            if (moment.isMoment(argument)) {
                return new Month(argument.month(), argument.year());
            }

            if (argument instanceof Date) {
                return new Month(argument.getMonth(), argument.getYear());
            }

            throw new Error('Invalid argument specified for `Month.create()`.');
        }

        return Month.thisMonth();
    }
}

Month.weekStartsOn = DAYS.SUNDAY;

export default Month;
