import Month, { days, months } from '../src/index';
import { assert } from 'chai';
import moment from 'moment';

describe('It returns the first calendar day', () => {

    it('with weeks starting on a Sunday (default)', () => {

        const cases = [
            [ Month.create(months.JANUARY, 2015), '2014-12-28' ],
            [ Month.create(months.FEBRUARY, 2015), '2015-02-01' ],
            [ Month.create(months.JUNE, 2015), '2015-05-31' ],
            [ Month.create(months.FEBRUARY, 2016), '2016-01-31' ],
            [ Month.create(months.MARCH, 2016), '2016-02-28' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.firstCalendarDay().format('YYYY-MM-DD'), result);
            assert.equal(month.firstCalendarDay(days.SUNDAY).format('YYYY-MM-DD'), result);
        });
    });

    it('with weeks starting on a a Monday', () => {

        const cases = [
            [ Month.create(months.JANUARY, 2015), '2014-12-29' ],
            [ Month.create(months.FEBRUARY, 2015), '2015-01-26' ],
            [ Month.create(months.JUNE, 2015), '2015-06-01' ],
            [ Month.create(months.FEBRUARY, 2016), '2016-02-01' ],
            [ Month.create(months.MARCH, 2016), '2016-02-29' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.firstCalendarDay(days.MONDAY).format('YYYY-MM-DD'), result);
        });
    });

    it('with weeks starting on a a Wednesday', () => {

        const cases = [
            [ Month.create(months.JANUARY, 2015), '2014-12-31' ],
            [ Month.create(months.FEBRUARY, 2015), '2015-01-28' ],
            [ Month.create(months.JUNE, 2015), '2015-05-27' ],
            [ Month.create(months.FEBRUARY, 2016), '2016-01-27' ],
            [ Month.create(months.MARCH, 2016), '2016-02-24' ],
        ];

        cases.forEach(([ month, result ]) => {
            assert.equal(month.firstCalendarDay(days.WEDNESDAY).format('YYYY-MM-DD'), result);
        });
    });
});

describe('It generates an array of weeks for a calendar month', () => {

    it('with weeks starting on a Sunday (default)', () => {

        const cases = [
            [ Month.create(months.JANUARY, 2015), '2014-12-28', '2015-02-07' ],
            [ Month.create(months.FEBRUARY, 2015), '2015-02-01', '2015-03-14' ],
            [ Month.create(months.JUNE, 2015), '2015-05-31', '2015-07-11' ],
            [ Month.create(months.FEBRUARY, 2016), '2016-01-31', '2016-03-12' ],
            [ Month.create(months.MARCH, 2016), '2016-02-28', '2016-04-09' ],
        ];

        cases.forEach(([ month, start, end ]) => {
            const calendarDays = month.calendarDays(days.SUNDAY);

            assert.lengthOf(calendarDays, 42);
            assert.equal(calendarDays[0].format('YYYY-MM-DD'), start);
            assert.equal(calendarDays[41].format('YYYY-MM-DD'), end);
        });
    });

    it('with weeks starting on a Monday', () => {

        const cases = [
            [ Month.create(months.JANUARY, 2015), '2014-12-29', '2015-02-08' ],
            [ Month.create(months.FEBRUARY, 2015), '2015-01-26', '2015-03-08' ],
            [ Month.create(months.JUNE, 2015), '2015-06-01', '2015-07-12' ],
            [ Month.create(months.FEBRUARY, 2016), '2016-02-01', '2016-03-13' ],
            [ Month.create(months.MARCH, 2016), '2016-02-29', '2016-04-10' ],
        ];

        cases.forEach(([ month, start, end ]) => {
            const calendarDays = month.calendarDays(days.MONDAY);

            assert.lengthOf(calendarDays, 42);
            assert.equal(calendarDays[0].format('YYYY-MM-DD'), start);
            assert.equal(calendarDays[41].format('YYYY-MM-DD'), end);
        });
    });
});

describe('It generates an array of weeks for a calendar month', () => {

    it('with weeks starting on a Sunday (default)', () => {

        const cases = [
            [ Month.create(months.JANUARY, 2015), '2014-12-28', '2015-02-07' ],
            [ Month.create(months.FEBRUARY, 2015), '2015-02-01', '2015-03-14' ],
            [ Month.create(months.JUNE, 2015), '2015-05-31', '2015-07-11' ],
            [ Month.create(months.FEBRUARY, 2016), '2016-01-31', '2016-03-12' ],
            [ Month.create(months.MARCH, 2016), '2016-02-28', '2016-04-09' ],
        ];

        cases.forEach(([ month, start, end ]) => {
            const calendarWeeks = month.calendarWeeks(days.SUNDAY);

            assert.lengthOf(calendarWeeks, 6);
            assert.equal(calendarWeeks[0][0].format('YYYY-MM-DD'), start);
            assert.equal(calendarWeeks[5][6].format('YYYY-MM-DD'), end);
        });
    });
});

describe('It can check whether a month', () => {

    it('contains a day', () => {

        const cases = [
            [ new Month(months.SEPTEMBER, 2015), moment('2015-09-12') ],
            [ new Month(months.FEBRUARY, 1992), moment('1992-02-01') ],
            [ new Month(months.DECEMBER, 2019), moment('2019-12-30') ],
        ];

        cases.forEach(([ month, day ]) => {
            assert.isTrue(month.containsDay(day));
        });
    });

    it('doesn\'t contain a day', () => {

        const cases = [
            [ new Month(months.SEPTEMBER, 2015), moment('2014-09-12') ],
            [ new Month(months.FEBRUARY, 1992), moment('1992-01-31') ],
            [ new Month(months.DECEMBER, 2019), moment('2019-11-30') ],
        ];

        cases.forEach(([ month, day ]) => {
            assert.isFalse(month.containsDay(day));
        });
    });

    it('is the current month', () => {

        assert.isTrue(Month.thisMonth().isThisMonth());
        assert.isFalse(Month.nextMonth().isThisMonth());
        assert.isFalse(Month.lastMonth().isThisMonth());
    });

    it('is in the future', () => {

        assert.isTrue(Month.nextMonth().isFuture());
        assert.isTrue(Month.nextMonth().nextMonth().isFuture());
        assert.isFalse(Month.thisMonth().isFuture());
        assert.isFalse(Month.lastMonth().isFuture());
        assert.isFalse(Month.lastMonth().lastMonth().isFuture());
    });

    it('is in the past', () => {

        assert.isTrue(Month.lastMonth().isPast());
        assert.isTrue(Month.lastMonth().lastMonth().isPast());
        assert.isFalse(Month.thisMonth().isPast());
        assert.isFalse(Month.nextMonth().nextMonth().isPast());
    });
});
