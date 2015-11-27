import moment from 'moment';
import { DAYS } from './enums';

class Month {
    /**
     * @param {int} month
     * @param {int} year
     * @returns {Month}
     */
    constructor(month, year) {
        // Creating a moment instance here for free validation
        const date = moment([year, month, 1]);

        this.month = date.month();
        this.year = date.year();
    }

    /**
     * Return a new Month instance, set one month later.
     *
     * @returns {Month}
     */
    nextMonth() {
        return Month.createFromMoment(this.moment().add(1, 'month'));
    }

    /**
     * Return a new Month instance, set one month before.
     *
     * @returns {Month}
     */
    lastMonth() {
        return Month.createFromMoment(this.moment().add(-1, 'month'));
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
     * Return an array of 'calendar days'. This array contains 42 days, starting from the first ...
     *
     * @todo
     *
     * @returns {array}
     */
    calendarDays(weekStartsOn = DAYS.MONDAY) {
        const current = this.firstCalendarDay;

        const days = [];

        do {
            days.push(current.clone());
            current.add(1, 'day');
        } while (days.length < 42);

        return days;
    }

    /**
     * @todo
     * 
     * @returns {Moment}
     */
    firstCalendarDay(weekStartsOn = DAYS.MONDAY) {
        const firstDay = this.moment();

        while (firstDay.day() === DAYS.SUNDAY || firstDay.day() > DAYS.MONDAY) {
            firstDay.subtract(1, 'day');
        }

        return firstDay;
    }

    /**
     * Factory method that recieves the same arguments as the constructor. Useful for chaining.
     *
     * @param {int} month
     * @param {int} year
     * @returns {Month}
     */
    static create(month, year) {
        return new Month(month, year);
    }

    /**
     * Create a new instance from a moment object.
     *
     * @param {Moment} moment
     * @returns {Month}
     */
    static createFromMoment(date) {
        return new Month(date.month(), date.year());
    }

    /**
     * Create a new instance for this month.
     *
     * @return {Month}
     */
    static createThisMonth() {
        const now = moment();

        return Month.createFromMoment(now);
    }
}

export default Month;
