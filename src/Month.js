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
     * Create a new instance for this month.
     *
     * @return {Month}
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
        return Month.create(this.moment().add(1, 'month'));
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

    // /**
    //  * Return an array of 'calendar days'. This array contains 42 days, starting from the first ...
    //  *
    //  * @todo
    //  *
    //  * @returns {array}
    //  */
    // calendarDays(weekStartsOn = DAYS.MONDAY) {
    //     const current = this.firstCalendarDay;
    //
    //     const days = [];
    //
    //     do {
    //         days.push(current.clone());
    //         current.add(1, 'day');
    //     } while (days.length < 42);
    //
    //     return days;
    // }
    //
    // /**
    //  * @todo
    //  *
    //  * @returns {Moment}
    //  */
    // firstCalendarDay(weekStartsOn = DAYS.MONDAY) {
    //     const firstDay = this.moment();
    //
    //     while (firstDay.day() === DAYS.SUNDAY || firstDay.day() > DAYS.MONDAY) {
    //         firstDay.subtract(1, 'day');
    //     }
    //
    //     return firstDay;
    // }

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

export default Month;
